const env = {
  appName: process.env.APP_NAME ?? "KnowledgePulse",
  appDescription:
    process.env.APP_DESCRIPTION ??
    "A customer intelligence and recommendation platform",
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  mongodbUri:
    process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/knowledge-pulse",
  authSecret:
    process.env.AUTH_SECRET ??
    "kp_super_secret_session_key_32_characters_minimum_development",
} as const;

export { env };