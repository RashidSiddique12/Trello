import { Box, Card, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import AddCard from "./AddCard";
import EditCard from "./EditCard";
import OpenCard from "./OpenCard";
import {
  displayCardEP,
  fetchCardDeatailsEP,
  handleArchiveCardEP,
} from "../../Api";
import { useDispatch, useSelector } from "react-redux";
import { displayCheckList } from "../../../redux/checkListSlice";
import { deleteCard, displayCards } from "../../../redux/cardSlice";
import LoadingElement from "../../handlers/LoadingElement";

// eslint-disable-next-line react/prop-types
function DisplayCard({ listId }) {
  const [openStates, setOpenStates] = useState({});
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const cards = useSelector((state)=> state.card.cards[listId])

  const fetchCardData = async () => {
    const cardData = await displayCardEP(listId);
    dispatch(displayCards({listId, cardData}));
    setLoading(false);
  };

  useEffect(() => {
    fetchCardData();
  }, []);

  const handleArchiveCard = async (cardId) => {
    const res = await handleArchiveCardEP(cardId);
    if (res.status === 200) {
      dispatch(deleteCard({listId, cardId}));
    }
  };

  const handleOpen = async (cardId) => {
    const data = await fetchCardDeatailsEP(cardId);
    dispatch(displayCheckList(data));

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

  return loading ? (
    <LoadingElement />
  ) : (
    <>
      {cards &&
        cards.map(({ id, name}) => {
            return (
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
                </Card>
                <Modal
                  open={openStates[id] || false}
                  onClose={() => handleClose(id)}
                >
                  <Box sx={style}>
                    <OpenCard
                      handleClose={() => handleClose(id)}
                      cardId={id}
                      CardName={name}
                    />
                  </Box>
                </Modal>
              </div>
            );
        })}
      <AddCard listId={listId} />
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
