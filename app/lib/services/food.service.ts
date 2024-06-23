import { Food, CreateFood, UpdateFood, PaginatedFoods } from "@/app/entity/food.entity";

import { AxiosInstance } from "axios";

export class FoodService {
  private httpClient: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.httpClient = client;
  }

  async getFoods(sort?: string, expiryDate?: string, name?: string): Promise<PaginatedFoods> {
    const page = 1;
    const size = 10;
    const params = {
      sort: sort ? `expiryDate:${sort}` : undefined,
      page: String(page),
      size: String(size),
      filter: expiryDate ? `expiryDate:lte:${expiryDate}` : '' ||  name ? `name:eq:${name}` : '',
    };
  
    try {
      const res = await this.httpClient.get<PaginatedFoods>(`/food`, { params });
      console.log('res', res);
      const data = res.data;
      return data;
    } catch (error: any) {
      console.error('Error fetching foods:', error);
      return { items: [], error: error.message, total: 0, page: 0, size: 0 };
    }
  }

  async createFood(foodToCreate: CreateFood): Promise<void> {
      await this.httpClient.post('/food', foodToCreate)
        .then((res) => {
          console.log('res', res);
        }).catch((error: any) => {
          const errorMessage = error.response?.data?.message || 'Erro desconhecido ao criar alimento.'
          console.error('Error creating food:', errorMessage);
          throw errorMessage;
        });
  }

  async deleteFood(id: string): Promise<void> {
      await this.httpClient.delete(`/food/${id}`)
        .then((res) => {
          console.log('res', res);
        }).catch((error: any) => {
          const errorMessage = error.response?.data?.message
          console.error('Error deleting food:', errorMessage);
          throw errorMessage;
        });
  }

  async updateFood(foodId: string, updatedFood: UpdateFood): Promise<void> {
      await this.httpClient.patch(`/food/${foodId}`, updatedFood)
        .then((res) => {
          console.log('res', res);
        }).catch((error: any) => {
          const errorMessage = error.response?.data?.message
          console.error('Error updating food:', errorMessage);
          throw errorMessage;
        });
  }
}
