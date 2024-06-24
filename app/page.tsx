'use client'
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import logo from '../public/azul.png';
import Image from "next/image";
import { UserService } from './lib/services/user.service';
import client from './lib/axios/client';
import { useForm } from 'react-hook-form';
import { IUser } from './entity/user.entity';

export default function Login() {
    const userService = new UserService(client);
    const {handleSubmit, register, formState: { errors }} = useForm<IUser>({
      defaultValues: {
        email: '',
        password: '',
      }
    });

    const router = useRouter();

    const onSubmit = async (formData: IUser) => {
      const { email, password } = formData; // Desestruturação para obter email e senha
      await userService.loginUser(email, password)
        .then((response) => {
          toast.success('Login successful');
          setTimeout(() => {
            localStorage.setItem('token', response.access_token);
            localStorage.setItem('loggedUser', JSON.stringify(response.user));
            localStorage.setItem('role', JSON.stringify(response.role));
            router.push("/home");
          }, 2000); 
        })
        .catch((error) => {
          console.error('Error logging in:', error);
          toast.error('Failed to login');
        });
    };

    return (
      <main className='w-screen h-screen flex justify-center items-center bg-gradient-to-r'>
        <div className='flex flex-col items-center gap-5 shadow-md bg-white p-8 rounded'>
          <div className='flex flex-col items-center'>
            <Image src={logo} alt={""} height={200} color='blue'/>
            <h1 className='font-bold text-3xl text-blue-900' >Bandejao CEFET</h1>
          </div>
          <h3 className='text-blue-900'>Efetue seu login:</h3>
          <form className='flex flex-col justify-center gap-4 w-72' onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Email"
              type="email"
              {...register("email", { required: true })}
              error={!!errors.email}
              helperText={errors.email ? "Email is required" : ""}
              InputLabelProps={
                { shrink: true }
              }
            />
            <TextField
              label="Password"
              type="password"
              {...register("password", { required: true })}
              error={!!errors.password} 
              helperText={errors.password ? "Password is required" : ""}
              InputLabelProps={
                { shrink: true }
              }
            />
            <Link className='text-blue-900 self-end text-xs hover:text-blue-700' href="">
             Esqueceu sua senha?
            </Link>
            <Button type="submit" variant="contained" color="primary" className='bg-blue-900'>
              Login
            </Button>
            <div className='text-sm whitespace-nowrap'>
              <span>Ainda nao tem uma conta? <Link className='text-blue-900 hover:text-blue-700' href="/register">Cadastre-se aqui</Link></span>
            </div>
          </form>
        </div>
      </main>
    );
}