'use client'
import { useState } from "react";
import Header from "../components/header";
import { MenuList } from "../components/menu-list";
import FutureMenu from "../components/menu-carousel";
import NotificationList from "../components/notifications-list";

export default function Home() {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const menuItems = [
    { name: 'Arroz', description: 'Arroz branco cozido', type: 'Acompanhamento' },
    { name: 'Feijão', description: 'Feijão preto temperado', type: 'Guarnição' },
    { name: 'Bife', description: 'Bife grelhado', type: 'Prato Principal' },
    { name: 'Maça', description: 'Maça verde', type: 'Sobremesa' }
  ];

  return (
    <div>
      <Header title="Tela inicial" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4">
        <section className="mb-8">
          <MenuList title="Cardápio do Dia" items={menuItems} />
        </section>

        <section className="mb-8">
          <h2 className="text-lg mb-2">Próximos Cardápios</h2>
          <FutureMenu />
        </section>

        <section className="mb-8 lg:col-span-2">
          <NotificationList/>
        </section>

        <section className="mb-8 lg:col-span-2">
          <h2 className="text-xl font-bold mb-2">Feedback dos Alunos</h2>
          {/* Conteúdo do feedback dos alunos */}
        </section>
      </div>
    </div>
  )
}
