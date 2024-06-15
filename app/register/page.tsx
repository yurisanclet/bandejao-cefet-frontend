'use client'
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import Link from 'next/link';

export default function Register() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailChange = (e: any) => {
      setEmail(e.target.value);
    };

    const handlePasswordChange = (e: any) => {
      setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: any) => {
      setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e: any) => {
      e.preventDefault();
    };
    
    return (
      <main className='w-screen h-screen flex justify-center items-center bg-gradient-to-r'>
        <div className='flex flex-col items-center gap-5 shadow-md bg-white p-8 rounded'>
          <h1 className='font-bold text-3xl text-blue-900' >Bandejao CEFET</h1>
          <h3 className='text-blue-900'>Efetue seu cadastro:</h3>
          <form className='flex flex-col justify-center gap-4 w-72' onSubmit={handleSubmit}>
            <TextField
              label="Nome"
              type="text"
              required
              size='small'
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              size='small'
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
              size='small'
            />
            <TextField
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              size='small'
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