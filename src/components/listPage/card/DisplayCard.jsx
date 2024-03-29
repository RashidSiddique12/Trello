import {  Box, Card, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import OpenCard from "./OpenCard";
import {
  displayCardEP,
  fetchCardDeatailsEP,
  handleArchiveCardEP,
} from "../../Api";


// eslint-disable-next-line react/prop-types
function DisplayCard({ listId }) {
  const [cards, setCards] = useState();
  const [openStates, setOpenStates] = useState({});
  const [checkListData, setCheckListData] = useState([]);
  // console.log("cards", cards);

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
    setOpenStates((prevOpenStates) => ({
      ...prevOpenStates,
      [cardId]: false,
    }));
  };

  return (
    <>
      {cards &&
        cards.map(({ id, name}) => (
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
  border: "none",
  bgcolor: "background.paper",
  borderRadius: "25px",
  boxShadow: 24,
  p: 4,
};
