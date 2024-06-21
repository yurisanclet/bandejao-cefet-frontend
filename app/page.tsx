'use client'
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { loginUser } from './lib/actions/user-actions';
import logo from '../public/azul.png';
import Image from "next/image";

export default function Login() {

    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e: any) => {
      setEmail(e.target.value);
    };

    const handlePasswordChange = (e: any) => {
      setPassword(e.target.value);
    };

    const handleSubmit = async (e: any) => {
      e.preventDefault();


      const response = await loginUser(email, password);
      if (response.message && response.message.error) {
        toast.error(response.message.error);
      } else {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('loggedUser', JSON.stringify(response.user))
          toast.success('Login successful');
          router.push("/home");
        }
    };

    return (
      <main className='w-screen h-screen flex justify-center items-center bg-gradient-to-r'>
        <div className='flex flex-col items-center gap-5 shadow-md bg-white p-8 rounded'>
          <div className='flex flex-col items-center'>
            <Image src={logo} alt={""} height={200} color='blue'/>
            <h1 className='font-bold text-3xl text-blue-900' >Bandejao CEFET</h1>
          </div>
          <h3 className='text-blue-900'>Efetue seu login:</h3>
          <form className='flex flex-col justify-center gap-4 w-72' onSubmit={handleSubmit}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              // required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              // required
            />
            <Link className='text-blue-900 self-end text-xs hover:text-blue-700' href="">
             Esqueceu sua senha?
            </Link>
            <Button onClick={(e) => handleSubmit(e)} type="submit" variant="contained" color="primary" className='bg-blue-900'>
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