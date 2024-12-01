export interface User {
  id: string;
  email: string;
  verified_email: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
}

export interface DbUser {
  _id: string;
  id: string;
  email: string;
  name: string;
  username: null | string;
  picture: string;
  ytRefreshToken: null | string | boolean;
}
