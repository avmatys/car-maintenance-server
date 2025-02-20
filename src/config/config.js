import dotenv from 'dotenv';

dotenv.config(); 

console.log(`Initializing env ${process.env}`);

const config = {
  app: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },
  db: {
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    schema : process.env.PG_SCHEMA,
  },
  query: {
    defualtLimit: process.env.DEF_LIMIT || 50,
    maxLimit: process.env.MAX_LIMIT || 10000
  },
  telegram: {
    token: process.env.TELEGRAM_API_TOKEN
  },
  jwt : {
    secret : process.env.JWT_SECRET,
    expiresIn : process.env.JWT_EXPIRATION
  },
  bcrypt : {
    saltRounds: parseInt(process.env.BC_SALT_ROUNDS) || 10
  },
  roles : {
    owner : process.env.OWNER_ROLE,
    viewer : process.env.VIEWER_ROLE
  }
};

export default config;
