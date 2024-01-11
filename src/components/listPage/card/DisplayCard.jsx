import { Backdrop, Box, Card, Fade, Modal, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import OpenCard from "./OpenCard";
import {
  displayCardEP,
  fetchCardDeatailsEP,
  handleArchiveCardEP,
} from "../../Api";

// for now i just put here
const ApiToken =
  "ATTA2e4a2b78cb9848691f329022e06ff42e26efb15646856710f1786d483750eb442629BC3F";
const ApiKey = "146bb53e7b08a007fbb134f5d5487666";

function DisplayCard({ listId }) {
  const [cards, setCards] = useState();
  const [openStates, setOpenStates] = useState({});
  const [checkListData, setCheckListData] = useState([]);
  console.log("cards", cards);

  useEffect(() => {
    displayCardEP(setCards, listId);
  }, []);

  const handleArchiveCard = (cardId) => {
    handleArchiveCardEP(cardId, setCards, cards);
  };

  const handleOpen = (cardId) => {
    fetchCardDeatailsEP(cardId, setCheckListData, setOpenStates);

    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [cardId]: true,
    }));
  };
  const handleClose = (cardId) => {
    // Update the specific card's open state
    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [cardId]: false,
    }));
  };

  return (
    <>
      {cards &&
        cards.map(({ id, name, badges, checkItemStates }) => (
          <div key={id}>
            <Card
              className="listCards"
              key={id}
              onClick={() => handleOpen(id)}
              sx={{
                boxShadow:
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
              }}
            >
              <div>
                <p>{name}</p>
                <EditCard handleArchiveCard={() => handleArchiveCard(id)} />
              </div>
              {/* <p>{checkItemStates.length}/{badges.checkItems}</p> */}
            </Card>
            <Modal
              open={openStates[id] || false}
              onClose={() => handleClose(id)}
            >
              <Box sx={style}>
                <OpenCard
                  handleClose={() => handleClose(id)}
                  setCheckListData={setCheckListData}
                  checkListData={checkListData}
                  cardId={id}
                  CardName={name}
                />
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
  borderRadius: "25px",
  boxShadow: 24,
  p: 4,
};
