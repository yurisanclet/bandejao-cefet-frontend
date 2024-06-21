"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem('token');

    router.push('/');
  }, []);

  return null;
};

export default Logout;