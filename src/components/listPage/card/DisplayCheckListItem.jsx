import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";
import DeleteItem from "./DeleteItem";
import axios from "axios";
import AddItem from "./AddItem";

const ApiToken =
  "ATTA2e4a2b78cb9848691f329022e06ff42e26efb15646856710f1786d483750eb442629BC3F";
const ApiKey = "146bb53e7b08a007fbb134f5d5487666";

function DisplayCheckListItem({ id, cardId, setProgress }) {
  const [checkItems, setChekItems] = useState([]);

  useState(() => {
    console.log("dispaly");
    axios(
      `https://api.trello.com/1/checklists/${id}/checkItems?key=${ApiKey}&token=${ApiToken}`,
      {
        method: "GET",
      }
    )
      .then((res) => {
        // console.log(res.data);
        setChekItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleCheckBox = (checkItemId, state) => {
    const checkItemstate = state === "complete" ? "incomplete" : "complete";
    console.log("checkitem");
    axios(
      `
        https://api.trello.com/1/cards/${cardId}/checkItem/${checkItemId}?key=${ApiKey}&token=${ApiToken}&state=${checkItemstate}`,
      {
        method: "PUT",
      }
    )
      .then((res) => {
        setChekItems(checkItems.map((checkItem)=>{
          if(checkItem.id === checkItemId){
            return {...checkItem, state: checkItemstate}
          }
          else{
            return checkItem;
          }
        }))
        // console.log(res);
      })
      .catch((err) => console.error(err));
  };

  const checkedNo = checkItems.filter((item) => item.state === "complete");
  setProgress((((checkedNo.length / checkItems.length) * 100).toFixed(2)) || 0);

  //   console.log("data", checkItems);
  return (
    <div>
      {checkItems.map((item) => (
        <div key={item.id} className="checkListItem">
          <FormGroup sx={{display:"flex"}}>
            <FormControlLabel onClick={() => handleCheckBox(item.id, item.state)} control={<Checkbox checked={item.state === "complete" ? true : false}/>} label={item.name} />
          </FormGroup>
          <DeleteItem
            checkItemsId={item.id}
            checkListId={id}
            checkItems={checkItems}
            setChekItems={setChekItems}
          />
        </div>
      ))}
      <AddItem
        checkListId={id}
        checkItems={checkItems}
        setChekItems={setChekItems}
      />
    </div>
  );
}
export default DisplayCheckListItem;
