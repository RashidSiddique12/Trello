import { Button, Card, CardContent } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { handleAddItemEP } from "../../Api";
import { useDispatch, useSelector } from "react-redux";
import { createNewCheckListItem, setNewItem,} from "../../../redux/checkListItemSlice";

// eslint-disable-next-line react/prop-types
function AddItem({ checkListId }) {
  // const {newItem} = useSelector(state => state.checkListItem);
  const dispatch = useDispatch();
  const [openInput, setOpenInput] = useState(false);
  const [newItem,setNewItem ] = useState("")

  const handleAddItem = async (e) => {
    e.preventDefault();
    const newItemData = await handleAddItemEP(checkListId, newItem);
    dispatch(createNewCheckListItem({newItemData,checkListId }));
    setNewItem("");
  };

  return openInput ? (
    <Card className="addCard">
      <CardContent>
        <form onSubmit={handleAddItem} className="Cardform">
          <input
            type="text"
            placeholder="Enter the title of a card"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            autoFocus={true}
          />
          <br />
          <br />
          <div className="CardFormBottom">
            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={newItem.trim() !== "" ? false : true}
            >
              Add Item
            </Button>
  
            <CloseIcon onClick={() => setOpenInput(false)} />
          </div>
        </form>
      </CardContent>
    </Card>
  ) : (
    <div>
      <Button variant="contained" onClick={() => setOpenInput(true)}>
        Add Item
      </Button>
    </div>
  );
}

export default AddItem;
