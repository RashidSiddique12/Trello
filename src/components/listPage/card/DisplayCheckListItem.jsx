import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import DeleteItem from "./DeleteItem";
import AddItem from "./AddItem";
import { DisplayCheckListItemEP, handleCheckBoxEP } from "../../Api";
import { BorderLinearProgress } from "./ProgressLine";
import { checkListItemReducer } from "../../reducer/checkListItemReducer";

const intialState = {
  checkItems: [],
  newAddItem: "",
};

// eslint-disable-next-line react/prop-types
function DisplayCheckListItem({ id, cardId }) {
  const [state, dispatch] = useReducer(checkListItemReducer, intialState);
  const { checkItems } = state;
  const [progress, setProgress] = useState(0);

  const fetchData = async () => {
    const itemData = await DisplayCheckListItemEP(id);
    dispatch({
      type: "displayCheckListItem",
      payload: itemData,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const checkedNo = checkItems.filter((item) => item.state === "complete");
    setProgress(((checkedNo.length / checkItems.length) * 100).toFixed(2));
  }, [checkItems]);

  const handleCheckBox = async (checkItemId, state) => {
    const checkItemstate = state === "complete" ? "incomplete" : "complete";
    const itemId = await handleCheckBoxEP(cardId, checkItemId, checkItemstate);
    dispatch({
      type: "handleCheckBox",
      payload: { checkItemId: itemId, checkItemstate: checkItemstate },
    });
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
            dispatch={dispatch}
          />
        </div>
      ))}
      <AddItem checkListId={id} state={state} dispatch={dispatch} />
    </div>
  );
}
export default DisplayCheckListItem;
