import { Card, CardContent } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import AddCard from "./AddCard";

// for now i just put here
const ApiToken =
  "ATTA2e4a2b78cb9848691f329022e06ff42e26efb15646856710f1786d483750eb442629BC3F";
const ApiKey = "146bb53e7b08a007fbb134f5d5487666";

function DisplayCard({ listId }) {
  const [cards, setCards] = useState();

  useEffect(() => {
    axios(
      `https://api.trello.com/1/lists/${listId}/cards?key=${ApiKey}&token=${ApiToken}`
    )
      .then((res) => {
        setCards(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {cards &&
        cards.map(({ id, name }) => (
          <Card key={id} className="listCards">
         <p>{name}</p>
         <EditIcon fontSize="small" />
          </Card>
        ))}
        <AddCard listId={listId} cards={cards} setCards={setCards} />
    </>
  );
}

export default DisplayCard;
