export function formatDateWithWeekDay(date: string){
  const [year, month, day] = date.split('-');
  const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
  return `${dateObj.toLocaleDateString()} - ${dateObj.toLocaleDateString('pt-BR', { weekday: 'long'})}`;
}

export function formatDate(date: string){
  const [year, month, day] = date.split('-');
  const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
  return dateObj.toLocaleDateString();
}