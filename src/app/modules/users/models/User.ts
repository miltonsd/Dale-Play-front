export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  idRole: number;
  seed: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserImage {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  idRole: number;
  role: string;
  ssed: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
}
