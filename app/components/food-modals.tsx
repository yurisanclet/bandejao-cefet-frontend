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
        <form onSubmit={handleSave}>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            required
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
            required
            value={food.nutritionalData || ''}
            onChange={(e) => setFood({...food, nutritionalData: e.target.value})}
          />
          <TextField
            margin="dense"
            name="quantity"
            label="Quantidade (em kg)"
            fullWidth
            required
            value={food.quantity || ''}
            onChange={(e) => setFood({...food, quantity: e.target.value})}
          />
          <TextField
            margin="dense"
            name="expiryDate"
            label="Data de Validade"
            type="date"
            fullWidth
            required
            InputLabelProps={{
              shrink: true,
            }}
            value={food.expiryDate || ''}
            onChange={(e) => setFood({...food, expiryDate: e.target.value})}
          />
          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancelar
            </Button>
            <Button type="submit" color="primary">
            {food.id ? 'Salvar' : 'Adicionar'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
  </Dialog>
);
