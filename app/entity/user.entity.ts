
export interface IUser {
  id:string;
  email: string,
  password: string,
  document: string,
  name: string,
  birthDate: string,
  role: string,
}

export interface CreateUser extends Omit<IUser, 'id'> {}

export interface UpdateUser extends Omit<IUser, 'id'> {}