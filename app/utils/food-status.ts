enum FoodStatus {
  OutOfDate = 'Fora da Validade',
  InDate = 'Dentro da Validade'
}

interface FoodStatusIndex {
  [key: string]: FoodStatus;
}

export const convertEnumFoodStatus = (status: string) => {
  const foodStatusIndex: FoodStatusIndex = FoodStatus;
  return foodStatusIndex[status];
}