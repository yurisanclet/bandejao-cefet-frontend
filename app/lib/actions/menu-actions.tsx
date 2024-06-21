"use server"

import { IMenu, IMenuCreateOrUpdate, PaginatedMenus } from "@/app/inteface"
import { buildQueryString } from "@/app/utils/queryStringBuilder"

export async function getMenus(dateRange?: string): Promise<PaginatedMenus>{
  try {
    const page = 1;
    const size = 10;
    const params: Record<string, string | string[] | undefined> = {
      page: String(page),
      size: String(size),
    };
    if (dateRange) {
      params['filter'] = `date:lte:${dateRange}`;
    }
    const queryString = buildQueryString(params);
    const res = await fetch(`${process.env.BASE_URL}/menu?${queryString}`);
    const data = await res.json();
    return data;
    
  } catch (error: any) {
     return error.message
  }
}
export async function createMenu(menu: IMenuCreateOrUpdate): Promise<IMenu | { message: string }> {
  try {
    const res = await fetch(`${process.env.BASE_URL}/menu`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(menu)
    });

    if (!res.ok) {
      const errorData = await res.json();
      const errorMessage = errorData.message || 'Failed to create menu';
      return { message: errorMessage }; // Return error object
    }

    const createdMenu = await res.json();
    return createdMenu; 
  } catch (error: any) {
    console.error('Error creating menu:', error);
    throw error; 
  }
}

export async function deleteMenu(id: string): Promise<{ message: string } | undefined> {
  try {
    const res = await fetch(`${process.env.BASE_URL}/menu/${id}`, {
      method: 'DELETE'
    })

    if (!res.ok) {
      const errorData = await res.json();
      const errorMessage = errorData.message || 'Failed to delete menu';
      return { message: errorMessage }; // Return error object
    }

    return; 
  } catch (error: any) {
    console.error('Error deleting menu:', error);
    throw error; // Re-throw the error for further handling
  }
}


export async function updateMenu(menuId: string, menuToUpdate: IMenuCreateOrUpdate){
  try {
    const res = await fetch(`${process.env.BASE_URL}/menu/${menuId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(menuToUpdate)
    })

    if (!res.ok) {
      const errorData = await res.json();
      const errorMessage = errorData.message || 'Failed to create menu';
      return { message: errorMessage }; // Return error object
    }

    const updatedMenu = await res.json();
    return updatedMenu;
  } catch (error: any) {
    console.error('Error updating menu:', error);
    throw error; 
  }
}

export async function findMenuToday() {
  try {
    const res = await fetch(`${process.env.BASE_URL}/menu/today`);
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching menu:', error);
    return { items: [], error: error.message, total: 0, page: 0, size: 0 };
  }
}