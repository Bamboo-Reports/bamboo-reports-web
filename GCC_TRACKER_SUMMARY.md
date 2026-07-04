## GCC Tracker

A public page where users filter India's GCC ecosystem and instantly see counts of **Accounts**, **Centers**, and **Prospects** — a TAM sizing tool. No row-level data is exposed; only aggregate counts and filter option lists.

### Stack
- **Frontend**: React + Vite, `@tanstack/react-query`, shadcn/ui (Popover + Checkbox + Card + Input + Button), Tailwind
- **Backend**: Serverless function, `@neondatabase/serverless` (HTTP Postgres driver)
- **DB**: Neon PostgreSQL — `accounts`, `centers`, `prospects` tables joined via `account_global_legal_name`

### Architecture
```
Browser
   │  POST /api/tracker {
   │    account_primary_category: [],
   │    center_city: [],
   │    account_global_legal_name: [],
   │    account_search: ""
   │  }
   ▼
Serverless function
   │  single parameterized SQL query (= ANY($arr))
   ▼
Postgres → { counts, facets }
```
The client never sees the connection string or any row data — only counts and facet option lists, each with a live count.

### Cascade logic (the core)
**Accounts are the master.** Filters: `account_primary_category` and `account_global_legal_name` (accounts table) + `center_city` (centers table). Joined via `account_global_legal_name`.

- **Scope** = accounts whose `account_primary_category` and `account_global_legal_name` match (if set) **AND** that have ≥1 center in a matching `center_city` (if set).
- **Accounts count** = rows in scope.
- **Centers count** = centers in scope **that also match the `center_city` filter themselves**.
- **Prospects count** = prospects belonging to in-scope accounts (cascade through account only; no city filter on people).
- **AND across filters, OR within** — selecting multiple industries matches any selected industry; adding a city requires both conditions to match.
- **Facets cascade**: each dropdown's options/counts recompute based on the *other* filter (classic faceted search — own selection cleared, others applied).
- **Company autocomplete**: `account_search` returns up to 8 legal-name suggestions, ranked by prefix match and constrained by the selected category and city.

### Single SQL query
One CTE-based query returns counts + both facet option lists in a round-trip. Empty arrays = filter not applied (full counts). All parameterized via `$1`/`$2` — no string concatenation, no injection.

### Verified
- Full counts: 2,675 accounts / 6,305 centers / 63,838 prospects ✓
- Filtered (Manufacturing+Software+Services+Retail + Manufacturing+R&D): 1,047 / 2,221 / 25,256 ✓ (matches the reference dashboard exactly)
