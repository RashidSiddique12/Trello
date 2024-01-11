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
            {/* <div>
              <Typography justifyItems="center">List Actions</Typography>
              <CloseIcon onClick={handleClose} />
            </div> */}
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
