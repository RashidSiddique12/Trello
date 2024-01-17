import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { createBoardEP } from "../Api";
import { useDispatch, useSelector } from "react-redux";
import { createNewBoard } from "../../redux/boardSlice";

function CreateNewBoard() {
  const [open, setOpen] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");
  const dispatch = useDispatch();
  const {boardData} = useSelector(state => state.board)
  console.log("bbb",boardData)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(newBoardName);
    const newData = await createBoardEP(newBoardName);
    dispatch(createNewBoard(newData));

    setNewBoardName("");
    handleClose();
  };
  return (
    <div>
      <Card className="board" id="newBoard" onClick={handleOpen}>
        <CardContent id="createCardContent">
          <Typography variant="subtitle2">Create a new Board+ </Typography>
          <br />
          <Typography variant="caption">
            remaining : {10 - boardData.length}
          </Typography>
        </CardContent>
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h5" gutterBottom>
            Create Board
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              helperText="Please enter your Board name it is Required"
              id="demo-helper-text-misaligned"
              label="Board Title"
              value={newBoardName}
              autoFocus={open}
              onChange={(e) => setNewBoardName(e.target.value)}
            />
            <Button
              // onClick={handleSubmit}
              type="submit"
              sx={{ marginTop: "1rem" }}
              variant="contained"
              disabled={newBoardName.trim() !== "" ? false : true}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}

export default CreateNewBoard;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "white",
  border: "none",
  borderRadius: "25px",
  boxShadow: 24,
  p: 4,
};
