import { Button, Card, CardContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { handleAddlistEP } from "../Api";
import { useDispatch, useSelector } from "react-redux";
import { createNewList, setAddList, setNewList } from "../../redux/ListSlice";

// eslint-disable-next-line react/prop-types
function CreateNewList({ boardId }) {

  const dispatch = useDispatch();
  const {newList, addList} = useSelector((state) => state.list);

  const handleAddlist = async(e) => {
    e.preventDefault();
    const newData = await handleAddlistEP(newList, boardId);
    dispatch(createNewList(newData))
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
                onChange={(e) => dispatch(setNewList(e.target.value))}
                autoFocus={true}
              />
              <br />
              <br />
              <div className="CardFormBottom">
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  disabled={newList.trim() !== "" ? false : true}
                >
                  Add list
                </Button>
                <CloseIcon onClick={() => dispatch(setAddList(false))} />
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card onClick={() => dispatch(setAddList(true))}>
          <CardContent sx={{ minWidth: 275 }}>
            <Button size="small">+ Add Another List</Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default CreateNewList;
