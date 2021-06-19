module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "postgres",
        host: env("DATABASE_HOST", "localhost"),
        port: env.int("DATABASE_PORT", 5432),
        database: env("DATABASE_NAME", "uvm"),
        username: env("DATABASE_USERNAME", "uvm"),
        password: env("DATABASE_PASSWORD", "uvm"),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
