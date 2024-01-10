import { Button, Popover } from "@mui/material";
import axios from "axios";
import React from "react";

const ApiToken =
  "ATTA2e4a2b78cb9848691f329022e06ff42e26efb15646856710f1786d483750eb442629BC3F";
const ApiKey = "146bb53e7b08a007fbb134f5d5487666";

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
    console.log("delete item");
    axios(
      `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemsId}?key=${ApiKey}&token=${ApiToken}`,
      {
        method: "DELETE",
      }
    )
      .then(() => {
        setChekItems(checkItems.filter((item) => item.id !== checkItemsId));
      })
      .catch((err) => {
        console.log(err);
      });
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
