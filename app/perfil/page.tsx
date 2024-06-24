'use client'
import React, { useState, useEffect } from "react";
import { Card, CardContent, TextField, Button, Avatar, IconButton, InputAdornment, CircularProgress } from "@mui/material";
import Header from "../components/header";
import { formatCPF, isValidCPF } from "../utils/document-formatter";
import {IUser} from "../entity/user.entity";
import { toast } from "react-toastify";
import { UserService } from "../lib/services/user.service";
import client from "../lib/axios/client";
import { Controller, useForm } from "react-hook-form";

export default function Perfil() {
  const userService = new UserService(client);
  const { control, handleSubmit, setValue } = useForm<IUser>();
  const [isLoading, setIsLoading] = useState(false)

  const getUser = async () => {
    setIsLoading(true)
    const storedUser = localStorage.getItem('loggedUser') || '{}';
    const userEmail = JSON.parse(storedUser);
    await userService.getLoggedUser(userEmail)
      .then((data) => {
        setValue('id', data.id)
        setValue('name', data.name);
        setValue('document', data.document);
        setValue('email', data.email);
        setValue('birthDate', data.birthDate);
        setValue('role', data.role);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
        toast.error('Erro ao buscar o usuário!');
      })
      .finally(() => {
        setIsLoading(false)
      });
  }

  const handleProfileUpdate = async (formData: IUser) => {
  
      setIsLoading(true);
      await userService.updateUser(formData.id, formData)
        .then(() => {
          toast.success('Perfil atualizado com sucesso!');
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
          toast.error('Erro ao atualizar o perfil!');
        })
        .finally(() => {
          setIsLoading(false);
        });
  };
  useEffect(() => {
    getUser()
  }, [])

  return (
    <>
      <Header title="Perfil" />
      <div className="container mx-auto max-w-md">
        {isLoading ? (
          <>
            <div className="flex justify-center items-center min-h-screen">
              <CircularProgress />
            </div>
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit(handleProfileUpdate)} className="flex flex-col gap-3">
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField {...field} label="Nome" />}
              />
            <Controller
              name="document"
              control={control}
              defaultValue=""
              rules={{
                validate: {
                  cpfValid: value => isValidCPF(value) || 'CPF inválido'
                }
              }}
              render={({ field, fieldState }) => (
                <TextField 
                  {...field} 
                  label="CPF" 
                  error={!!fieldState.error}
                  helperText={fieldState.error ? fieldState.error.message : null}
                  value={formatCPF(field.value)} 
                  inputProps={{ maxLength: 14 }}
                />
              )}
            />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => <TextField {...field} label="Email" disabled />}
              />
              <Controller
                name="birthDate"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField {...field} label="Data de Nascimento" type="date" InputLabelProps={{ shrink: true }} />
                )}
              />
              <Button type="submit" variant="contained" color="primary">Alterar Perfil</Button>
            </form>
          </>
        )}
      </div>
    </>
  );
}