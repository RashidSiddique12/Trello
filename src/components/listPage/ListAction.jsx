import {
  Button,
  List,
  ListItemButton,
  ListItemText,
  Popover,
} from "@mui/material";
import { useState } from "react";

function ListAction({ handleArchive, listId }) {
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
            <ListItemButton onClick={() => handleArchive(listId)}>
              <ListItemText primary="Archive this list" />
            </ListItemButton>
          </List>
        </div>
      </Popover>
    </div>
  );
}

export default ListAction;
