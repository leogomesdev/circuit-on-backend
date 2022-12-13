export default () => ({
  database: {
    host: process.env.DATABASE_HOST || process.env.MONGODB_DB_URI || '',
    name: process.env.DATABASE_NAME || 'propaganda-app',
  },
});
