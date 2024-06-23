import { IMenu } from "./entity/menu.entity";

export interface IFood {
  id: string;
  name: string;
  nutritionalData: string;
  quantity: number;
  status: string;
  expiryDate: string;
}

export interface IFoodCreateOrUpdate {
  id?: string
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

export type PaginatedMenus = PaginatedItems<IMenu>;
