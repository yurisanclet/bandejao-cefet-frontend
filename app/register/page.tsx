'use client'
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import { formatCPF } from '../utils/document-formatter';
import { UserService } from '../lib/services/user.service';
import { IUser } from '../entity/user.entity';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';
import logo from '../../public/azul.png';
import { useForm } from 'react-hook-form';
import client from '../lib/axios/client'; 
import { isValidCPF } from '../utils/document-formatter';

interface IFormInput extends IUser {
  confirmPassword: string; 
}

export default function Register() {
    const router = useRouter();
    const userService = new UserService(client);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInput>({
      defaultValues: {
        name: '',
        email: '',
        document: '',
        birthDate: '',
        password: '',
        confirmPassword: '',
      }
    });

    
    const password = watch("password");

    const onSubmit = async (formData: IFormInput) => {
      const { confirmPassword, ...dataToSend } = formData;
      await userService.createUser(dataToSend)
        .then(() => {
          toast.success('Usuário criado com sucesso!');
          setTimeout(() => {
            router.push('/');
          }, 2000); 
        })
        .catch(error => {
          console.log(error);
          toast.error(error || "Erro ao criar usuário.");
        });
    };

    return (
        <main className='w-screen h-screen flex justify-center items-center bg-gradient-to-r'>
            <div className='flex flex-col items-center gap-5 shadow-md bg-white p-8 rounded'>
                <div className='flex flex-col items-center'>
                    <Image src={logo} alt="" height={200} />
                    <h1 className='font-bold text-3xl text-blue-900'>Bandejao CEFET</h1>
                </div>
                <h3 className='text-blue-900'>Efetue seu cadastro:</h3>
                <form className='flex flex-col justify-center gap-4 w-72' onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        label="Nome"
                        {...register("name", { required: true })}
                        error={!!errors.name}
                        helperText={errors.name ? "Nome é obrigatório" : ""}
                        size='small'
                    />
                    <TextField
                        label="Email"
                        {...register("email", { required: true })}
                        error={!!errors.email}
                        helperText={errors.email ? "Email é obrigatório" : ""}
                        size='small'
                    />
                    <TextField
                        label="CPF"
                        {...register("document", { 
                          required: "CPF é obrigatório",
                          validate: value => isValidCPF(value) || "CPF inválido"
                        })}
                        error={!!errors.document}
                        helperText={errors.document?.message}
                        size='small'
                        InputProps={{
                            inputProps: { maxLength: 14 },
                            value: formatCPF(watch("document")),
                        }}
                    />
                    <TextField
                        label="Data de aniversário"
                        {...register("birthDate", { required: true })}
                        error={!!errors.birthDate}
                        helperText={errors.birthDate ? "Data de aniversário é obrigatória" : ""}
                        size='small'
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Senha"
                        {...register("password", { required: true })}
                        error={!!errors.password}
                        helperText={errors.password ? "Senha é obrigatória" : ""}
                        size='small'
                        type="password"
                    />
                    <TextField
                        label="Confirmar senha"
                        {...register("confirmPassword", {
                          validate: value =>
                            value === password || "As senhas não coincidem", // Validando se as senhas coincidem
                        })}
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword ? errors.confirmPassword.message : ""}
                        size='small'
                        type="password"
                    />
                    <Button type="submit" variant="contained" color="primary" className='bg-blue-900'>
                        Register
                    </Button>
                    <div className='text-sm whitespace-nowrap self-center'>
                        <span>Já tem uma conta? <Link className='text-blue-900 hover:text-blue-700' href="/">Faça login aqui</Link></span>
                    </div>
                </form>
            </div>
        </main>
    );
}