import axios from "axios";

const ApiToken =
  "ATTA2e4a2b78cb9848691f329022e06ff42e26efb15646856710f1786d483750eb442629BC3F";
const ApiKey = "146bb53e7b08a007fbb134f5d5487666";

export const displayBoardEP = (setData, setIsLoading, setError) => {
  axios(
    `https://api.trello.com/1/members/me/boards?key=${ApiKey}&token=${ApiToken}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then((res) => {
      // console.log(res.data);
      setData(res.data);
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
      setError(err.message);
    });
};

export const createBoardEP = (
  data,
  setData,
  newBoardName,
  setNewBoardName
) => {
  axios(
    `https://api.trello.com/1/boards/?name=${newBoardName}&key=${ApiKey}&token=${ApiToken}`,
    {
      method: "POST",
    }
  )
    .then((response) => {
      //   console.log(`Response: ${response.status} ${response.statusText}`);
      console.log(response.data);
      setData([...data, response.data]);
      setNewBoardName("");
    })
    .catch((err) => {
      alert("Internal Error");
    });
};

export const displayListPageEP = (id,setListData, setIsLoading,setError)=>{
  axios(
    `https://api.trello.com/1/boards/${id}/lists?key=${ApiKey}&token=${ApiToken}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  )
    .then((res) => {
      // console.log(res.data);
      setListData(res.data);
      setIsLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
      setError(err.message);
    });
}

export const handleAddlistEP = (newList,boardId ,listData, setListData)=>{
  axios(
    `https://api.trello.com/1/lists?name=${newList}&idBoard=${boardId}&key=${ApiKey}&token=${ApiToken}`,
    {
      method: "POST",
    }
  )
    .then((res) => {
      setListData([...listData, res.data]);
      // setNewList("");
      console.log("list created");
    })
    .catch((err) => {
      alert("Internal Error");
    });
}


export const handleArchiveListEP = (listId,setListData, listData ) => {
  axios({
    method: "PUT",
    url: `https://api.trello.com/1/lists/${listId}/closed?key=${ApiKey}&token=${ApiToken}`,
    data: {
      value: true,
    },
  })
    .then((res) => {
      // console.log(res.data);
      setListData(listData.filter((list) => list.id !== listId));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const displayCardEP = (setCards, listId)=>{
   axios(
      `https://api.trello.com/1/lists/${listId}/cards?key=${ApiKey}&token=${ApiToken}`
    )
      .then((res) => {
        setCards(res.data);
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
};

export const handleAddCardEP = (listId, newCard, setCards, cards)=>{
  axios({
    method: "POST",
    url: `https://api.trello.com/1/cards?idList=${listId}&key=${ApiKey}&token=${ApiToken}`,
    data: {
      name: newCard,
    },
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      // console.log(res);
      setCards([...cards, res.data]);
      console.log("added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
}

export const handleArchiveCardEP = (cardId, setCards, cards)=>{
  axios(
    `https://api.trello.com/1/cards/${cardId}?key=${ApiKey}&token=${ApiToken}`,
    {
      method: "DELETE",
    }
  )
    .then((res) => {
      // console.log(res);
      setCards(cards.filter((card) => card.id !== cardId));
    })
    .catch((err) => {
      console.log(err);
      alert("Something Went Wrong");
    });
}

export const fetchCardDeatailsEP =(cardId, setCheckListData, setOpenStates)=>{
  axios(
    `https://api.trello.com/1/cards/${cardId}/checklists?key=${ApiKey}&token=${ApiToken}`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      // console.log(res.data);
      setCheckListData(res.data);
    })
    .catch((err) => {
      console.log(err);
    });

    
}

export const createCheckListEP = (cardId, newChecklist, setCheckListData, checkListData)=>{
  axios({
    method: "POST",
    url: `https://api.trello.com/1/cards/${cardId}/checklists?key=${ApiKey}&token=${ApiToken}`,
    data: {
      name: newChecklist,
    },
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      // console.log(res);
      setCheckListData([...checkListData, res.data]);
      console.log("added successfully");
    })
    .catch((err) => {
      console.log(err);
    });
}

export const deleteChecklistEP = (cardId,checkListId, setCheckListData)=>{
  axios({
    method: "DELETE",
    url: `https://api.trello.com/1/cards/${cardId}/checklists/${checkListId}?key=${ApiKey}&token=${ApiToken}`,
  })
    .then((res) => {
      setCheckListData((prevCheckListData) =>
        prevCheckListData.filter((item) => item.id !== checkListId)
      );
      console.log("delete successfully");
    })
    .catch((err) => {
      console.log(err);
    });
}

export const DisplayCheckListItemEP=(id, setChekItems, )=>{
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
}

export const handleAddItemEP= (checkListId, newAddItem,setChekItems, checkItems)=>{
  axios(
    `https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${newAddItem}&key=${ApiKey}&token=${ApiToken}`,
    {
      method: "POST",
    }
  )
    .then((res) => {
      console.log(res.data);
      setChekItems([...checkItems, res.data]);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const DeleteCheckItemEP = (checkListId, checkItemsId, setChekItems, checkItems)=>{
 axios(
      `https://api.trello.com/1/checklists/${checkListId}/checkItems/${checkItemsId}?key=${ApiKey}&token=${ApiToken}`,
      {
        method: "DELETE",
      }
    )
      .then(() => {
        setChekItems(checkItems.filter((item) => item.id !== checkItemsId));
      })
      .catch((err) => {
        console.log(err);
      });
}

export const handleCheckBoxEP = (cardId,checkItemId, checkItems,setChekItems, checkItemstate)=>{
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
    })
    .catch((err) => console.error(err));
}