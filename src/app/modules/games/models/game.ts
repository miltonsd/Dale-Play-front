export interface Game {
  id: number;
  name: string;
  image: string;
  valoration: number;
  idCategory?: number;
  nameCategory?: string;
  idDeveloper?: number;
  nameDeveloper?: string;
  description: string;
  trailer: string;
  isAvailable: boolean;
  date: Date;
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
