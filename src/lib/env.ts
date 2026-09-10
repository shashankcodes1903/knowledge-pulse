const env = {
  appName: process.env.APP_NAME ?? "KnowledgePulse",
  appDescription: process.env.APP_DESCRIPTION ?? "A customer intelligence and recommendation platform",

  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",

} as const;

export { env };