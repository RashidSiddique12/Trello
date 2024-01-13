import { Button, Card, CardContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { handleAddlistEP } from "../Api";


// eslint-disable-next-line react/prop-types
function CreateNewList({ boardId, listData, setListData }) {
  const [addList, setAddList] = useState(false);
  const [newList, setNewList] = useState("");

  const handleAddlist = (e) => {
    e.preventDefault();
    if (newList !== "") {
      handleAddlistEP(newList, boardId, listData, setListData);
      setNewList("");
    }
    setAddList(false);
  };
  return (
    <div>
      {addList ? (
        <Card>
          <CardContent sx={{ minWidth: 275 }}>
            <form onSubmit={handleAddlist} className="Cardform">
              <input
                type="text"
                placeholder="Enter the list title"
                value={newList}
                onChange={(e) => setNewList(e.target.value)}
                autoFocus={true}
              />
              <br />
              <br />
              <div className="CardFormBottom">
                <Button type="submit" variant="contained" size="small"
                disabled={newList.trim() !== "" ? false : true}
                >
                  Add list
                </Button>
                <CloseIcon onClick={() => setAddList(false)} />
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card onClick={() => setAddList(true)}>
          <CardContent sx={{ minWidth: 275 }}>
            <Button size="small">+ Add Another List</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default CreateNewList;
