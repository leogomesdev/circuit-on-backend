export default () => ({
  database: {
    host: process.env.DATABASE_HOST || "",
    name: process.env.DATABASE_NAME || "",
  },
});
