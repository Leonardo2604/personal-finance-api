import path from 'path';
import { createConnection } from 'typeorm';

class Database {
  static async connect() {
    await createConnection({
      type: process.env.DATABASE_TYPE as 'postgres',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      logging: true,
      entities: [path.resolve(__dirname, 'entities', '*.{js,ts}')],
    });
  }
}

export default Database;
