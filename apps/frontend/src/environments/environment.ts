const SERVER_BASE_URL = process.env.SERVER_BASE_URL
const ENTERPRISE_NAME = process.env.ENTERPRISE_NAME

export const environment = {
  ENTERPRISE_NAME,
  SERVER_BASE_URL: SERVER_BASE_URL ? SERVER_BASE_URL : "http://localhost:8000",

  TOKEN_FIELD_NAME: "token",
  USER_FIELD_NAME: "user",
};
