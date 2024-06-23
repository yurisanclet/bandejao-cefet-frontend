import { ExpandLess, ExpandMore, Restaurant } from "@mui/icons-material";
import { Avatar, Button, Collapse, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { IMenu } from "../entity/menu.entity";

interface MenuListProps {
  title: string,
  menu: IMenu
}

export function TodayMenu({menu, title}: MenuListProps){
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const timeoutDrop = {
    enter: 1000,
    exit: 1000,
  }

  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <>
      <div>
        <Button className="text-lg" endIcon={open ? <ExpandLess /> : <ExpandMore />} onClick={handleClick}>
          {title}
        </Button>
        {menu ? (
          <>
            <Collapse in={open} timeout={timeoutDrop} unmountOnExit>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: blue[800] }}>
                      <Restaurant />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary='Acompanhamento'
                    secondary={`${menu.accompaniment}`}
                  />
                  <ListItemText
                    primary='Guarnição'
                    secondary={`${menu.garnish}`}
                  />
                  <ListItemText
                    primary='Prato Principal'
                    secondary={`${menu.mainCourse}`}
                  />
                  <ListItemText
                    primary='Sobremesa'
                    secondary={`${menu.dessert}`}
                  />
                </ListItem>
              </List>
            </Collapse>
          </>
        ) : (
          <>
            <Typography variant="h6" className="text-start ml-2 mt-4">Nenhum cardápio encontrado</Typography>
          </>
        )}
      </div>
    </>
  )
}