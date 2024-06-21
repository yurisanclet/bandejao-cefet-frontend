export interface IFood {
  id: string;
  name: string;
  nutritionalData: string;
  quantity: number;
  status: string;
  expiryDate: string;
}

export interface IMenu {
  id: string;
  date: string;
  accompaniment: string;
  garnish: string;
  mainCourse: string;
  dessert: string;
}

export interface IMenuCreateOrUpdate {
  date: string;
  accompaniment: string;
  garnish: string;
  mainCourse: string;
  dessert: string;
}

export interface IFoodCreateOrUpdate {
  name: string;
  nutritionalData: string;
  quantity: number;
  status: string;
  expiryDate: string;
}
export interface PaginatedItems<T> {
  error: any;
  items: T[];
  total: number;
  page: number;
  size: number;
}

export interface IUser {
  id?:string;
  email: string,
  password: string,
  document: string,
  name: string,
  birthDate: string,
}

export type PaginatedFoods = PaginatedItems<IFood>;
export type PaginatedMenus = PaginatedItems<IMenu>;