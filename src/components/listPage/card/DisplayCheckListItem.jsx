import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteItem from "./DeleteItem";
import AddItem from "./AddItem";
import { DisplayCheckListItemEP, handleCheckBoxEP } from "../../Api";
import { BorderLinearProgress } from "./ProgressLine";

function DisplayCheckListItem({ id, cardId }) {
  const [checkItems, setChekItems] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    DisplayCheckListItemEP(id, setChekItems);
  }, [id]);

  useEffect(() => {
    const checkedNo = checkItems.filter((item) => item.state === "complete");
    setProgress(((checkedNo.length / checkItems.length) * 100).toFixed(2));
  }, [checkItems]);

  const handleCheckBox = (checkItemId, state) => {
    const checkItemstate = state === "complete" ? "incomplete" : "complete";
    handleCheckBoxEP(
      cardId,
      checkItemId,
      checkItems,
      setChekItems,
      checkItemstate
    );
  };

  return (
    <div>
      <div className="progress">
        <p>{progress === "NaN" ? 0 : progress}%</p>
        <BorderLinearProgress
          sx={{ margin: "1rem" }}
          variant="determinate"
          value={progress}
        />
      </div>
      {checkItems.map((item) => (
        <div key={item.id} className="checkListItem">
          <FormGroup sx={{ display: "flex" }}>
            <FormControlLabel
              onClick={() => handleCheckBox(item.id, item.state)}
              control={
                <Checkbox checked={item.state === "complete" ? true : false} />
              }
              label={item.name}
            />
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
