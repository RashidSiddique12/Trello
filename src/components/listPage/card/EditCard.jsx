import {
  List,
  ListItemButton,
  ListItemText,
  Popover,
} from "@mui/material";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";

function EditCard({handleArchiveCard}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    // event.stopPropagation()
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const isopen = open ? "simple-popover" : undefined;

  return (
    <div onClick={(e)=>e.stopPropagation()}>
      <EditIcon fontSize="small" onClick={handleClick} />
      <Popover
        isopen={isopen}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <List>
          {/* <ListItemButton>
            <ListItemText primary="Open Card" />
          </ListItemButton> */}
          <ListItemButton onClick={handleArchiveCard}>
            <ListItemText primary="Archive" />
          </ListItemButton>
        </List>
      </Popover>
    </div>
  );
}

export default EditCard;
