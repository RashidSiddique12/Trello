import {
  Button,
  Card,
  CardActions,
  CardContent,
  Popover,
  Typography,
} from "@mui/material";
import TopicIcon from "@mui/icons-material/Topic";
import CloseIcon from "@mui/icons-material/Close";
import ChecklistIcon from "@mui/icons-material/Checklist";
import { useState } from "react";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DeleteCheckList from "./DeleteCheckList";
import DisplayCheckListItem from "./DisplayCheckListItem";
import { createCheckListEP, deleteChecklistEP } from "../../Api";
import { useDispatch, useSelector } from "react-redux";
import { createNewCheckList, deleteCheckList } from "../../../redux/checkListSlice";

// eslint-disable-next-line react/prop-types
function OpenCard({ cardId, handleClose, CardName }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [newChecklist, setNewCheckList] = useState("");
  const {checkListData}  = useSelector((state) => state.checkList);
  const dispatch = useDispatch();
  // console.log("checklistdata" ,checkListData);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAddChecklist = () => {
    setAnchorEl(null);
  };

  const createCheckList = async (e) => {
    e.preventDefault();
    const newData = await createCheckListEP(cardId, newChecklist);
    // console.log("newData", newData);
    dispatch(createNewCheckList(newData))
    setNewCheckList("");
  };

  const deleteChecklist = async(checkListId) => {
   const res =  await deleteChecklistEP(cardId, checkListId);
   if(res.status === 200){
    dispatch(deleteCheckList(checkListId))
   }
  };
  const open = Boolean(anchorEl);
  const isopen = open ? "simple-popover" : undefined;
  return (
    <div>
      <div className="openCardTitle">
        <Typography variant="h5">
          <TopicIcon sx={{ paddingRight: "1rem" }} />
          {CardName}
        </Typography>
        <CloseIcon onClick={handleClose} />
      </div>
      <div className="openCardBody">
        <div className="left">
          <Typography>CheckList Items</Typography>

          {checkListData &&
            checkListData.map(({ id, name }) => {
              return (
                <Card sx={{ boxShadow: "none" }} key={id}>
                  <div className="checklistHead">
                    <CardActions>
                      <CheckBoxIcon sx={{ marginRight: "0.7rem" }} />
                      {name}
                    </CardActions>
                    <DeleteCheckList
                      deleteChecklist={deleteChecklist}
                      id={id}
                    />
                  </div>
                  <div className="progress"></div>
                  <DisplayCheckListItem id={id} cardId={cardId} />
                </Card>
              );
            })}
        </div>
        <div className="right">
          <Typography gutterBottom>Add to Card</Typography>
          <div>
            <Card
              onClick={handleClick}
              sx={{
                display: "flex",
                backgroundColor: "#137fd8",
                minWidth: "150px",
                color: "white",
                cursor: "pointer",
              }}
            >
              <ChecklistIcon sx={{ padding: "0.5rem 0.5rem 0 1rem" }} />
              <CardActions>
                <Typography>CheckList</Typography>
              </CardActions>
            </Card>
            <Popover
              isopen={isopen}
              open={open}
              anchorEl={anchorEl}
              onClose={handleCloseAddChecklist}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <Card>
                <CardContent>
                  <form className="Cardform" onSubmit={createCheckList}>
                    <input
                      type="text"
                      placeholder="Enter the title of a card"
                      value={newChecklist}
                      onChange={(e) => setNewCheckList(e.target.value)}
                      autoFocus={true}
                    />
                    <br />
                    <br />
                    <div className="CardFormBottom">
                      <Button
                        type="submit"
                        variant="contained"
                        size="small"
                        disabled={newChecklist.trim() !== "" ? false : true}
                      >
                        Add CheckList
                      </Button>
                      <CloseIcon onClick={handleCloseAddChecklist} />
                    </div>
                  </form>
                </CardContent>
              </Card>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OpenCard;
