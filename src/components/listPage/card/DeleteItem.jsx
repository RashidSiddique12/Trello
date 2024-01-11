import { Button, Popover } from "@mui/material";
import React from "react";
import { DeleteCheckItemEP } from "../../Api";

function DeleteItem({ checkItemsId, checkListId, checkItems, setChekItems }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const DeleteCheckItem = () => {
    DeleteCheckItemEP(checkListId, checkItemsId, setChekItems, checkItems);
  };
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
        <Button onClick={DeleteCheckItem} color="warning">
          Delete
        </Button>
      </Popover>
    </div>
  );
}

export default DeleteItem;
