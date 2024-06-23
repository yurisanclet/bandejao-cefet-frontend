import { buildQueryString } from "@/app/utils/queryStringBuilder";
import { AxiosInstance } from "axios";
import { PaginatedMenus } from "@/app/inteface";
import { IMenu, CreateMenu, UpdateMenu } from "@/app/entity/menu.entity";

export class MenuService {
  private httpClient: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.httpClient = client;
  }

  async getMenus(dateRange?: string): Promise<PaginatedMenus> {
    const page = 1;
    const size = 10;
    const params: Record<string, string | string[] | undefined> = {
      page: String(page),
      size: String(size),
    };
    if (dateRange) {
      params['filter'] = `date:lte:${dateRange}`;
    }
    return this.httpClient.get(`/menu`, { params })
      .then(res => res.data)
      .catch(error => {
        const errorMessage = error.response?.data?.message || 'Error fetching menus';
        console.error(errorMessage);
        throw new Error(errorMessage);
      });
  }

  async createMenu(menu: CreateMenu): Promise<IMenu | { message: string }> {
    return this.httpClient.post(`${process.env.NEXT_PUBLIC_BASE_URL}/menu`, menu, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.data)
      .catch(error => {
        const errorMessage = error.response?.data?.message || 'Failed to create menu';
        console.error('Error creating menu:', errorMessage);
        throw new Error(errorMessage);
      });
  }

  async deleteMenu(id: string): Promise<{ message: string } | undefined> {
    return this.httpClient.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/menu/${id}`)
      .then(() => undefined)
      .catch(error => {
        const errorMessage = error.response?.data?.message || 'Failed to delete menu';
        console.error('Error deleting menu:', errorMessage);
        throw new Error(errorMessage);
      });
  }

  async updateMenu(menuId: string, menuToUpdate: UpdateMenu): Promise<IMenu | { message: string }> {
    return this.httpClient.patch(`${process.env.NEXT_PUBLIC_BASE_URL}/menu/${menuId}`, menuToUpdate, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.data)
      .catch(error => {
        const errorMessage = error.response?.data?.message || 'Failed to update menu';
        console.error('Error updating menu:', errorMessage);
        throw new Error(errorMessage);
      });
  }

  async findMenuToday(): Promise<any> {
    return this.httpClient.get(`${process.env.NEXT_PUBLIC_BASE_URL}/menu/today`)
      .then(res => res.data)
      .catch(error => {
        const errorMessage = error.response?.data?.message || 'Error fetching menu today';
        console.error(errorMessage);
      });
  }
}