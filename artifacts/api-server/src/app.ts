import express, { type Express } from "express";
import path from "node:path";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";
import { installStagingAccess } from "./middleware/staging-access";

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

installStagingAccess(app);

app.use("/api", router);

// Railway runs the API and web client as a single service. This keeps relative
// /api requests on the canonical domain when the built Vite client is served.
const clientDist =
  process.env["CLIENT_DIST"] ??
  path.resolve(
    import.meta.dirname,
    "..",
    "..",
    "structured-liquidity",
    "dist",
    "public",
  );
const clientBasePath = (process.env["BASE_PATH"] ?? "/").trim();
const clientMountPath =
  clientBasePath === "/" ? null : `/${clientBasePath.replace(/^\/+|\/+$/g, "")}`;

app.use(express.static(clientDist));
if (clientMountPath) {
  // Vite keeps emitted files in `clientDist` while prefixing their public URLs
  // with BASE_PATH. Mount the same immutable assets at that prefix so the
  // Construct Page route and the direct rollback hostname both remain usable.
  app.use(clientMountPath, express.static(clientDist));
}
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
