const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/v1",
  createProxyMiddleware({
    target: "https://cloud.appwrite.io",
    changeOrigin: true,
    pathRewrite: {
      "^/v1": "/v1", // Optional: Rewrite the path if needed
    },
  })
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
