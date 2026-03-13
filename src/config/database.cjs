module.exports = {
  dialect: 'postgres',
  host: 'dpg-d6q4hnp5pdvs738pdne0-a.oregon-postgres.render.com',
  port: 5432,
  username: 'devburguer_tjvv_user',
  password: 'UxepZP4l4uzs4d4rv1GwRX0gA3lSshd1',
  database: 'devburguer_tjvv',
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
