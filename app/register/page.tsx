'use client'
import { useState } from 'react';
import { Button, TextField } from '@mui/material';
import Link from 'next/link';
import { formatCPF } from '../utils/document-formatter';
import { createUser } from '../lib/actions/user-actions';
import { IUser } from '../inteface';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function Register() {
    const router = useRouter()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [document, setDocument] = useState('') 
    const [birthDate, setBirthDate] = useState('')

    const doPasswordsMatch = () => {
      return password.toString().toLocaleLowerCase().trim() === confirmPassword.toString().toLocaleLowerCase().trim();
    };

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      if (!doPasswordsMatch()) {
        toast.error('Passwords do not match');
        return;
      }
      const user: IUser = {
        email,
        password,
        document,
        name,
        birthDate,
      };
      const response = await createUser(user);
      console.log('res ',response)
      if (response.message.error) {
        toast.error(response.message.error);
        return;
      }
      toast.success('Usuário criado com sucesso!');
      router.push('/');
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              size='small'
            />
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              size='small'
            />
            <TextField
              label="CPF"
              type="text"
              value={formatCPF(document)}
              onChange={(e) => setDocument(e.target.value)}
              inputProps={{ maxLength: 14 }} 
              required
              size='small'
            />
            <TextField
              label="Data de aniversário"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              required
              size='small'
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              size='small'
            />
            <TextField
              label="Confirmar senha"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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