'use client'
import { Button, Card, CircularProgress, IconButton, InputAdornment, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Search, Sort } from "@mui/icons-material";
import { UpdateOrCreateFoodModal } from "../components/foodDialog";
import { formatDate } from "../utils/date-formatter";
import { convertEnumFoodStatus } from "../utils/food-status";
import { FoodService } from "../lib/services/food.service";
import client from "../lib/axios/client";
import Header from "../components/header";
import { IFood } from "../inteface";
import { Food } from "../entity/food.entity";

export default function Foods() {
  const foodService = new FoodService(client);
  const [selectedFood, setSelectedFood] = useState<Food | null>(null);
  const [foods, setFoods] = useState<Food[]>([]);
  const [searchName, setSearchName] = useState('');
  const [filters, setFilters] = useState({
    sort: 'asc',
    expiryDate: '',
    name: ''
  });
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

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

  const fetchFoods = async () => {
    setIsLoading(true);
    await foodService.getFoods(filters.sort, filters.expiryDate, filters.name)
      .then((data) => {
        let filteredFoods = data.items;
  
        if (statusFilter !== 'all') {
          const currentDate = new Date();
          filteredFoods = filteredFoods.filter(food => {
            const expiryDate = new Date(food.expiryDate);
            const isExpired = expiryDate < currentDate;
            return (statusFilter === 'expired' && isExpired) || (statusFilter === 'notExpired' && !isExpired);
          });
        }
  
        setFoods(filteredFoods);
        setIsSearchEmpty(filteredFoods.length === 0);
      })
      .catch((error) => {
        console.error('Error fetching foods:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDelete = async (id: string) => {
    await foodService.deleteFood(id)
      .then(() => {
        toast.success('Alimento excluído com sucesso!');
      }).catch((error) => {
        toast.error(`Erro ao excluir o alimento: ${error}`);
        console.log(error);
      });
    fetchFoods();
  };

  const handleEdit = (food: Food) => {
    setSelectedFood(food);
    setOpen(true);
  };

  const clearFilters = () => {
    setFilters({
      sort: 'asc',
      expiryDate: '',
      name: ''
    });
    setSearchName('');
    setStatusFilter('all');
  };

  const handleModalClose = () => {
    setOpen(false);
    setSelectedFood(null); // Limpar o selectedFood ao fechar o modal
  };

  const handleSave = () => {
    fetchFoods();
    handleModalClose();
  };

  useEffect(() => {
    fetchFoods();
  }, [filters, statusFilter]);

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
              <div className="flex justify-start gap-3 mb-2">
                <TextField
                  label="Buscar"
                  value={searchName}
                  onChange={handleNameChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" onClick={handleSearchClick}>
                        <IconButton>
                          <Search />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  type="date"
                  value={filters.expiryDate}
                  onChange={handleDateChange}
                />
                <TextField
                  select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="expired">Fora da Validade</MenuItem>
                  <MenuItem value="notExpired">Dentro da Validade</MenuItem>
                </TextField>
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
                        <TableCell><Sort onClick={handleSortClick} className="cursor-pointer" />Data de Validade</TableCell>
                        <TableCell>Quantidade {'(em kg)'}</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {foods.map((food) => (
                        <TableRow key={food.id}>
                          <TableCell>{food.name}</TableCell>
                          <TableCell>{food.nutritionalData}</TableCell>
                          <TableCell>{formatDate(food.expiryDate)}</TableCell>
                          <TableCell>{food.quantity}</TableCell>
                          <TableCell>{convertEnumFoodStatus(food.status)}</TableCell>
                          <TableCell>
                            <Button variant="contained" color="primary" onClick={() => handleEdit({...food})}>
                              Alterar
                            </Button>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={() => handleDelete(food.id)}
                              style={{ marginLeft: 8 }}
                            >
                              Excluir
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              ) : (
                <>
                  <div className="flex flex-col text-center gap-2 py-4">
                    <h2 className="text-1xl font-semibold">Nenhum resultado encontrado</h2>
                    <p>Cadastre um novo alimento ou limpe os filtros e tente novamente</p>
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
              handleClose={handleModalClose}
              selectedFood={selectedFood}
              onSave={handleSave} 
            />
          </TableContainer>
        )}
      </div>
    </div>
  );
}
