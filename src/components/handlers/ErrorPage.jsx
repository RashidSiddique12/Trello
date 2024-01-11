import { Typography } from "@mui/material";
import ErrorImg from "../../assets/404-error.svg";
function ErrorPage({message="Page not Found"}) {
  return (
    <div className="handler">
      <img src={ErrorImg} alt="Not found Error image" />
      <Typography variant="h5">{message}</Typography>
    </div>
  )
}

export default ErrorPage
