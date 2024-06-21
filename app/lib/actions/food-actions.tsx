"use server"

import {IFoodCreateOrUpdate, PaginatedFoods } from "@/app/inteface"
import { buildQueryString } from "@/app/utils/queryStringBuilder";

export async function getFoods(sort?: string, expiryDate?: string, name?: string): Promise<PaginatedFoods> {
  const page = 1;
  const size = 10;
  const params: Record<string, string | string[] | undefined> = {
    sort: sort ? `expiryDate:${sort}` : undefined,
    page: String(page),
    size: String(size),
  };
  if (expiryDate) {
    params['filter'] = `expiryDate:lte:${expiryDate}`;
  }
  if (name) {
    params['filter'] = `name:eq:${name}`;  
  }
  console.log(params)
  const queryString = buildQueryString(params);
  try {
    const res = await fetch(`${process.env.BASE_URL}/food?${queryString}`);
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching foods:', error);
    return { items: [], error: error.message, total: 0, page: 0, size: 0 }; 
  }
}

export async function createFood(foodToCreate: IFoodCreateOrUpdate): Promise<void> {
  try {
    const res = await fetch(`${process.env.BASE_URL}/food`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(foodToCreate),
    });
    if (!res.ok) {
      throw new Error('Failed to create food');
    }
  } catch (error: any) {
    console.error('Error creating food:', error);
    throw error;
  }
}

export async function deleteFood(id: string): Promise<void> {
  try {
    const res = await fetch(`${process.env.BASE_URL}/food/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) {
      throw new Error('Failed to delete food');
    }
  } catch (error: any) {
    console.error('Error deleting food:', error);
    throw error
  }
}

export async function findOne(name: string) {
  try {
    const res = await fetch(`${process.env.BASE_URL}/food?name=${name}`);
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.error('Error fetching food:', error);
    return { items: [], error: error.message, total: 0, page: 0, size: 0 };
  }
}

export async function updateFood(id: string, food: IFoodCreateOrUpdate): Promise<void> {
  try {
    const res = await fetch(`${process.env.BASE_URL}/food/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(food),
    });
    if (!res.ok) {
      throw new Error('Failed to update food');
    }
  } catch (error: any) {
    console.error('Error updating food:', error);
    throw error;
  }
}
