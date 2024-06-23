export interface IMenu {
  id: string;
  date: string;
  accompaniment: string;
  garnish: string;
  mainCourse: string;
  dessert: string;
}

export interface CreateMenu extends Omit<IMenu, 'id'> {}

export interface UpdateMenu extends Omit<IMenu, 'id'> {}