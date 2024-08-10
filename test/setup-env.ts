import * as dotenv from 'dotenv';
import { existsSync } from 'node:fs';
import * as path from 'path';

const envFilePath = path.join(__dirname, '../.env.test');

if (!existsSync(envFilePath)) {
  throw new Error('.env.test file not found. Tests aborted.');
}
dotenv.config({ path: '.env.test' });
