import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteItem from "./DeleteItem";
import AddItem from "./AddItem";
import { DisplayCheckListItemEP, handleCheckBoxEP } from "../../Api";
import { BorderLinearProgress } from "./ProgressLine";
import { useDispatch, useSelector } from "react-redux";
import {
  displayCheckListItem,
  handleCheckBox,
} from "../../../redux/checkListItemSlice";

// eslint-disable-next-line react/prop-types
function DisplayCheckListItem({ id, cardId }) {
  // const [checkItems, setChekItems] = useState([]);
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const { checkListItemData } = useSelector((state) => state.checkListItem);
  // console.log("iiiiiiiiiiii", checkListItemData)

  const fetchItemData = async () => {
    const itemData = await DisplayCheckListItemEP(id);
    dispatch(displayCheckListItem(itemData));
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  useEffect(() => {
    const checkedNo = checkListItemData.filter(
      (item) => item.state === "complete"
    );
    setProgress(
      ((checkedNo.length / checkListItemData.length) * 100).toFixed(2)
    );
  }, [checkListItemData]);

  const handleItemCheckBox = async (checkItemId, state) => {
    const checkItemstate = state === "complete" ? "incomplete" : "complete";
    const res = await handleCheckBoxEP(cardId, checkItemId, checkItemstate);
    console.log("checkbox response", res);
    dispatch(handleCheckBox({ id: res.id, state: res.state }));
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
      {checkListItemData &&
        checkListItemData.map((item) => (
          <div key={item.id} className="checkListItem">
            <FormGroup sx={{ display: "flex" }}>
              <FormControlLabel
                onClick={() => handleItemCheckBox(item.id, item.state)}
                control={
                  <Checkbox
                    checked={item.state === "complete" ? true : false}
                  />
                }
                label={item.name}
              />
            </FormGroup>
            <DeleteItem checkItemsId={item.id} checkListId={id} />
          </div>
        ))}
      <AddItem checkListId={id} />
    </div>
  );
}
export default DisplayCheckListItem;
