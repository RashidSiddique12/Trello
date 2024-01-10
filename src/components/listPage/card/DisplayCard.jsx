import { Backdrop, Box, Card, Fade, Modal, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import OpenCard from "./OpenCard";

// for now i just put here
const ApiToken =
  "ATTA2e4a2b78cb9848691f329022e06ff42e26efb15646856710f1786d483750eb442629BC3F";
const ApiKey = "146bb53e7b08a007fbb134f5d5487666";

function DisplayCard({ listId }) {
  const [cards, setCards] = useState();
  const [open, setOpen] = useState(false);
  const [checkListData, setCheckListData] = useState([]);
 
  useEffect(() => {
    axios(
      `https://api.trello.com/1/lists/${listId}/cards?key=${ApiKey}&token=${ApiToken}`
    )
      .then((res) => {
        setCards(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleArchiveCard = (e, cardId) => {
    axios(
      `https://api.trello.com/1/cards/${cardId}?key=${ApiKey}&token=${ApiToken}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        // console.log(res);
        setCards(cards.filter((card) => card.id !== cardId));
      })
      .catch((err) => {
        // console.log(err);
        alert("Something Went Wrong");
      });
  };

  const handleOpen = (cardId) => {
    axios(
      `https://api.trello.com/1/cards/${cardId}/checklists?key=${ApiKey}&token=${ApiToken}`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        // console.log(res.data);
        setCheckListData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  
    setOpen(true);
  };
  const handleClose = () => setOpen(false);


  return (
    <>
      {cards &&
        cards.map(({ id, name }) => (
          <div key={id}>
            <Card
              key={id}
              onClick={()=>handleOpen(id)}
              className="listCards"
              sx={{
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
              }}
            >
              <p>{name}</p>
              <EditCard handleArchiveCard={() => handleArchiveCard(id)} />
            </Card>
            <Modal open={open} onClose={handleClose}>
              <Box sx={style}>
                <OpenCard handleClose={handleClose} setCheckListData={setCheckListData} checkListData={checkListData} cardId={id} CardName={name} />
              </Box>
            </Modal>
          </div>
        ))}
      <AddCard listId={listId} cards={cards} setCards={setCards} />
    </>
  );
}

export default DisplayCard;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
