const pg = require('pg');

module.exports = {
  dialect: 'postgres',
  dialectModule: pg,
  host: process.env.DB_HOST || 'dpg-d6q4hnp5pdvs738pdne0-a.oregon-postgres.render.com',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USER || 'devburguer_tjvv_user',
  password: process.env.DB_PASS || 'UxepZP4l4uzs4d4rv1GwRX0gA3lSshd1',
  database: process.env.DB_NAME || 'devburguer_tjvv',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
