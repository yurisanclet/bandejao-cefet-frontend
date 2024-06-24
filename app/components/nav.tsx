import Link from "next/link";
import {
  MenuBook,
  Fastfood,
  Home,
  Person,
  ExitToApp
} from '@mui/icons-material';
import Image from "next/image";
import logo from '../../public/branco.png';
import { useEffect, useState } from "react";

export default function Nav() {
  const getUserRole = () => {
    if (typeof window !== 'undefined') {
      const storedUser = JSON.parse(localStorage.getItem('role') || '{}');
      return storedUser;
    }
    return null;
  }

  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);
  }, []);
  
  return (
    <div className="bg-blue-900 text-white flex flex-col justify-start items-center h-full">
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
        {userRole !== 'USER' && (
          <li className="flex flex-row items-center gap-1 transition-transform duration-500 ease-in-out transform hover:scale-110">
            <Fastfood/>
            <Link className="text-lg" href="/foods">Alimentos</Link>
          </li>
        )}
        <li className="flex flex-row items-center gap-1 transition-transform duration-500 ease-in-out transform hover:scale-110">
          <Person/>
          <Link className="text-lg" href="/perfil">Perfil</Link>
        </li>
        <li className="flex flex-row items-center gap-1 transition-transform duration-500 ease-in-out transform hover:scale-110">
          <ExitToApp/>
          <Link className="text-lg" href="/logout">Sair</Link>
        </li>
      </ul>
    </div>
  );
}
