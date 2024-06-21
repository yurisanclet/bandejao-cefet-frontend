'use client'
import { useEffect, useState } from "react";
import Header from "../components/header";
import { TodayMenu } from "../components/today-menu";
import FutureMenu from "../components/future-menu-list";
import NotificationList from "../components/notifications-list";
import { IMenu } from "../inteface";
import { getMenus, findMenuToday } from "../lib/actions/menu-actions";
import { addDays, format } from "date-fns";

export default function Home() {
  const [menus, setMenus] = useState<IMenu[]>([])
  const [isLoading, setIsLoading] = useState(false);
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


  useEffect(() => {
    const fetchMenus = async () => {
      console.log(dateRange)
      const data = await getMenus(dateRange); // Passe dateRange como argumento
      console.log(data)
      setMenus(data.items);
    };
    const fetchTodayMenu = async () => {
      const data = await findMenuToday();
      setMenuToday(data);
    }

    fetchTodayMenu();
    fetchMenus();
  }, [dateRange]); 

  return (
    <div>
      <Header title="Tela inicial" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <section className="mb-8">
          <TodayMenu title="Cardápio do Dia" items={menuToday} />
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
