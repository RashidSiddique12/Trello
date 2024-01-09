import { Button, Card, CardContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import axios from "axios";
// for now i just put here
const ApiToken =
  "ATTA2e4a2b78cb9848691f329022e06ff42e26efb15646856710f1786d483750eb442629BC3F";
const ApiKey = "146bb53e7b08a007fbb134f5d5487666";

function CreateNewList({ boardId, listData, setListData }) {
  const [addList, setAddList] = useState(false);
  const [newList, setNewList] = useState("");
  const [error, setError] = useState("");

  const handleAddlist = (e) => {
    e.preventDefault();
    if (newList !== "") {
      axios(
        `https://api.trello.com/1/lists?name=${newList}&idBoard=${boardId}&key=${ApiKey}&token=${ApiToken}`,
        {
          method: "POST",
        }
      )
        .then((res) => {
          setListData([...listData, res.data]);
          setNewList("");
          console.log("list created");
        })
        .catch((err) => {
          setError(err.message);
        });
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
              />
              <br />
              <br />
              <div className="CardFormBottom">
                <Button type="submit" variant="contained" size="small">
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
