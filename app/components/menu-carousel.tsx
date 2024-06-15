import React, { useState } from 'react';
import { 
  Paper, 
  Tabs, 
  Tab, 
  Typography, 
  Box,
  Chip
} from '@mui/material';

const futureMenus = [
  { date: '11/06/2024', menu: ['Arroz', 'Feijão', 'Bife', 'Carré'] },
  { date: '12/06/2024', menu: ['Frango', 'Batata Frita', 'Arroz', 'Feijão'] },
];

const chipColors = ['#a9c860', '#a074ed', '#7588f4', "#dea625"]; // Define your colors here

export default function FutureMenu() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: any, newValue: any) => {
    setActiveTab(newValue);
  };

  const filteredMenus = futureMenus.slice(0, activeTab === 0 ? 7 : activeTab === 1 ? 15 : 30);

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
          <Tab label="7 dias" />
          <Tab label="15 dias" />
          <Tab label="30 dias" />
        </Tabs>
      </Paper>
      {filteredMenus.map((item, index) => (
        <Box key={index} p={2} borderBottom={1}>
          <Typography variant="h4">{item.date}</Typography>
          {item.menu.map((menuItem, i) => (
            <Chip 
              key={i} 
              label={menuItem} 
              style={{margin: '5px', backgroundColor: chipColors[i % chipColors.length]}}
            />
          ))}
        </Box>
      ))}
    </div>
  );
}