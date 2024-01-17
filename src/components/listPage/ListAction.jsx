import {
  Button,
  List,
  ListItemButton,
  ListItemText,
  Popover,
} from "@mui/material";
import { useState } from "react";
import { handleArchiveListEP } from "../Api";
import { deleteList } from "../../redux/ListSlice";
import { useDispatch } from "react-redux";

// eslint-disable-next-line react/prop-types
function ListAction({listId }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch()
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleArchive = async() => {
    const res = await handleArchiveListEP(listId);
    if(res.status == 200){
      dispatch(deleteList(listId))
    }
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
            <ListItemButton onClick={handleArchive}>
              <ListItemText primary="Archive this list" />
            </ListItemButton>
          </List>
        </div>
      </Popover>
    </div>
  );
}

export default ListAction;
