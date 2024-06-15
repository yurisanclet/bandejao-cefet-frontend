import { ExpandLess, ExpandMore, Restaurant } from "@mui/icons-material"
import { Avatar, Button, Collapse, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material"
import { blue } from "@mui/material/colors"
import { useState } from "react"

interface MenuItem {
  name: string
  description: string
  type: string
}

interface MenuListProps {
  title: string,
  items: MenuItem[]
}

export function MenuList(props: MenuListProps){
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const {
    title,
    items
   } = props

  const timeoutDrop = {
    enter: 1000,
    exit: 1000,
  }

  return (
    <>
      <div>
        <Button className="text-lg" endIcon={open ? <ExpandLess /> : <ExpandMore />} onClick={handleClick}>
          {title}
        </Button>
        <Collapse in={open} timeout={timeoutDrop} unmountOnExit>
          <List>
            {items.map((item, index) => (
              <ListItem key={index}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: blue[800] }}>
                    <Restaurant />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={item.type}
                  secondary={
                    <Typography
                      component="span"
                      variant="body2"
                      color="#1976d2"
                    >
                      {item.description}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Collapse>
      </div>
    </>
  )
}