import { AxiosInstance } from "axios";
import { IUser, CreateUser, UpdateUser } from "@/app/entity/user.entity";

export class UserService {
  private httpClient: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.httpClient = client;
  }

  async createUser(user: CreateUser): Promise<IUser> {
    return await this.httpClient.post('/user', user)
      .then((res) => {
        console.log('res', res);
        return res.data;
      }).catch((error: any) => {
        const errorMessage = error.response?.data?.message || 'Erro desconhecido ao criar usuario.'
        console.error('Error creating usuario:', errorMessage);
        throw errorMessage;
      });
  }

  async updateUser(userId: string, userToUpdate: UpdateUser) {
    return await this.httpClient.patch(`/user/${userId}`, userToUpdate)
      .then((res) => {
        console.log('res', res);
        return res.data;
      }).catch((error: any) => {
        const errorMessage = error.response?.data?.message
        console.error('Error deleting food:', errorMessage);
        throw errorMessage;
      });
  }

  async getLoggedUser(loggedUserEmail: string): Promise<IUser> {
    return await this.httpClient.get(`/user/email/${loggedUserEmail}`)
      .then((res) => {
        console.log('res', res);
        return res?.data;
      }).catch((error: any) => {
        const errorMessage = error.response?.data?.message || 'Failed to get user';
        console.error('Error getting user:', errorMessage);
        throw errorMessage;
      });
  }

  async loginUser(email: string, password: string): Promise<any> {
    try {
      const response = await this.httpClient.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, { email, password });
      console.log('response', response.data)
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to login';
      console.error('Error logging in:', errorMessage);
      return { message: { error: errorMessage } };
    }
  }
}