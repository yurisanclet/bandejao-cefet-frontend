'use client'
import React, { useState } from 'react';
import { Button, Accordion, AccordionSummary, Typography, AccordionDetails, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton, Chip, AccordionActions } from '@mui/material';
import Header from "../components/header";
import { ArrowDropDown, Edit, Delete, Add } from '@mui/icons-material';

export default function Menu(){
  const [menus, setMenus] = useState([
    { id: '124234', date: '17/06/2024', items: ['Item 1', 'Item 2', 'Item 3'] },
    { id: '22152345', date: '18/06/2024', items: ['Item 4', 'Item 5', 'Item 6'] },
  ]);
  const [open, setOpen] = useState(false);
  const [newMenu, setNewMenu] = useState<{ date: string; items: string[] }>({ date: '', items: [] });
  const [newItem, setNewItem] = useState('');

  const handleAddMenu = () => {
    setOpen(false);
    setMenus(prevMenus => [...prevMenus, { id: Date.now().toString(), ...newMenu }]);
    setNewMenu({ date: '', items: [] });
  };

  const handleDeleteMenu = (id: string) => {
    // Implement delete menu logic
  };

  const handleEditMenu = (id: string) => {
    // Implement edit menu logic
  };

  const handleAddItem = () => {
    setNewMenu(prev => ({ ...prev, items: [...prev.items, newItem] }));
    setNewItem('');
  };

  const handleDelete = (itemToDelete: string) => () => {
    setNewMenu(prev => ({ ...prev, items: prev.items.filter(item => item !== itemToDelete) }));
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
            {menu.items.map(item => (
              <Typography key={item}>{item}</Typography>
            ))}
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
            {newMenu.items.map((item, index) => (
              <Chip key={index} label={item} onDelete={handleDelete(item)} />
            ))}
            <TextField
              margin="dense"
              label="Item"
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
            <IconButton onClick={handleAddItem}><Add /></IconButton>
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