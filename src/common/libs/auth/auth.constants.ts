export const isProd = process.env.NODE_ENV === 'production';
export const isDev = process.env.NODE_ENV === 'development';

export const ACCESS_TOKEN_COOKIE = isProd ? '__Host-qf_at' : 'qf_at';
export const REFRESH_TOKEN_COOKIE = isProd ? '__Host-qf_rt' : 'qf_rt';

export const ACCESS_TOKEN_MAX_AGE_SECONDS = 60 * 10;
export const REFRESH_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export const DEFAULT_AUTH_REDIRECT = '/dashboard';
export const LOGIN_PATH = '/auth/login';
