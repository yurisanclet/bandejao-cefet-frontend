'use client'
import FoodTable from "../components/food-table";
import Header from "../components/header";
import { Food } from "../inteface";

export default function Foods(){

  const initialFoods: Food[] = [
    { id: 1, name: 'Arroz', nutritionalData: 'Carboidratos', expiryDate: '2024-06-11' },
    { id: 2, name: 'Feijão', nutritionalData: 'Proteínas', expiryDate: '2024-06-12' },
  ];

  return (
    <div>
      <Header title="Alimentos"/>
      <div>
        <FoodTable initialFoods={initialFoods} />
      </div>
    </div>
  )
}