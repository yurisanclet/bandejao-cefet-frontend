import Link from "next/link";
import {
  MenuBook,
  Fastfood,
  CalendarToday,
  Home,
  Person
} from '@mui/icons-material';
import Image from "next/image";
import logo from '../../public/branco.png';

export default function Nav() {
  return (
    <div className="bg-blue-900 text-white flex flex-col justify-start items-center h-screen">
      <Image src={logo} alt={""}/>
      <ul className="flex flex-col gap-6">
      <li className="flex flex-row items-center gap-1 transition-transform duration-500 ease-in-out transform hover:scale-110">
          <Home/>
          <Link className="text-lg" href="/home">Inicio</Link>
        </li>
        <li className="flex flex-row items-center gap-1 transition-transform duration-500 ease-in-out transform hover:scale-110">
          <MenuBook/>
          <Link className="text-lg" href="/menu">Cardápio</Link>
        </li>
        <li className="flex flex-row items-center gap-1 transition-transform duration-500 ease-in-out transform hover:scale-110">
          <Fastfood/>
          <Link className="text-lg" href="/foods">Alimentos</Link>
        </li>
        <li className="flex flex-row items-center gap-1 transition-transform duration-500 ease-in-out transform hover:scale-110">
          <CalendarToday/>
          <Link className="text-lg" href="/route3">Calendario</Link>
        </li>
        <li className="flex flex-row items-center gap-1 transition-transform duration-500 ease-in-out transform hover:scale-110">
          <Person/>
          <Link className="text-lg" href="/route4">Perfil</Link>
        </li>
      </ul>
    </div>
  );
}