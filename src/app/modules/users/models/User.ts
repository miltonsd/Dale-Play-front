export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  idRole: number;
  ssed: string;
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
