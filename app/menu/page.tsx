'use client'
import React, { FormEvent, useEffect, useState } from 'react';
import { Button, Accordion, AccordionSummary, Typography, AccordionDetails, IconButton, List, ListItem, ListItemText, AccordionActions } from '@mui/material';
import Header from "../components/header";
import { ArrowDropDown, Edit, Delete, Add } from '@mui/icons-material';
import { ConfirmModal, MenuModal } from '../components/menu-modals';
import { IMenu, IMenuCreateOrUpdate } from '../inteface';
import { getMenus, createMenu, deleteMenu, updateMenu } from '../lib/actions/menu-actions';
import { toast } from 'react-toastify';
import { formatDateWithWeekDay } from '../utils/date-formatter';

export default function Menu(){

  const [menuToDelete, setMenuToDelete] = useState<string | null>(null);
  const [menus, setMenus] = useState<IMenu[]>([]);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [newMenu, setNewMenu] = useState<IMenu>({ id: '', date: '', accompaniment: '', garnish: '', mainCourse: '', dessert: '' });

  const handleGetMenus = async () => {
    await getMenus().then((data) => {
      console.log(data)
      if(data.error){
        console.log(data.error)
        return
      }
      setMenus(data.items);
    });
  }

  const handleCreateMenu = async (menuToCreate: IMenuCreateOrUpdate) => {
    const result = await createMenu(menuToCreate);

    if ('message' in result) {
      toast.error('Erro ao criar menu:' + result.message);
      return; // Handle error
    }
    setMenuModalOpen(false);
  };

  const handleUpdateMenu = async (menuId: string, menuToUpdate: IMenuCreateOrUpdate) => {
    try {
      const updatedMenu = await updateMenu(menuId, menuToUpdate);
      setMenuModalOpen(false);
      toast.success('Menu atualizado com sucesso!');
    } catch (error: any) {
      console.error('Error updating menu:', error);
      toast.error('Erro ao atualizar o menu!'); 
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const menuToCreateOrUpdate: IMenuCreateOrUpdate = {
      date: newMenu.date,
      accompaniment: newMenu.accompaniment,
      garnish: newMenu.garnish,
      mainCourse: newMenu.mainCourse,
      dessert: newMenu.dessert
    };
    
    if (newMenu.id) {
      await handleUpdateMenu(newMenu.id, menuToCreateOrUpdate);
    } else {
      await handleCreateMenu(menuToCreateOrUpdate);
    }
    handleGetMenus();
    setNewMenu({id:'', date: '', accompaniment: '', garnish: '', mainCourse: '', dessert: ''});
    setMenuModalOpen(false);
  };

  const handleDeleteMenu = async (id: string) => {
    setMenuToDelete(id);
    setConfirmModalOpen(true);
  };

  const handleEditMenu = (menu: IMenu) => {
    setNewMenu(menu);
    setMenuModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!menuToDelete) return;
  
    try {
      await deleteMenu(menuToDelete);
      toast.success("Menu deletado com sucesso!");
    } catch (error: any) {
      console.error('Error deleting menu:', error);
      toast.error('Erro ao deletar o menu!'); 
    } finally {
      setMenuToDelete(null);
      setConfirmModalOpen(false);
      handleGetMenus();
    }
  };

  useEffect(() => {
    handleGetMenus()
  }, [])

  return (
    <>
      <Header title="Cardápio"/>
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
                <ListItemText primary="Acompanhamento" primaryTypographyProps={{ style: { color: '#1D4ED8'}}} secondary={menu.accompaniment} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Guarnição" primaryTypographyProps={{ style: { color: '#1D4ED8'}}} secondary={menu.garnish} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Prato Principal" primaryTypographyProps={{ style: { color: '#1D4ED8'}}} secondary={menu.mainCourse} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Sobremesa" primaryTypographyProps={{ style: { color: '#1D4ED8'}}} secondary={menu.dessert} />
              </ListItem>
            </List>
          </AccordionDetails>
          <AccordionActions>
            <IconButton className='flex gap-2' color='primary' size='small' onClick={() => handleEditMenu(menu)}>Editar <Edit /></IconButton>
            <IconButton className='flex gap-2' color='error' size='small' onClick={() => handleDeleteMenu(menu.id)}>Deletar <Delete /></IconButton>
          </AccordionActions>
        </Accordion>
      ))}
      <MenuModal
        open={menuModalOpen}
        handleClose={() => setMenuModalOpen(false)}
        handleSave={handleSubmit}
        menu={newMenu}
        setMenu={setNewMenu}
      />
      <ConfirmModal
        open={confirmModalOpen}
        handleClose={() => setConfirmModalOpen(false)}
        handleConfirm={handleConfirmDelete}
      />
    </>
  )
}
