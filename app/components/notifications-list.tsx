import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function NotificationList(){
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Notificações Importantes
        </Typography>
        <ul className="list-disc pl-4">
          <li>Recesso de fim de ano: não haverá aula nos dias 24/12 e 25/12</li>
          <li>Recesso de fim de ano: não haverá aula nos dias 31/12 e 01/01</li>
          <li>Prova de recuperação de matemática será realizada no dia 10/01</li>
        </ul>
      </CardContent>
    </Card>
  );
}