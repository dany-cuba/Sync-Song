import {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USERNAME,
  REDIS_PASSWORD,
} from "./env.config";
import { createClient } from "redis";

const redis = createClient({
  username: REDIS_USERNAME,
  password: REDIS_PASSWORD,
  socket: {
    host: REDIS_HOST,
    port: Number(REDIS_PORT),
  },
});

redis.on("error", (err) => console.error("Redis Client Error:", err));

(async () => {
  try {
    await redis.connect();
    console.log("🟢 Redis conectado correctamente");
  } catch (err) {
    console.error("🔴 Error conectando a Redis:", err);
  }
})();

export { redis };
