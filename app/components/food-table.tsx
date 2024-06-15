import React, { useEffect, useState } from 'react';
import {
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Paper, 
  Button, 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment
} from '@mui/material';
import { Search, Sort, Event } from '@mui/icons-material';

interface Food {
  id: number;
  name: string;
  nutritionalData: string;
  expiryDate: string;
}

const initialFoods: Food[] = [
  { id: 1, name: 'Arroz', nutritionalData: 'Carboidratos', expiryDate: '2024-06-11' },
  { id: 2, name: 'Feijão', nutritionalData: 'Proteínas', expiryDate: '2024-06-12' },
];

const FoodTable: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>(initialFoods);
  const [open, setOpen] = useState(false);
  const [newFood, setNewFood] = useState<Partial<Food>>({});
  const [search, setSearch] = useState('');
  const [expiryFilter, setExpiryFilter] = useState('');
  const [sortOrder, setSortOrder] = useState(true);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewFood(prev => ({ ...prev, [name]: value }));
  };

  const addFood = () => {
    if (newFood.name && newFood.nutritionalData && newFood.expiryDate) {
      const id = foods.length ? foods[foods.length - 1].id + 1 : 1;
      setFoods(prev => [...prev, { id, ...newFood } as Food]);
      setNewFood({});
      setOpen(false);
    }
  };

  const deleteFood = (id: number) => {
    setFoods(prev => prev.filter(food => food.id !== id));
  };

  const updateFood = (id: number) => {
    // Implement update logic
  };


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleExpiryFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpiryFilter(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(!sortOrder);
  };

  useEffect(() => {
    let filteredFoods = [...foods];

    if (search) {
      filteredFoods = filteredFoods.filter(food => food.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (expiryFilter) {
      const today = new Date();
      filteredFoods = filteredFoods.filter(food => expiryFilter === 'expired' ? new Date(food.expiryDate) < today : new Date(food.expiryDate) >= today);
    }

    if (sortOrder) {
      filteredFoods.sort((a, b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime());
    } else {
      filteredFoods.sort((a, b) => new Date(b.expiryDate).getTime() - new Date(a.expiryDate).getTime());
    }

    setFoods(filteredFoods);
  }, [search, expiryFilter, sortOrder]);

  return (
    <TableContainer component={Paper}>
      <TextField
        label="Buscar"
        value={search}
        onChange={handleSearchChange}
        className='mr-3'
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        type='date'
        InputLabelProps={{
          shrink: true
        }}
      >
        <option value="">Todos</option>
        <option value="expired">Vencido</option>
        <option value="notExpired">Não vencido</option>
      </TextField>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Dados Nutricionais</TableCell>
            <TableCell><Sort onClick={toggleSortOrder} className='cursor-pointer' />Data de Validade</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {foods.map(food => (
            <TableRow key={food.id}>
              <TableCell>{food.name}</TableCell>
              <TableCell>{food.nutritionalData}</TableCell>
              <TableCell>{food.expiryDate}</TableCell>
              <TableCell>
                <Button variant="contained" color="primary" onClick={() => updateFood(food.id)}>
                  Alterar
                </Button>
                <Button variant="contained" color="error" onClick={() => deleteFood(food.id)} style={{ marginLeft: 8 }}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)} style={{ margin: 16 }}>
        Cadastrar Novo Alimento
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Cadastrar Novo Alimento</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Nome"
            fullWidth
            value={newFood.name || ''}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="nutritionalData"
            label="Dados Nutricionais"
            fullWidth
            value={newFood.nutritionalData || ''}
            onChange={handleInputChange}
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
            value={newFood.expiryDate || ''}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={addFood} color="primary">
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>
    </TableContainer>
  );
};

export default FoodTable;
