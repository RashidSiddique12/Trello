import {
  Box,
  Button,
  Card,
  CardContent,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const ApiToken =
  "ATTA2e4a2b78cb9848691f329022e06ff42e26efb15646856710f1786d483750eb442629BC3F";
const ApiKey = "146bb53e7b08a007fbb134f5d5487666";

function CreateNewBoard() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newBoardName, setNewBoardName] = useState("");

  const handleSubmit = () => {
    console.log(newBoardName);
    if (newBoardName !== "") {
      fetch(
        `https://api.trello.com/1/boards/?name=${newBoardName}&key=${ApiKey}&token=${ApiToken}`,
        {
          method: "POST",
        }
      )
        .then((response) => {
          console.log(`Response: ${response.status} ${response.statusText}`);
          return response.text();
        })
        .then((text) => console.log(text))
        .catch((err) => console.error(err));
    }
    handleClose();
    setNewBoardName("");
  };
  return (
    <div>
      <Card className="board" sx={{}}>
        <CardContent >
          <div>
            <Button onClick={handleOpen} sx={{}}>Create a new Board</Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography variant="h6" gutterBottom>Create Board</Typography>
                <TextField
                  helperText="Please enter your Board name it is Required"
                  id="demo-helper-text-misaligned"
                  label="Board Title"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                />
                <Button
                  onClick={handleSubmit}
                  sx={{ marginTop: "1rem" }}
                  variant="contained"
                  disabled={newBoardName !== "" ? false: true}
                >
                  Submit
                </Button>
              </Box>
            </Modal>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateNewBoard;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
