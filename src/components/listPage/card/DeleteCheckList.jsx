import { Button } from "@mui/material"


function DeleteCheckList({deleteChecklist, id}) {
    console.log(id, "dddddddddd")
  return (
    <div>
       <Button onClick={()=>deleteChecklist(id)} variant="contained">Delete</Button>
    </div>
  )
}

export default DeleteCheckList
