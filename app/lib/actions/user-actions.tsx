import { IUser } from "@/app/inteface";
import { fetchWithToken } from "../interceptor/intercept-tokeen";

export async function createUser(user: IUser){
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
    console.log(res) 
    if(res.ok){
      const data = await res.json()
      return data
    } else {
      const errorData = await res.json();
      const errorMessage = errorData.message || 'Failed to login';
      return { message: { error: errorMessage} }; 
    }
  } catch (error: any) {
    console.error('Error creating user:', error);
    throw error; 
  }
}

export async function updateUser(user: IUser) {
  try {
    const res = await fetchWithToken(`${process.env.NEXT_PUBLIC_BASE_URL}/user/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });



    if(res.ok){
      const data = await res.json()
      return data
    } else {
      const errorData = await res.json();
      const errorMessage = errorData.message || 'Failed to update user';
      return { message: { error: errorMessage} }; 
    }
  } catch (error: any) {
    console.error('Error updating user:', error);
    throw error; 
  }
}

export async function getLoggedUser(loggedUserEmail: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/user/email/${loggedUserEmail}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if(res.ok){
      const data = await res.json()
      return data
    } else {
      const errorData = await res.json();
      const errorMessage = errorData.message || 'Failed to get user';
      return { message: { error: errorMessage} }; // Return error object
    }

  } catch (error: any) {
    console.error('Error getting user:', error);
    throw error;
  }
}


export async function loginUser(email: string, password: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if(res.ok){
      const data = await res.json()
      return data
    } else {
      const errorData = await res.json();
      const errorMessage = errorData.message || 'Failed to login';
      return { message: { error: errorMessage} }; // Return error object
    }

  } catch (error: any) {
    console.error('Error logging in:', error);
    throw error;
  }
}