'use client';
import Header from "../components/header";
import { getFoods, deleteFood, updateFood, createFood, findOne } from "../lib/actions/food-actions";
import { IFood, IFoodCreateOrUpdate } from "../inteface";
import { FormEvent, useEffect, useState } from "react";
import { 
  Button, 
  Card, 
  CircularProgress, 
  IconButton, 
  InputAdornment, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField
} from "@mui/material";
import { toast } from "react-toastify";
import { Search, Sort } from "@mui/icons-material";
import { UpdateOrCreateFoodModal } from "../components/food-modals";
import { formatDate } from "../utils/date-formatter";
import { convertEnumFoodStatus } from "../utils/food-status";


export default function Foods() {
  const [foods, setFoods] = useState<IFood[]>([]);
  const [newFood, setNewFood] = useState<IFood>({
    id: '',
    name: '',
    nutritionalData: '',
    quantity: 0,
    expiryDate: '',
    status: ''
  });
  const [searchName, setSearchName] = useState('');
  const [filters, setFilters] = useState({
    sort: 'asc',
    expiryDate: '',
    name: ''
  });
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);

  
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prevFilters => ({ ...prevFilters, expiryDate: event.target.value }));
  };
  
  const handleSortClick = () => {
    setFilters(prevFilters => ({ ...prevFilters, sort: prevFilters.sort === 'asc' ? 'desc' : 'asc' }));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value);
  };
  
  const handleSearchClick = () => {
    setFilters(prevFilters => ({ ...prevFilters, name: searchName }));
  };
  


  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();

    const foodToCreateOrUpdate: IFoodCreateOrUpdate = {
      name: newFood.name,
      nutritionalData: newFood.nutritionalData,
      quantity: newFood.quantity,
      expiryDate: newFood.expiryDate,
      status: newFood.status
    }

    if (newFood.id) {
      await handleUpdate(newFood.id, foodToCreateOrUpdate);
    } else {
      await handleCreateFood(foodToCreateOrUpdate);
    }
  
    setNewFood({
      id: '',
      name: '',
      nutritionalData: '',
      quantity: 0,
      expiryDate: '',
      status: ''
    });
    fetchFoods()
  }

  const fetchFoods = async () => {
    setIsLoading(true);
    try {
      console.log('filters: ',filters)
      const data  = await getFoods(filters.sort, filters.expiryDate, filters.name);
      console.log(data)
      setFoods(data.items);
      setIsSearchEmpty(data.items.length === 0); 
    } catch (error) {
      console.error('Error fetching foods:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFood(id);
      toast.success('Alimento deletado com sucesso!');
    } catch (error) {
      toast.error(`Erro ao deletar o alimento: ${error}`);
      console.log(error);
    }
    fetchFoods();
  }

  const handleCreateFood = async (foodToCreate: IFoodCreateOrUpdate) => {
    try {
      await createFood(foodToCreate);
      toast.success('Alimento criado com sucesso!');
    } catch (error ) {
      toast.error(`Erro ao criar o alimento: ${error}`);
      console.log(error);
    }
    fetchFoods();
    setOpen(false);
  }

  const handleUpdate = async (id: string, food: IFoodCreateOrUpdate) => {
    try {
      await updateFood(id, food);
      setOpen(false)
      toast.success('Menu atualizado com sucesso!');
    } catch (error) {
      toast.error(`Erro ao atualizar o menu: ${error}`);
      console.log(error)
      setOpen(false);
    }
    fetchFoods();
  }

  const handleEdit = (food: IFood) => {
    setNewFood(food); 
    setOpen(true); 
  };

  const clearFilters = () => {
    setFilters({
      sort: 'asc',
      expiryDate: '',
      name: ''
    });
    setSearchName('');
  };

  useEffect(() => {
    fetchFoods();
  }, [filters]);

  return (
    <div>
      <Header title="Alimentos" />
      <div>
        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh' }}>
            <CircularProgress />
          </div>
        ) : (
          <TableContainer component={Card}>
              <>
                <div className="flex justify-start gap-3">
                  <TextField
                    label="Buscar"
                    value={searchName}
                    onChange={handleNameChange}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end"
                          onClick={handleSearchClick}
                        >
                          <IconButton>
                            <Search />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    type='date'
                    value={filters.expiryDate}
                    onChange={(handleDateChange)}
                    InputLabelProps={{
                      shrink: true
                    }}
                  />
                  <Button className="self-center" variant="contained" color="primary" onClick={clearFilters}>
                    Limpar Filtros
                  </Button>
                </div>
                {!isSearchEmpty ? (
                  <>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Nome</TableCell>
                          <TableCell>Dados Nutricionais</TableCell>
                          <TableCell><Sort onClick={handleSortClick} className='cursor-pointer' />Data de Validade</TableCell>
                          <TableCell>Quantidade {'(em kg)'} </TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Ações</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {foods.map(food => (
                          <TableRow key={food.id}>
                            <TableCell>{food.name}</TableCell>
                            <TableCell>{food.nutritionalData}</TableCell>
                            <TableCell>{ formatDate(food.expiryDate)}</TableCell>
                            <TableCell>{food.quantity}</TableCell>
                            <TableCell>{convertEnumFoodStatus(food.status)}</TableCell>
                            <TableCell>
                              <Button variant="contained" color="primary" onClick={() => handleEdit(food)}>
                                Alterar
                              </Button>
                              <Button variant="contained" color="error" onClick={() => handleDelete(food.id)} style={{ marginLeft: 8 }}>
                                Excluir
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                ): (
                  <>
                    <div className='flex flex-col text-center gap-2 py-4'>
                      <h2 className='text-1xl font-semibold'>Nenhum resultado encontrado</h2>
                      <p>Cadaste um novo alimento ou limpe os filtros e tente novamente</p>
                    </div>
                  </>
                )}
                <div style={{ display: 'flex', justifyContent: isSearchEmpty ? 'center' : 'flex-start' }}>
                  <Button
                    variant="contained" 
                    color="primary" 
                    onClick={() => setOpen(true)} 
                    style={{
                      margin: 16
                    }}
                  >
                    Cadastrar Novo Alimento
                  </Button>
                </div>
              </>
            <UpdateOrCreateFoodModal
              open={open}
              handleClose={() => setOpen(false)}
              handleSave={handleSubmit}
              food={newFood}
              setFood={setNewFood}
            />
              </TableContainer>
        )}
      </div>
    </div>
  )
}