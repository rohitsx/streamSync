export interface User {
  _id: string;
  id: string;
  email: string;
  name: string;
  username: null | string;
  picture: string;
  ytRefreshToken: boolean;
}

export interface ytThumbnail {
  thumbnail: {
    url: string;
    height: number;
    width: number;
  };
  title: string;
}
