const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/auth",
  createProxyMiddleware({
    target: "http://localhost:4001",
    changeOrigin: true,
    onProxyReq(proxyReq, req) {
      if (req.body) {
        const bodyData = JSON.stringify(req.body);

        proxyReq.setHeader("Content-Type", "application/json");
        proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));

        proxyReq.write(bodyData);
      }
    },
  })
);

app.use(
  "/tasks",
  createProxyMiddleware({
    target: "http://localhost:4002",
    changeOrigin: true,
  })
);

app.use(
  "/ai",
  createProxyMiddleware({
    target: "http://localhost:4003",
    changeOrigin: true,
  })
);

app.listen(4000, () => {
  console.log("API Gateway running on port 4000");
});
