import dotenv from 'dotenv';

dotenv.config(); 

console.log(`Initializing env ${process.env}`);

const config = {
  app: {
    port: process.env.SERVER_PORT || 3000,
    env: process.env.NODE_ENV || 'development'
  },
  db: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    schema : process.env.POSTGRES_SCHEMA,
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
