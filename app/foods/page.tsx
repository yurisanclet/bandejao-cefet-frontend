'use client'
import FoodTable from "../components/food-table";
import Header from "../components/header";

export default function Foods(){
  return (
    <div>
      <Header title="Alimentos"/>
      <div>
        <FoodTable />
      </div>
    </div>
  )
}