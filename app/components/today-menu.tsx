import { ExpandLess, ExpandMore, Restaurant } from "@mui/icons-material";
import { Avatar, Button, Collapse, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { IMenu } from "../inteface";

interface MenuListProps {
  title: string,
  items: IMenu
}

export function TodayMenu({items, title}: MenuListProps){
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
                secondary={`${items.accompaniment}`}
              />
              <ListItemText
                primary='Guarnição'
                secondary={`${items.garnish}`}
              />
              <ListItemText
                primary='Prato Principal'
                secondary={`${items.mainCourse}`}
              />
              <ListItemText
                primary='Sobremesa'
                secondary={`${items.dessert}`}
              />
            </ListItem>
          </List>
        </Collapse>
      </div>
    </>
  )
}