'use client'
import React, { useState } from 'react';
import { Button, Accordion, AccordionSummary, Typography, AccordionDetails, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, List, ListItem, ListItemText, AccordionActions } from '@mui/material';
import Header from "../components/header";
import { ArrowDropDown, Edit, Delete, Add } from '@mui/icons-material';

interface Menu {
  id: string;
  date: string;
  accompaniment: string;
  garnish: string;
  mainCourse: string;
  dessert: string;
}

export default function Menu(){
  const [menus, setMenus] = useState([
    { id: '124234', date: '17/06/2024', accompaniment: 'Item 1', garnish: 'Item 2', mainCourse: 'Item 3', dessert: 'Item 4' },
    { id: '22152345', date: '18/06/2024', accompaniment: 'Item 5', garnish: 'Item 6', mainCourse: 'Item 7', dessert: 'Item 8' },
  ]);
  const [open, setOpen] = useState(false);
  const [newMenu, setNewMenu] = useState<Menu>({ id: '', date: '', accompaniment: '', garnish: '', mainCourse: '', dessert: '' });
  const [newItem, setNewItem] = useState('');

  const handleAddMenu = () => {
    setOpen(false);
    setMenus(prevMenus => [...prevMenus, { ...newMenu }]);
    setNewMenu({id:'', date: '', accompaniment: '', garnish: '', mainCourse: '', dessert: ''});
  };

  const handleDeleteMenu = (id: string) => {
    // Implement delete menu logic
  };

  const handleEditMenu = (id: string) => {
    // Implement edit menu logic
  };

  return (
    <>
      <Header title="Cardápio"/>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Adicionar Cardápio
      </Button>
      {menus.map(menu => (
        <Accordion className='mt-4' key={menu.id}>
          <AccordionSummary
            expandIcon={<ArrowDropDown />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Cardápio {menu.date}</Typography>
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
            <IconButton className='flex gap-2' color='primary' size='small' onClick={() => handleEditMenu(menu.id)}>Editar <Edit /></IconButton>
            <IconButton className='flex gap-2' color='error' size='small' onClick={() => handleDeleteMenu(menu.id)}>Deletar <Delete /></IconButton>
          </AccordionActions>
        </Accordion>
      ))}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Adicionar Cardápio</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            type="date"
            fullWidth
            value={newMenu.date}
            onChange={(e) => setNewMenu({ ...newMenu, date: e.target.value })}
          />
          <div>
            <div className='flex justify-center'>
              <TextField
                margin="dense"
                label="Item"
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
              />
              <IconButton ><Add /></IconButton>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleAddMenu}>Adicionar</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
