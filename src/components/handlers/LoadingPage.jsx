import { Container, Grid } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,13, 14, 15];

function LoadingPage() {
  
  return (
    <>
      <Container className="boardContainer" maxWidth="md"  ></Container>
      <Grid container spacing={2}  sx={{marginLeft:"5rem"}}>
      {arr.map((no) => (
        <Grid item
          key={no}
          sx={{
            p: 4,
            
          }}
        >
          <Skeleton
            sx={{ bgcolor: "grey.900" }}
            variant="rectangular"
            width={210}
            height={108}
          />
        </Grid>
      ))}
      </Grid>
    </>
  );
}

export default LoadingPage;
