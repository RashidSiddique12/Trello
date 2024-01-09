import { Card, CardContent, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListNav from "./ListNav";
import axios from "axios";
import ErrorPage from "../handlers/ErrorPage";
import LoadingPage from "../handlers/LoadingPage";
import CreateNewList from "./CreateNewList";
import ListAction from "./ListAction";
import DisplayCard from "./card/DisplayCard";
import { useLocation } from "react-router-dom";

// for now i just put here
const ApiToken =
  "ATTA2e4a2b78cb9848691f329022e06ff42e26efb15646856710f1786d483750eb442629BC3F";
const ApiKey = "146bb53e7b08a007fbb134f5d5487666";

function ListPage() {
  const location = useLocation();
  const { state } = location;
  const boardName = state?.BoardName || "Trello";

  const { id } = useParams();
  const [listData, setListData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  //   console.log(id);
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
        // console.log(res.data);
        setListData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setError(err.message);
      });
  }, []);

  const handleArchive = (listId) => {
    axios({
      method: "PUT",
      url: `https://api.trello.com/1/lists/${listId}/closed?key=${ApiKey}&token=${ApiToken}`,
      data: {
        value: true,
      },
    })
      .then((res) => {
        // console.log(res.data);
        setListData(listData.filter((list) => list.id !== listId));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <ListNav boardName={boardName} />
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
                  <div key={id}>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent className="listCardContent">
                        {" "}
                        <p>{name}</p>
                        <ListAction handleArchive={handleArchive} listId={id} />
                      </CardContent>
                      <DisplayCard listId={id} />
                    </Card>
                  </div>
                ))}
                <div>
                  <CreateNewList
                    listData={listData}
                    setListData={setListData}
                    boardId={id}
                  />
                </div>
              </div>
            </Container>
          )}
        </>
      )}
    </div>
  );
}

export default ListPage;
