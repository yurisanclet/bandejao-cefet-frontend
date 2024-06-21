import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export function formatDateWithWeekDay(date: string){
  const formattedDate = parseISO(date);
  return `${format(formattedDate, 'dd/MM/yyyy')} - ${format(formattedDate, 'EEEE', { locale: ptBR })}`;
}

export function formatDate(date: string){
  const formattedDate = parseISO(date);
  return format(formattedDate, 'dd/MM/yyyy');
}
