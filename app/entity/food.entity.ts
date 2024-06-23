export interface Food {
  id: string;
  name: string;
  quantity: number;
  expiryDate: string;
  nutritionalData: string;
  status: string;
}

export interface PaginatedItems<T> {
  error: any;
  items: T[];
  total: number;
  page: number;
  size: number;
}


export type PaginatedFoods = PaginatedItems<Food>;

export interface CreateFood extends Omit<Food, 'id'> {}

export interface UpdateFood extends Omit<Food, 'id'> {}