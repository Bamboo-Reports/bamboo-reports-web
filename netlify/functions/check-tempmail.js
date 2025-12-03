export const handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const email = event.queryStringParameters?.email;
  const apiKey = process.env.TEMPMAIL_CHECKER_API_KEY;
  const baseUrl = (process.env.TEMPMAIL_CHECKER_BASE_URL || 'https://tempmailchecker.com').replace(/\/$/, '');

  if (!email) {
    return {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Missing email parameter' }),
    };
  }

  if (!apiKey) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Tempmail API key not configured' }),
    };
  }

  const url = `${baseUrl}/check?email=${encodeURIComponent(email)}`;

  try {
    const response = await fetch(url, {
      headers: { 'X-API-Key': apiKey },
    });

    if (!response.ok) {
      return {
        statusCode: response.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Tempmail checker error', status: response.status }),
      };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        temp: data?.temp === true || data?.disposable === true,
        raw: data,
      }),
    };
  } catch (error) {
    console.error('Tempmail checker failed', error);
    return {
      statusCode: 502,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Tempmail checker unavailable' }),
    };
  }
};
