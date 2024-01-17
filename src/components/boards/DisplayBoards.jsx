import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Container, Grid } from "@mui/material";
import CreateNewBoard from "./CreateNewBoard";
import LoadingPage from "../handlers/LoadingPage";
import ErrorPage from "../handlers/ErrorPage";
import { Link } from "react-router-dom";
import { displayBoardEP } from "../Api";
import { useDispatch, useSelector } from "react-redux";
import { displayBoard } from "../../redux/boardSlice";

function DisplayBoards() {
  // const [data, setData] = useState();
  const dispatch = useDispatch();
  const {boardData} = useSelector(state => state.board)
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchBoard = async()=>{
    const data = await displayBoardEP(setIsLoading, setError);
    dispatch(displayBoard(data))
  }

  useEffect(() => {
    fetchBoard();
  }, []);

  return error !== "" ? (
    <ErrorPage message={error} />
  ) : isLoading ? (
    <LoadingPage />
  ) : (
    <>
      <Container className="boardContainer" maxWidth="lg">
        <Typography variant="h4" className="title" gutterBottom>
          Boards
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <CreateNewBoard/>
          </Grid>
          {boardData &&
            boardData.map(({ id, name, prefs }) => {
              return (
                <Grid item key={id}>
                  <Link
                    to={`/board/${id}`}
                    state={{ BoardName: name }}
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      className="board"
                      sx={{ backgroundColor: prefs["backgroundColor"] }}
                    >
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
}

export default DisplayBoards;
