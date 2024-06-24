import React, { useState } from 'react';
import { 
  Paper, 
  Tabs, 
  Tab, 
  Typography, 
  Box,
  Chip
} from '@mui/material';
import { addDays, format } from 'date-fns';
import { formatDateWithWeekDay } from '../utils/date-formatter';
import { IMenu } from '../entity/menu.entity';
interface FutureMenuProps {
  setDateRange: (value: string) => void;
  menus: IMenu[]
}


export default function FutureMenu({menus, setDateRange}: FutureMenuProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: any, newValue: any) => {
    setActiveTab(newValue);
  
    let daysToAdd;
    switch (newValue) {
      case 0:
        daysToAdd = 7;
        break;
      case 1:
        daysToAdd = 15;
        break;
      case 2:
        daysToAdd = 30;
        break;
      default:
        daysToAdd = 0;
    }
  
    const currentDate = new Date();
    const futureDate = addDays(currentDate, daysToAdd);
    const formattedFutureDate = format(futureDate, 'yyyy-MM-dd');
  
    setDateRange(formattedFutureDate);
  };

  return (
    <div>
      <Paper>
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="7 dias"  />
          <Tab label="15 dias" />
          <Tab label="30 dias" />
        </Tabs>
      </Paper>
      {!menus.length ? (
        <>
        </>
      ): (
        <div style={{ maxHeight: '400px', overflow: 'auto' }}>
          { menus.length > 0 ? (
            <>
              {menus?.map((item, index) => (
                <Box key={index} p={2} borderBottom={1}>
                  <Typography variant="h4">{formatDateWithWeekDay(item.date)}</Typography>
                  <Chip label={`Acompanhamento: ${item.accompaniment}`} style={{margin: '5px'}} />
                  <Chip label={`Guarnição: ${item.garnish}`} style={{margin: '5px'}} />
                  <Chip label={`Prato Principal: ${item.mainCourse}`} style={{margin: '5px'}} />
                  <Chip label={`Sobremesa: ${item.dessert}`} style={{margin: '5px'}} />
                </Box>
              ))}
            </>
          ) : (
            <div className='flex justify-center items-center mt-5 text-blue-700'>
              <Typography variant="h6" p={2}>Nenhum cardápio encontrado</Typography>
            </div>
          )}
        </div>
      )}
    </div>
  );
}