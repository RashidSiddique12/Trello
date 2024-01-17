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
import { displayListPageEP} from "../Api";
import { useDispatch, useSelector } from "react-redux";
import {displayList } from "../../redux/ListSlice";

function ListPage() {
  const location = useLocation();
  const { state } = location;
  const boardName = state?.BoardName || "Trello";

  const { id } = useParams();
  // const [listData, setListData] = useState();
  const dispatch = useDispatch();
  const {listData} =  useSelector(state => state.list)
  // console.log("ssf", listData)

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchList = async()=>{
    const listData = await displayListPageEP(id,setIsLoading, setError);
    dispatch(displayList(listData))
  }

  useEffect(() => {
    fetchList()
  }, []);



  return (
    <div>
      <ListNav boardName={boardName} />
      {error !== "" ? (
        <ErrorPage message={error} />
      ) : (
        <>
          {isLoading ? (
            <LoadingPage/>
          ) : (
            <Container maxWidth="2xl" className="listContainer">
              <div className="displayList">
                {listData.map(({ id, name }) => (
                  <div key={id}>
                    <Card sx={{ minWidth: 275 }}>
                      <CardContent className="listCardContent">
                        {" "}
                        <p>{name}</p>
                        <ListAction listId={id} />
                      </CardContent>
                      <DisplayCard listId={id} />
                    </Card>
                  </div>
                ))}
                <div>
                  <CreateNewList
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
