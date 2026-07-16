import express, { type Express } from "express";
import path from "node:path";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Railway runs the API and web client as a single service. This keeps relative
// /api requests on the canonical domain when the built Vite client is served.
const clientDist = process.env["CLIENT_DIST"] ?? path.resolve(
  import.meta.dirname,
  "..",
  "..",
  "structured-liquidity",
  "dist",
  "public",
);

app.use(express.static(clientDist));
app.use((req, res, next) => {
  if (
    (req.method !== "GET" && req.method !== "HEAD") ||
    req.path.startsWith("/api")
  ) {
    next();
    return;
  }

  res.sendFile("index.html", { root: clientDist }, (err) => {
    if (err) next(err);
  });
});

export default app;
