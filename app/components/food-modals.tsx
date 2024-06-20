import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { IFood } from "../inteface";

interface FoodModalProps {
  open: boolean;
  handleClose: () => void;
  handleSave: (e: React.FormEvent) => void;
  food: IFood;
  setFood: (food: any) => void;
}


export const UpdateOrCreateFoodModal: React.FC<FoodModalProps> = ({ open, handleClose, handleSave, food, setFood }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>{food.id ? 'Editar alimento' : 'Adicionar alimento'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Nome"
          fullWidth
          value={food.name || ''}
          onChange={(e) => setFood({...food, name: e.target.value})}
        />
        <TextField
          margin="dense"
          name="nutritionalData"
          label="Dados Nutricionais"
          fullWidth
          value={food.nutritionalData || ''}
          onChange={(e) => setFood({...food, nutritionalData: e.target.value})}
        />
        <TextField
          margin="dense"
          name="quantity"
          label="Quantidade (em kg)"
          fullWidth
          value={food.quantity || ''}
          onChange={(e) => setFood({...food, quantity: e.target.value})}
        />
        <TextField
          margin="dense"
          name="expiryDate"
          label="Data de Validade"
          type="date"
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          value={food.expiryDate || ''}
          onChange={(e) => setFood({...food, expiryDate: e.target.value})}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Cancelar
        </Button>
        <Button onClick={handleSave} color="primary">
        {food.id ? 'Salvar' : 'Adicionar'}
        </Button>
      </DialogActions>
</Dialog>
);
