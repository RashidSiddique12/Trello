import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Container, Grid } from "@mui/material";
import CreateNewBoard from "./CreateNewBoard";
import axios from "axios";
import LoadingPage from "../handlers/LoadingPage";
import ErrorPage from "../handlers/ErrorPage";
import { Link } from "react-router-dom";
import { displayBoardEP } from "../Api";

// for now i just put here
// const ApiToken =
//   "ATTA2e4a2b78cb9848691f329022e06ff42e26efb15646856710f1786d483750eb442629BC3F";
// const ApiKey = "146bb53e7b08a007fbb134f5d5487666";

function DisplayBoards() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    displayBoardEP(setData, setIsLoading, setError)
    // axios(
    //   `https://api.trello.com/1/members/me/boards?key=${ApiKey}&token=${ApiToken}`,
    //   {
    //     method: "GET",
    //     headers: {
    //       Accept: "application/json",
    //     },
    //   }
    // )
    //   .then((res) => {
    //     // console.log(res.data);
    //     setData(res.data);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     setIsLoading(false);
    //     setError(err.message);
    //   });
  }, []);

  return error !== "" ? (
    <ErrorPage message={error}/>
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
