export default () => ({
  database: {
    host: process.env.DATABASE_HOST || '',
    name: process.env.DATABASE_NAME || 'propaganda-app',
  },
  okta: {
    issuer: process.env.OKTA_ISSUER || '',
    clientId: process.env.OKTA_CLIENTID || '',
    audience: process.env.OKTA_AUDIENCE || '',
  },
});
