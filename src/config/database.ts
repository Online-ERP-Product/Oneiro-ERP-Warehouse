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
    await pool.query(`
      CREATE TABLE IF NOT EXISTS warehouses (
        uuid UUID PRIMARY KEY,
        name TEXT NOT NULL,
        address TEXT,
        status TEXT NOT NULL CHECK (status IN ('aktiv', 'qeyri-aktiv')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_by UUID NOT NULL,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_by UUID NOT NULL,
        FOREIGN KEY (created_by) REFERENCES users(uuid),
        FOREIGN KEY (updated_by) REFERENCES users(uuid)
      );
    `);

    await pool.query(`
  CREATE TABLE IF NOT EXISTS products (
    uuid UUID PRIMARY KEY,
    product_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    type TEXT,
    weight NUMERIC,
    dimensions NUMERIC,
    category TEXT,
    manufacturer TEXT,
    warehouse_uuid UUID NOT NULL,
    quantity NUMERIC,
    min_stock_level NUMERIC,
    min_import NUMERIC NOT NULL,
    max_import NUMERIC NOT NULL,
    min_export NUMERIC NOT NULL,
    max_export NUMERIC NOT NULL,
    entry_date DATE,
    invoice TEXT,
    cost_price NUMERIC,
    market_price NUMERIC,
    expiration_date DATE,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (warehouse_uuid) REFERENCES warehouses(uuid)
  );
`);

    await pool.query(`
  CREATE TABLE IF NOT EXISTS product_movements (
    uuid UUID PRIMARY KEY,
    warehouse_name TEXT,
    product_name TEXT,
    product_id TEXT NOT NULL,
    operation_type TEXT NOT NULL CHECK (
      operation_type IN ('idxal', 'ixrac', 'transfer')
    ),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID NOT NULL,
    quantity NUMERIC,
    weight TEXT,
    dimensions TEXT,
    category TEXT,
    invoice TEXT,
    cost_price NUMERIC,
    market_price NUMERIC,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_by UUID,
    reason TEXT,
    FOREIGN KEY (created_by) REFERENCES users(uuid),
    FOREIGN KEY (updated_by) REFERENCES users(uuid)
  );
`);


    await pool.query(`
  CREATE TABLE IF NOT EXISTS product_categories (
    uuid UUID PRIMARY KEY,
    category_id TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT
  );
`);

    await pool.query(`
  CREATE TABLE IF NOT EXISTS companies (
    uuid UUID PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT,
    country TEXT,
    city TEXT,
    contact_person TEXT,
    contact_number TEXT,
    contact_email TEXT,
    iban TEXT
  );
`);


    console.log('✅ PostgreSQL DB initialized.');
  } catch (err) {
    console.error('❌ Error initializing DB:', err);
  }
};

initDB()

export default pool;