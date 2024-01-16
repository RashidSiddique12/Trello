import { Button, Popover } from "@mui/material";
import { useState } from "react";
import { DeleteCheckItemEP } from "../../Api";
import { useDispatch } from "react-redux";
import { deleteCheckListItem } from "../../../redux/checkListItemSlice";

// eslint-disable-next-line react/prop-types
function DeleteItem({ checkItemsId, checkListId }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const DeleteCheckItem = async() => {
    const res = await DeleteCheckItemEP(checkListId, checkItemsId);
    if(res.status === 200){
      dispatch(deleteCheckListItem(checkItemsId))
    }
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
