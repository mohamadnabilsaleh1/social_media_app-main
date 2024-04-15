// api/proxy.js

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://social-media-app-main-pearl.vercel.app"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Forward request to external API
  const response = await fetch(
    "https://cloud.appwrite.io/v1/account/sessions/email",
    {
      method: req.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: req.method === "POST" ? JSON.stringify(req.body) : null,
    }
  );

  // Return response from external API
  res.status(response.status).json(await response.json());
};
