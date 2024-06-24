'use client'
import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Accordion, AccordionSummary, Typography, AccordionDetails, IconButton, List, ListItem, ListItemText, AccordionActions } from '@mui/material';
import Header from "../components/header";
import { ArrowDropDown, Edit, Delete } from '@mui/icons-material';
import { MenuModal } from '../components/menuDialog';
import { IMenu, CreateMenu, UpdateMenu } from '@/app/entity/menu.entity'; 
import { toast } from 'react-toastify';
import { formatDateWithWeekDay } from '../utils/date-formatter';
import { MenuService } from '../lib/services/menu.service';
import client from '../lib/axios/client';

export default function Menu() {
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<IMenu | null>(null);
  const menuService = new MenuService(client);

  const handleGetMenus = async () => {
    await menuService.getMenus()
      .then((data) => {
        setMenus(data.items);
      })
      .catch((error) => {
        console.error('Error fetching menus:', error);
        toast.error('Erro ao buscar os cardápios!');
      });
  };

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

  const onSave = () => {
    handleGetMenus();
  }

  const handleEdit = (menu: IMenu) => {
    setSelectedMenu(menu);
    setMenuModalOpen(true);
  }

  const handleConfirmDelete = async (id: string) => {
    await menuService.deleteMenu(id)
      .then(() => {
        toast.success('Menu deletado com sucesso!');
        handleGetMenus();
      })
      .catch((error) => {
        console.error('Error deleting menu:', error);
        toast.error('Erro ao deletar o menu!');
      });
  };

  const handleClose = () => {
    setMenuModalOpen(false);
    setSelectedMenu(null);
  }

  useEffect(() => {
    handleGetMenus();
  }, []);

  return (
    <>
      <Header title="Cardápio" />
      <Button variant="contained" color="primary" onClick={() => setMenuModalOpen(true)}>
        Adicionar Cardápio
      </Button>
      {menus?.map(menu => (
        <Accordion className='mt-4' key={menu.id}>
          <AccordionSummary
            expandIcon={<ArrowDropDown />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography fontSize={20}>Cardápio - {formatDateWithWeekDay(menu.date)}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List className='flex'>
              <ListItem>
                <ListItemText primary="Acompanhamento" primaryTypographyProps={{ style: { color: '#1D4ED8' } }} secondary={menu.accompaniment} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Guarnição" primaryTypographyProps={{ style: { color: '#1D4ED8' } }} secondary={menu.garnish} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Prato Principal" primaryTypographyProps={{ style: { color: '#1D4ED8' } }} secondary={menu.mainCourse} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Sobremesa" primaryTypographyProps={{ style: { color: '#1D4ED8' } }} secondary={menu.dessert} />
              </ListItem>
            </List>
          </AccordionDetails>
          <AccordionActions>
            {userRole !== 'USER' && (
              <IconButton className='flex gap-2' color='primary' size='small' onClick={() => handleEdit({...menu})}>Editar <Edit /></IconButton>
            )}
            {userRole !== 'USER' && (          
              <IconButton className='flex gap-2' color='error' size='small' onClick={() => handleConfirmDelete(menu.id)}>Deletar <Delete /></IconButton>
            )}
          </AccordionActions>
        </Accordion>
      ))}
      <MenuModal
        open={menuModalOpen}
        handleClose={handleClose}
        onSave={onSave}
        selectedMenu={selectedMenu}
      />
    </>
  );
}