export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  idRole: number;
  resetToken: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}
