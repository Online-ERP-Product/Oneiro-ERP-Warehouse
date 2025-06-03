import { Pool } from 'pg';

const pool = new Pool({
  user: 'oneiro',
  host: '135.181.198.134', 
  database: 'oneiro_db',
  password: 'Oneiro-123',
  port: 5432,
});


export const initDB = async () => {
  try {
    console.log('✅ PostgreSQL DB initialized.');
  } catch (err) {
    console.error('❌ Error initializing DB:', err);
  }
};

initDB()

export default pool;