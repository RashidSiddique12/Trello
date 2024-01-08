import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Container, Grid } from "@mui/material";
import CreateNewBoard from "./CreateNewBoard";

const ApiToken =
  "ATTA2e4a2b78cb9848691f329022e06ff42e26efb15646856710f1786d483750eb442629BC3F";
const ApiKey = "146bb53e7b08a007fbb134f5d5487666";


function DisplayBoards() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.trello.com/1/members/me/boards?fields=name,url,prefs&key=${ApiKey}&token=${ApiToken}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((res) => {
        // console.log(res);
        setData(res);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <Container className="boardContainer" maxWidth="lg" >
      <Typography variant="h4" className="title" gutterBottom>Your Works Space</Typography>
        <Grid container spacing={2}>
          <Grid item>
            <CreateNewBoard />
          </Grid>
          {data &&
            data.map(({ id, name, prefs }) => {
              return (
                <Grid item key={id}>
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
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
}

export default DisplayBoards;
