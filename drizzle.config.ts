import { defineConfig } from 'drizzle-kit'


export default defineConfig({
    schema: './utils/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://neondb_owner:cFun5iLRsHq3@ep-raspy-smoke-a1ldjv2b.ap-southeast-1.aws.neon.tech/ai-mock-interview?sslmode=require",
    },
    verbose: true,
    strict: true
  })