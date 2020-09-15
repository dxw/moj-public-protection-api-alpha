// Update with your config settings.

module.exports = {
  client: "mssql",
  connection: {
    host: "localhost",
    user: "sa",
    password: process.env.SA_PASSWORD,
    database: "PPUD",
  },
  debug: true,
};
