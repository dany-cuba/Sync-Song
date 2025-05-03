import { createClient } from "redis";
import { REDIS_URL } from "../config/env.config";

export const redis = createClient({
  url: REDIS_URL, // default --> redis://localhost:6379
});

redis.on("error", (err) => console.error("Redis Error", err));

(async () => {
  await redis.connect();
})();
