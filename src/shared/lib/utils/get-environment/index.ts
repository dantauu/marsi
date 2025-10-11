export const getEnvironment = () => {
  const env = process.env.NODE_ENV ?? "development"

  return {
    env,
    isDev: env === "development",
    isProduction: env === "production",
    isTest: env === "test",
  }
}
