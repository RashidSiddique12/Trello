import {
  Button,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Popover,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

// for now i just put here
const ApiToken =
  "ATTA2e4a2b78cb9848691f329022e06ff42e26efb15646856710f1786d483750eb442629BC3F";
const ApiKey = "146bb53e7b08a007fbb134f5d5487666";

function ListAction({ handleArchive, listId}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <Button onClick={handleClick}>...</Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div>
          <List className="listAction">
            <div>
              <Typography justifyItems="center">List Actions</Typography>
              <CloseIcon onClick={handleClose} />
            </div>
            <ListItemButton>
              <ListItemText primary="Add Card" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Copy List" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Move List" />
            </ListItemButton>
            <ListItemButton>
              <ListItemText primary="Watch" />
            </ListItemButton>
          </List>
          <Divider />
          <List className="listAction">
            <ListItemButton>
              <ListItemText primary="Move all card in this list" />
            </ListItemButton>
            <ListItemButton onClick={()=>handleArchive(listId)}>
              <ListItemText primary="Archive this list" />
            </ListItemButton>
          </List>
        </div>
      </Popover>
    </div>
  );
}

export default ListAction;
