import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Container, Grid } from "@mui/material";
import CreateNewBoard from "./CreateNewBoard";
import LoadingPage from "../handlers/LoadingPage";
import ErrorPage from "../handlers/ErrorPage";
import { Link } from "react-router-dom";
import { displayBoardEP } from "../Api";

function DisplayBoards() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    displayBoardEP(setData, setIsLoading, setError);
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
            <CreateNewBoard data={data} setData={setData} />
          </Grid>
          {data &&
            data.map(({ id, name, prefs }) => {
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
