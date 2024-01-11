import { Card, CardContent, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListNav from "./ListNav";
import ErrorPage from "../handlers/ErrorPage";
import LoadingPage from "../handlers/LoadingPage";
import CreateNewList from "./CreateNewList";
import ListAction from "./ListAction";
import DisplayCard from "./card/DisplayCard";
import { useLocation } from "react-router-dom";
import { displayListPageEP, handleArchiveListEP } from "../Api";

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
    displayListPageEP(id, setListData, setIsLoading, setError);
  }, []);

  const handleArchive = (listId) => {
    handleArchiveListEP(listId, setListData, listData);
  };

  return (
    <div>
      <ListNav boardName={boardName} />
      {error !== "" ? (
        <ErrorPage message={error} />
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
