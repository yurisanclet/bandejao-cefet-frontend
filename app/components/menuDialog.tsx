import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { IMenu } from '@/app/entity/menu.entity';
import { MenuService } from '../lib/services/menu.service';
import client from '../lib/axios/client';
import { toast } from 'react-toastify';

interface MenuModalProps {
  open: boolean;
  handleClose: () => void;
  onSave: () => void;
  selectedMenu?: IMenu | null;
}

export const MenuModal: React.FC<MenuModalProps> = ({ open, handleClose, onSave, selectedMenu }) => {
  const { control, handleSubmit, reset } = useForm<IMenu>({
    defaultValues: {
      date: '',
      accompaniment: '',
      garnish: '',
      mainCourse: '',
      dessert: '',
    }
  });

  useEffect(() => {
    console.log('selectedMenu', selectedMenu)
    if(open){
      if (selectedMenu) {
        reset(selectedMenu);
      } else {
        reset({
          date: '',
          accompaniment: '',
          garnish: '',
          mainCourse: '',
          dessert: '',
        });
      }
    }
  }, [open, selectedMenu, reset]);

  const onSubmit = async (menu: IMenu) => {
    const menuService = new MenuService(client);
    try {
      if (selectedMenu?.id) {
        await menuService.updateMenu(selectedMenu.id, menu);
        toast.success('Menu atualizado com sucesso!');
      } else {
        await menuService.createMenu(menu);
        toast.success('Menu criado com sucesso!');
      }
      onSave();
      handleClose();
    } catch (error) {
      toast.error(`Erro ao ${selectedMenu?.id ? 'atualizar' : 'criar'} o menu: ${error}`);
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{selectedMenu ? 'Editar Cardápio' : 'Adicionar Cardápio'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="date"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Data" type="date" fullWidth required margin="dense" InputLabelProps={{ shrink: true }} />
            )}
          />
          <Controller
            name="accompaniment"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Acompanhamento" fullWidth required margin="dense" />
            )}
          />
          <Controller
            name="garnish"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Guarnição" fullWidth required margin="dense" />
            )}
          />
          <Controller
            name="mainCourse"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Prato Principal" fullWidth required margin="dense" />
            )}
          />
          <Controller
            name="dessert"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Sobremesa" fullWidth required margin="dense" />
            )}
          />
          <DialogActions>
            <Button onClick={handleClose} color="error">Cancelar</Button>
            <Button type="submit" color="primary">{selectedMenu ? 'Salvar' : 'Adicionar'}</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};