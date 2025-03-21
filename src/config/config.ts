import * as dotenv from 'dotenv';
dotenv.config();
interface ConfigI {
  PORT: string;
  DB_URL: string;
  NODE_ENV: string;
  REFRESH_TOKEN_KEY: string;
  REFRESH_TOKEN_TIME: string;
  ACCESS_TOKEN_KEY: string;
  ACCESS_TOKEN_TIME: string;
}
export const config: ConfigI = {
  PORT: process.env.PORT || '',
  DB_URL: process.env.DB_URL || '',
  NODE_ENV: process.env.NODE_ENV || '',
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY || '',
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY || '',
  ACCESS_TOKEN_TIME: process.env.ACCESS_TOKEN_TIME || '',
  REFRESH_TOKEN_TIME: process.env.REFRESH_TOKEN_TIME || '',
};
