import pg from 'pg';

const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'moneyflow',
    password: '0905',
    port: 5432,
});

export default pool;


