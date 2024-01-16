import { Button } from "@mui/material"


// eslint-disable-next-line react/prop-types
function DeleteCheckList({deleteChecklist, id}) {
    // console.log(id, "dddddddddd")
  return (
    <div>
       <Button onClick={()=>deleteChecklist(id)} variant="contained">Delete</Button>
    </div>
  )
}

export default DeleteCheckList
