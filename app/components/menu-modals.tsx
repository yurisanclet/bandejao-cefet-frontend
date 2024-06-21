import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { IMenu } from '../inteface';

interface MenuModalProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (e: React.FormEvent) => void;
  menu: IMenu;
  setMenu: (menu: any) => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({ open, handleClose, handleSave, menu, setMenu }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{menu.id ? 'Editar Cardápio' : 'Adicionar Cardápio'}</DialogTitle>
    <DialogContent>
      <form onSubmit={handleSave}>
        <TextField
          autoFocus
          margin="dense"
          type="date"
          name='date'
          fullWidth
          required
          value={menu.date}
          onChange={(e) => setMenu({ ...menu, date: e.target.value })}
        />
        <TextField
          autoFocus
          margin="dense"
          label="Acompanhamento"
          type="text"
          required
          name='accompaniment'
          fullWidth
          value={menu.accompaniment}
          onChange={(e) => setMenu({ ...menu, accompaniment: e.target.value })}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Guarnição"
            type="text"
            required
            name='garnish'
            fullWidth
            value={menu.garnish}
            onChange={(e) => setMenu({ ...menu, garnish: e.target.value })}
          />

          <TextField
            autoFocus
            margin="dense"
            label="Prato Principal"
            type="text"
            name='mainCourse'
            required
            fullWidth
            value={menu.mainCourse}
            onChange={(e) => setMenu({ ...menu, mainCourse: e.target.value })}
          />

          <TextField
            autoFocus
            margin="dense"
            label="Sobremesa"
            type="text"
            required
            name='dessert'
            fullWidth
            value={menu.dessert}
            onChange={(e) => setMenu({ ...menu, dessert: e.target.value })}
          />
        <DialogActions>
          <Button color="error" onClick={handleClose}>Cancelar</Button>
          <Button type="submit" onSubmit={handleSave}>{menu.id ? 'Salvar' : 'Adicionar'}</Button>
        </DialogActions>
      </form>
    </DialogContent>
  </Dialog>
);

interface ConfirmModalProps {
  open: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ open, handleClose, handleConfirm }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Confirmação</DialogTitle>
    <DialogContent>
      Você tem certeza que deseja deletar este cardápio?
    </DialogContent>
    <DialogActions>
      <Button color="error" onClick={handleClose}>Cancelar</Button>
      <Button onClick={handleConfirm}>Confirmar</Button>
    </DialogActions>
  </Dialog>
);