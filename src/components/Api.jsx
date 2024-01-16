import axios from "axios";

const baseUrl = 'https://api.trello.com/1';
const apiKey = '146bb53e7b08a007fbb134f5d5487666';
const apiToken = 'ATTA2e4a2b78cb9848691f329022e06ff42e26efb15646856710f1786d483750eb442629BC3F';

axios.defaults.baseURL = baseUrl;
axios.defaults.params = {
  key: apiKey,
  token: apiToken,
};

export const displayBoardEP = (setData, setIsLoading, setError) => {
  axios(
    `/members/me/boards?`,
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
    `/boards/?name=${newBoardName}`,
    {
      method: "POST",
    }
  )
    .then((response) => {
      //   console.log(`Response: ${response.status} ${response.statusText}`);
      // console.log(response.data);
      setData([...data, response.data]);
      setNewBoardName("");
    })
    .catch((err) => {
      alert("Internal Error");
    });
};

export const displayListPageEP = (id,setListData, setIsLoading,setError)=>{
  axios(
    `/boards/${id}/lists`,
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
    `/lists?name=${newList}&idBoard=${boardId}`,
    {
      method: "POST",
    }
  )
    .then((res) => {
      setListData([...listData, res.data]);
      // setNewList("");
      // console.log("list created");
    })
    .catch((err) => {
      alert("Internal Error");
    });
}


export const handleArchiveListEP = (listId,setListData, listData ) => {
  axios({
    method: "PUT",
    url: `/lists/${listId}/closed?`,
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
      alert("Internal Error");
    });
};

export const displayCardEP = (setCards, listId)=>{
   axios(
      `/lists/${listId}/cards?`
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
    url: `/cards?idList=${listId}`,
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
      // console.log("added successfully");
    })
    .catch((err) => {
      console.log(err);
      alert("Internal Error");
    });
}

export const handleArchiveCardEP = (cardId, setCards, cards)=>{
  axios(
    `/cards/${cardId}?`,
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
      alert("Internal Error");
    });
}

export const fetchCardDeatailsEP =(cardId)=>{
 return axios(
    `/cards/${cardId}/checklists?`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      // console.log(res.data);
      // setCheckListData(res.data);
      console.log("api")
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      // alert("Internal Error");
    });

    
}

export const createCheckListEP = (cardId, newChecklist)=>{
  return axios({
    method: "POST",
    url: `/cards/${cardId}/checklists?`,
    data: {
      name: newChecklist,
    },
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      
      return res.data
    })
    .catch((err) => {
      console.log(err);
      alert("Internal Error");
    });
}

export const deleteChecklistEP = (cardId,checkListId)=>{
  return axios({
    method: "DELETE",
    url: `/cards/${cardId}/checklists/${checkListId}?`,
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      alert("Internal Error");
    });
}

export const DisplayCheckListItemEP=(id)=>{
  return axios(
    `/checklists/${id}/checkItems?`,
    {
      method: "GET",
    }
  )
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
}

export const handleAddItemEP= (checkListId, newAddItem)=>{
 return axios(
    `/checklists/${checkListId}/checkItems?name=${newAddItem}&`,
    {
      method: "POST",
    }
  )
    .then((res) => {
      return res.data;
      
    })
    .catch((err) => {
      console.log(err);
      alert("Internal Error");
    });
}

export const DeleteCheckItemEP = (checkListId, checkItemsId)=>{
 return axios(
      `/checklists/${checkListId}/checkItems/${checkItemsId}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log(err);
        alert("Internal Error");
      });
}

export const handleCheckBoxEP = (cardId, checkItemId, checkItemstate) => {

  return axios.put(`/cards/${cardId}/checkItem/${checkItemId}`, {
    state: checkItemstate,
  })
    .then((res) => {
      return res.data.id;
    })
    .catch((err) => {
      console.error("API Request Error:", err);
      alert("Internal Error");
    });
};