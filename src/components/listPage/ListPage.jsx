import {
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListNav from "./ListNav";
import axios from "axios";
import ErrorPage from "../handlers/ErrorPage";
import LoadingPage from "../handlers/LoadingPage";
import AddCardIcon from "@mui/icons-material/AddCard";

// for now i just put here
const ApiToken =
  "ATTA2e4a2b78cb9848691f329022e06ff42e26efb15646856710f1786d483750eb442629BC3F";
const ApiKey = "146bb53e7b08a007fbb134f5d5487666";

function ListPage() {
  const { id } = useParams();
  const [listData, setListData] = useState();
  const [boardName, setBoardName] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  console.log(id);
  useEffect(() => {
    axios(
      `https://api.trello.com/1/boards/${id}/lists?key=${ApiKey}&token=${ApiToken}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((res) => {
        console.log(res.data);
        setListData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError(err.message);
      });

    axios(`https://api.trello.com/1/boards/${id}?key=${ApiKey}&token=${ApiToken}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => setBoardName(res.data.name))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <ListNav boardName={boardName}/>
      {error !== "" ? (
        <ErrorPage />
      ) : (
        <>
          {isLoading ? (
            <LoadingPage />
          ) : (
            <Container maxWidth="2xl" className="listContainer">
              <div className="displayList">
                {listData.map(({ id, name }) => (
                  <Card sx={{ minWidth: 275 }} key={id}>
                    <CardContent className="listCardContent">
                      {" "}
                      <p>{name}</p>
                      <Button>...</Button>
                    </CardContent>
                    <CardActions className="listCardAction">
                      <Button size="small">+ Add Card</Button>
                      <AddCardIcon className="addCardIcon" />
                    </CardActions>
                  </Card>
                ))}
              </div>
            </Container>
          )}
        </>
      )}
    </div>
  );
}

export default ListPage;
