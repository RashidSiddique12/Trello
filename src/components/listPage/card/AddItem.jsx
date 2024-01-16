import { Button, Card, CardContent } from "@mui/material";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { handleAddItemEP } from "../../Api";
import { useDispatch } from "react-redux";
import { createNewCheckListItem } from "../../../redux/checkListItemSlice";

// eslint-disable-next-line react/prop-types
function AddItem({ checkListId }) {
  const [add, setAdd] = useState(false);
  const [newAddItem, setNewAddItem] = useState("");
  const dispatch = useDispatch();

  const handleAddItem = async (e) => {
    e.preventDefault();
    const newItemData = await handleAddItemEP(checkListId, newAddItem);
    dispatch(createNewCheckListItem(newItemData));

    setNewAddItem("");
  };

  return add ? (
    <Card className="addCard">
      <CardContent>
        <form onSubmit={handleAddItem} className="Cardform">
          <input
            type="text"
            placeholder="Enter the title of a card"
            value={newAddItem}
            onChange={(e) => setNewAddItem(e.target.value)}
            autoFocus={true}
          />
          <br />
          <br />
          <div className="CardFormBottom">
            <Button
              type="submit"
              variant="contained"
              size="small"
              disabled={newAddItem.trim() !== "" ? false : true}
            >
              Add Item
            </Button>
            <CloseIcon onClick={() => setAdd(false)} />
          </div>
        </form>
      </CardContent>
    </Card>
  ) : (
    <div>
      <Button variant="contained" onClick={() => setAdd(true)}>
        Add Item
      </Button>
    </div>
  );
}

export default AddItem;
