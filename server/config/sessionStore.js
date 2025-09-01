// MongoDB session store setup for express-session
import MongoStore from "connect-mongo";

export const sessionStore = MongoStore.create({
  mongoUrl: process.env.DATABASE_URI,
  collectionName: "sessions",
  ttl: 14 * 24 * 60 * 60, // 14 days
});
