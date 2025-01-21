import pg from 'pg'
const { Pool } = pg
import config from './config.js';

const pool = new Pool({
  host: config.db.host,
  port: config.db.port,
  database: config.db.database,
  user: config.db.user,
  password: config.db.password,
  options: `-c search_path=${config.db.schema || 'public'}`,
});

const checkConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('Database connected at:', res.rows[0].now);
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

checkConnection();

export const query = (text, params) => pool.query(text, params);

export const beginTransaction = async () => {
  const client = await pool.connect();
  await client.query('BEGIN');
  return client;
};

export const commitTransaction = async (client) => {
  await client.query('COMMIT');
  client.release();
};

export const rollbackTransaction = async (client) => {
  await client.query('ROLLBACK');
  client.release();
};

export default pool;
