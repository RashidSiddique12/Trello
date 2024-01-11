import { Button, Card, CardActions, CardContent } from "@mui/material";
import AddCardIcon from "@mui/icons-material/AddCard";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { handleAddCardEP } from "../../Api";

function AddCard({ listId, cards, setCards }) {
  const [openTextField, setOpenTextField] = useState(false);
  const [newCard, setNewCard] = useState();

  const handleAddCard = (e) => {
    e.preventDefault();
    if (newCard !== "") {
      handleAddCardEP(listId, newCard, setCards, cards);
    }
    setOpenTextField(false);
    setNewCard("");
  };

  return !openTextField ? (
    <CardActions className="listCardAction">
      <Button onClick={() => setOpenTextField(true)} size="small">
        + Add Card
      </Button>
      <AddCardIcon className="addCardIcon" />
    </CardActions>
  ) : (
    <Card
      className="addCard"
      sx={{
        boxShadow:
          "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px",
      }}
    >
      <CardContent>
        <form onSubmit={handleAddCard} className="Cardform">
          <input
            type="text"
            placeholder="Enter the title of a card"
            value={newCard}
            onChange={(e) => setNewCard(e.target.value)}
          />
          <br />
          <br />
          <div className="CardFormBottom">
            <Button type="submit" variant="contained" size="small">
              Add Card
            </Button>
            <CloseIcon onClick={() => setOpenTextField(false)} />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default AddCard;
