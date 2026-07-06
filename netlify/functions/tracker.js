import { neon } from "@neondatabase/serverless";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Content-Type": "application/json",
};

const jsonResponse = (statusCode, payload) => ({
  statusCode,
  headers: CORS_HEADERS,
  body: JSON.stringify(payload),
});

const sanitize = (value) => {
  if (!Array.isArray(value)) return [];
  return [
    ...new Set(
      value
        .filter((x) => typeof x === "string")
        .map((s) => s.trim())
        .filter(Boolean)
    ),
  ];
};

const TRACKER_QUERY = `
WITH scope AS (
  SELECT DISTINCT a.account_global_legal_name AS name
  FROM accounts a
  WHERE
    ($1::text[] = '{}' OR a.account_primary_category = ANY($1::text[]))
    AND ($3::text[] = '{}' OR a.account_global_legal_name = ANY($3::text[]))
    AND
    ($2::text[] = '{}' OR EXISTS (
      SELECT 1 FROM centers c
      WHERE c.account_global_legal_name = a.account_global_legal_name
        AND c.center_city = ANY($2::text[])
    ))
),
category_facet AS (
  SELECT a.account_primary_category AS value, COUNT(*)::int AS count
  FROM accounts a
  WHERE a.account_primary_category IS NOT NULL AND a.account_primary_category <> ''
    AND ($3::text[] = '{}' OR a.account_global_legal_name = ANY($3::text[]))
    AND ($2::text[] = '{}' OR EXISTS (
      SELECT 1 FROM centers c
      WHERE c.account_global_legal_name = a.account_global_legal_name
        AND c.center_city = ANY($2::text[])
    ))
  GROUP BY a.account_primary_category
),
city_facet AS (
  SELECT c.center_city AS value, COUNT(*)::int AS count
  FROM centers c
  WHERE c.center_city IS NOT NULL AND c.center_city <> ''
    AND ($3::text[] = '{}' OR c.account_global_legal_name = ANY($3::text[]))
    AND ($1::text[] = '{}' OR EXISTS (
      SELECT 1 FROM accounts a
      WHERE a.account_global_legal_name = c.account_global_legal_name
        AND a.account_primary_category = ANY($1::text[])
    ))
  GROUP BY c.center_city
),
account_facet AS (
  SELECT DISTINCT
    a.account_global_legal_name AS value,
    CASE
      WHEN LEFT(LOWER(a.account_global_legal_name), CHAR_LENGTH($4::text)) = LOWER($4::text)
      THEN 0
      ELSE 1
    END AS rank
  FROM accounts a
  WHERE $4::text <> ''
    AND a.account_global_legal_name IS NOT NULL
    AND a.account_global_legal_name <> ''
    AND POSITION(LOWER($4::text) IN LOWER(a.account_global_legal_name)) > 0
    AND ($1::text[] = '{}' OR a.account_primary_category = ANY($1::text[]))
    AND ($2::text[] = '{}' OR EXISTS (
      SELECT 1 FROM centers c
      WHERE c.account_global_legal_name = a.account_global_legal_name
        AND c.center_city = ANY($2::text[])
    ))
  ORDER BY rank, value
  LIMIT 8
)
SELECT
  json_build_object(
    'counts', json_build_object(
      'accounts', (SELECT COUNT(*)::int FROM accounts WHERE account_global_legal_name IN (SELECT name FROM scope)),
      'centers', (SELECT COUNT(*)::int FROM centers WHERE account_global_legal_name IN (SELECT name FROM scope) AND ($2::text[] = '{}' OR center_city = ANY($2::text[]))),
      'prospects', (SELECT COUNT(*)::int FROM prospects WHERE account_global_legal_name IN (SELECT name FROM scope))
    ),
    'facets', json_build_object(
      'account_primary_category', COALESCE((SELECT json_agg(json_build_object('value', value, 'count', count) ORDER BY count DESC, value) FROM category_facet), '[]'::json),
      'center_city', COALESCE((SELECT json_agg(json_build_object('value', value, 'count', count) ORDER BY count DESC, value) FROM city_facet), '[]'::json),
      'account_global_legal_name', COALESCE((SELECT json_agg(json_build_object('value', value, 'count', 1) ORDER BY rank, value) FROM account_facet), '[]'::json)
    )
  ) AS result
`;

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  const databaseUrl = process.env.NEON_DATABASE_URL;
  if (!databaseUrl) {
    console.warn("NEON_DATABASE_URL not configured");
    return jsonResponse(500, { error: "Database not configured" });
  }

  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch {
    return jsonResponse(400, { error: "Invalid JSON body" });
  }

  const categories = sanitize(body.account_primary_category);
  const cities = sanitize(body.center_city);
  const accounts = sanitize(body.account_global_legal_name).slice(0, 1);
  const accountSearch =
    typeof body.account_search === "string" ? body.account_search.trim().slice(0, 100) : "";
  try {
    const sql = neon(databaseUrl);
    const rows = await sql.query(TRACKER_QUERY, [
      categories,
      cities,
      accounts,
      accountSearch,
    ]);
    const result = rows[0]?.result ?? {
      counts: { accounts: 0, centers: 0, prospects: 0 },
      facets: {
        account_primary_category: [],
        center_city: [],
        account_global_legal_name: [],
      },
    };
    return jsonResponse(200, result);
  } catch (error) {
    console.warn("Tracker query failed", error?.message || error);
    return jsonResponse(502, { error: "Tracker query failed" });
  }
};
