import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { IFood } from "../inteface";
import { FoodService } from "../lib/services/food.service";
import client from "../lib/axios/client";

interface FoodModalProps {
  open: boolean;
  handleClose: () => void;
  selectedFood?: IFood | null;
  onSave: () => void; // Função callback para ser chamada após salvar os dados
}

export const UpdateOrCreateFoodModal: React.FC<FoodModalProps> = ({ open, handleClose, selectedFood, onSave }) => {
  const { control, handleSubmit, reset } = useForm<IFood>({
    defaultValues: {
      name: '',
      nutritionalData: '',
      quantity: 0,
      expiryDate: '',
    }
  });

  useEffect(() => {
    if (open) {
      if (selectedFood) {
        reset(selectedFood);
      } else {
        reset({
          name: '',
          nutritionalData: '',
          quantity: 0,
          expiryDate: '',
        });
      }
    }
  }, [open, selectedFood, reset]);

  const foodService = new FoodService(client);

  const onSubmit = async (data: IFood) => {
    try {
      if (selectedFood) {
        await foodService.updateFood(selectedFood.id, data);
        toast.success('Alimento atualizado com sucesso!');
      } else {
        await foodService.createFood(data);
        toast.success('Alimento criado com sucesso!');
      }
      onSave(); // Chamar a função de callback para atualizar a lista de alimentos
      handleClose();
    } catch (error) {
      toast.error(`Erro ao ${selectedFood?.id ? 'atualizar' : 'criar'} o alimento: ${error}`);
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{selectedFood ? 'Editar alimento' : 'Adicionar alimento'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Nome" fullWidth required autoFocus margin="dense" />
            )}
          />
          <Controller
            name="nutritionalData"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Dados Nutricionais" fullWidth required margin="dense" />
            )}
          />
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Quantidade (em kg)" fullWidth required type="number" margin="dense" />
            )}
          />
          <Controller
            name="expiryDate"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Data de Validade" type="date" fullWidth required margin="dense" InputLabelProps={{ shrink: true }} />
            )}
          />
          <DialogActions>
            <Button onClick={handleClose} color="error">Cancelar</Button>
            <Button type="submit" color="primary">{selectedFood ? 'Salvar' : 'Adicionar'}</Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
