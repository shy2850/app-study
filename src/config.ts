export const DB_STORE_NAME = 'app-study-db';
export const DB_VERSION = 1;
export const CACHE_KEY = 'app-study-cache';
declare const process: { env: { NODE_ENV: string } };
export const publicPath = process.env.NODE_ENV === 'development' ? '/' : '/app-study/';