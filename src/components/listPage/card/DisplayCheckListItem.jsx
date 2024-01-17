import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteItem from "./DeleteItem";
import AddItem from "./AddItem";
import { DisplayCheckListItemEP, handleCheckBoxEP } from "../../Api";
import { BorderLinearProgress } from "./ProgressLine";
import LoadingElement from "../.././handlers/LoadingElement"
import { useDispatch, useSelector } from "react-redux";
import {
  displayCheckListItem,
  handleCheckBox,
} from "../../../redux/checkListItemSlice";

// eslint-disable-next-line react/prop-types
function DisplayCheckListItem({ checkListId, cardId }) {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { checkListItemData } = useSelector((state) => state.checkListItem);

  // console.log("item", checkListItemData);

  const fetchItemData = async () => {
    try {
      const itemData = await DisplayCheckListItemEP(checkListId);
      dispatch(displayCheckListItem(itemData));
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItemData();
  }, []);

  useEffect(() => {
    const currentChecklistItem = checkListItemData.filter(
      (item) => item.idChecklist === checkListId
    );

    if (currentChecklistItem.length > 0) {
      const checkedNo = currentChecklistItem.filter(
        (item) => item.state === "complete"
      );
      setProgress(
        ((checkedNo.length / currentChecklistItem.length) * 100).toFixed(2)
      );
    } else {
      setProgress(0);
    }
  }, [checkListItemData, checkListId]);

  const handleItemCheckBox = async (checkItemId, state) => {
    const checkItemstate = state === "complete" ? "incomplete" : "complete";
    try {
      const res = await handleCheckBoxEP(cardId, checkItemId, checkItemstate);
      // console.log("checkbox response", res);
      dispatch(handleCheckBox({ id: res.id, state: res.state }));
    } catch (error) {
      alert("SomeThing Went Wrong")
    }
  };

  return (
    <div>
      <div className="progress">
        {loading ? (
          <LoadingElement/>
        ) : (
          <>
            <p>{progress}%</p>
            <BorderLinearProgress
              sx={{ margin: "1rem" }}
              variant="determinate"
              value={progress}
            />
          </>
        )}
      </div>
      {checkListItemData &&
        checkListItemData.map((item) => {
          if (item.idChecklist === checkListId) {
            return (
              <div key={item.id} className="checkListItem">
                <FormGroup sx={{ display: "flex" }}>
                  <FormControlLabel
                    onClick={() => handleItemCheckBox(item.id, item.state)}
                    control={<Checkbox checked={item.state === "complete"} />}
                    label={item.name}
                  />
                </FormGroup>
                <DeleteItem checkItemsId={item.id} checkListId={checkListId} />
              </div>
            );
          }
          return null;
        })}
      <AddItem checkListId={checkListId} />
    </div>
  );
}

export default DisplayCheckListItem;
