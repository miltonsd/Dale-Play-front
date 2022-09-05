export interface Game {
  id: number;
  name: string;
  image: string;
  valoration: number;
  idCategory: number;
  idDeveloper: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GameUser {
  id: number;
  name: string;
  image: string;
  developer: string;
  category: string;
  valoration: number;
}
