export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  cache: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.CACHE_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD,
    user: process.env.REDIS_USER,
    db: parseInt(process.env.REDIS_DB, 10),
  },
  mail: {
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT, 10),
    sender: process.env.EMAIL_SENDER,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
  },
  sms: {
    provider: process.env.SMS_PROVIDER,
    url: process.env.SMS_URL,
    clientId: process.env.SMS_CLIENT_ID,
    apiKey: process.env.SMS_API_KEY,
    senderId: process.env.SMS_SENDER_ID,
  },
});
