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
import axios from "axios";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import { BorderLinearProgress } from "./ProgressLine";
import DeleteCheckList from "./DeleteCheckList";
import DisplayCheckListItem from "./DisplayCheckListItem";

const ApiToken =
  "ATTA2e4a2b78cb9848691f329022e06ff42e26efb15646856710f1786d483750eb442629BC3F";
const ApiKey = "146bb53e7b08a007fbb134f5d5487666";

function OpenCard({
  cardId,
  handleClose,
  setCheckListData,
  checkListData,
  CardName,
}) {
  const [progress, setProgress] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [newChecklist, setNewCheckList] = useState("");
  console.log(checkListData);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAddChecklist = () => {
    setAnchorEl(null);
  };

  const createCheckList = (e) => {
    e.preventDefault();
    if (newChecklist !== "") {
      axios({
        method: "POST",
        url: `https://api.trello.com/1/cards/${cardId}/checklists?key=${ApiKey}&token=${ApiToken}`,
        data: {
          name: newChecklist,
        },
        headers: {
          Accept: "application/json",
        },
      })
        .then((res) => {
          // console.log(res);
          setCheckListData([...checkListData, res.data]);
          console.log("added successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setNewCheckList("");
  };
  const deleteChecklist = (checkListId) => {
    axios({
      method: "DELETE",
      url: `https://api.trello.com/1/cards/${cardId}/checklists/${checkListId}?key=${ApiKey}&token=${ApiToken}`,
    })
      .then((res) => {
        setCheckListData((prevCheckListData) =>
          prevCheckListData.filter((item) => item.id !== checkListId)
        );
        console.log("delete successfully");
      })
      .catch((err) => {
        console.log(err);
      });
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
          <Typography>
            {/* <ChecklistIcon sx={{ paddingRight: "1rem" }} /> */}
            CheckList Items
          </Typography>

          {checkListData &&
            checkListData.map(({ id, name, checkItems }) => {
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
                  <div className="progress">
                    <p>{progress}%</p>
                    <BorderLinearProgress
                      sx={{ margin: "1rem" }}
                      variant="determinate"
                      value={progress}
                    />
                  </div>
                  <DisplayCheckListItem id={id} />
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
              <ChecklistIcon
                sx={{ paddingRight: "0.5rem", paddingTop: "0.4rem" }}
              />
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
                    />
                    <br />
                    <br />
                    <div className="CardFormBottom">
                      <Button type="submit" variant="contained" size="small">
                        Add Card
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
