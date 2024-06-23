'use client'
import { useEffect, useState } from "react";
import Header from "../components/header";
import { TodayMenu } from "../components/today-menu";
import FutureMenu from "../components/future-menu-list";
import { IMenu } from "../entity/menu.entity";
import { addDays, format } from "date-fns";
import { MenuService } from "../lib/services/menu.service";
import client from "../lib/axios/client";
import { toast } from "react-toastify";

export default function Home() {

  const menuService = new MenuService(client)
  const [menus, setMenus] = useState<IMenu[]>([])
  const [menuToday, setMenuToday] = useState<IMenu>(
    {
      id: '',
      date: '',
      accompaniment: '',
      garnish: '',
      mainCourse: '',
      dessert: ''
    }
  )
  const currentDate = new Date();

  const futureDate = addDays(currentDate, 7);
  const formattedFutureDate = format(futureDate, 'yyyy-MM-dd');

  const [dateRange, setDateRange] = useState(formattedFutureDate)

  const handleGetMenus = async (dateRange: string) => {
    await menuService.getMenus(dateRange)
      .then((data) => {
        setMenus(data.items);
      })
      .catch((error) => {
        console.error('Error fetching menus:', error);
        toast.error('Erro ao buscar os cardápios!');
      });
  }

  const fetchMenuToday = async () => {
    await menuService.findMenuToday()
      .then((data) => {
        setMenuToday(data);
      })
  }


  useEffect(() => {
    fetchMenuToday();
  }, []); 
  
  useEffect(() => {
    handleGetMenus(dateRange);
  }, [dateRange]); 

  return (
    <div>
      <Header title="Tela inicial" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <section className="mb-8">
          <TodayMenu title="Cardápio do Dia" menu={menuToday} />
        </section>

        <section className="mb-8">
          <h2 className="text-lg mb-2">Próximos Cardápios</h2>
          <FutureMenu 
            setDateRange={setDateRange}
            menus={menus}
          />
        </section>
{/* 
        <section className="mb-8 lg:col-span-2">
          <NotificationList/>
        </section> */}

        {/* <section className="mb-8 lg:col-span-2">
          <h2 className="text-xl font-bold mb-2">Feedback dos Alunos</h2>
        </section> */}
      </div>
    </div>
  )
}
