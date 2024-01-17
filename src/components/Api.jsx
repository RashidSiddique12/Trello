import axios from "axios";
const baseUrl = "https://api.trello.com/1";
const apiKey = "146bb53e7b08a007fbb134f5d5487666";
const apiToken =
  "ATTA2e4a2b78cb9848691f329022e06ff42e26efb15646856710f1786d483750eb442629BC3F";

axios.defaults.baseURL = baseUrl;
axios.defaults.params = {
  key: apiKey,
  token: apiToken,
};
export const displayBoardEP = (setIsLoading, setError) => {
  return axios(`/members/me/boards?`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      setIsLoading(false);
      return res.data;
    })
    .catch((err) => {
      setIsLoading(false);
      setError(err.message);
    });
};

export const createBoardEP = (newBoardName) => {
  return axios(`/boards/?name=${newBoardName}`, {
    method: "POST",
  })
    .then((res) => {
      //   console.log(`Response: ${response.status} ${response.statusText}`);
      // console.log(response.data);
      return res.data;
    })
    .catch((err) => {
      alert("Internal Error");
    });
};

export const displayListPageEP = (id, setIsLoading, setError) => {
  return axios(`/boards/${id}/lists?`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      // console.log(res.data);
      setIsLoading(false);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
      setError(err.message);
    });
};

export const handleAddlistEP = (newList, boardId) => {
  return axios(`/lists?name=${newList}&idBoard=${boardId}`, {
    method: "POST",
  })
    .then((res) => {
      console.log("list created");
      return res.data;
    })
    .catch((err) => {
      alert("Internal Error");
    });
};

export const handleArchiveListEP = (listId) => {
  return axios({
    method: "PUT",
    url: `/lists/${listId}/closed?`,
    data: {
      value: true,
    },
  })
    .then((res) => {
      // console.log(res.data);
      return res;
    })
    .catch((err) => {
      console.log(err);
      alert("Internal Error");
    });
};

export const displayCardEP = (listId) => {
  return axios(`/lists/${listId}/cards?`)
    .then((res) => {
      // console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const handleAddCardEP = (listId, newCard) => {
  return axios({
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
      console.log("added successfully");
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      alert("Internal Error");
    });
};

export const handleArchiveCardEP = (cardId) => {
  return axios(`/cards/${cardId}?`, {
    method: "DELETE",
  })
    .then((res) => {
      // console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
      alert("Internal Error");
    });
};

export const fetchCardDeatailsEP = (cardId) => {
  return axios(`/cards/${cardId}/checklists?`, {
    method: "GET",
  })
    .then((res) => {
      console.log("fetch");
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      // alert("Internal Error");
    });
};

export const createCheckListEP = (cardId, newChecklist) => {
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
      console.log("added successfully");
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      alert("Internal Error");
    });
};

export const deleteChecklistEP = (cardId, checkListId) => {
  return axios({
    method: "DELETE",
    url: `/cards/${cardId}/checklists/${checkListId}?`,
  })
    .then((res) => {
      console.log("delete successfully");
      return res;
    })
    .catch((err) => {
      console.log(err);
      alert("Internal Error");
    });
};

export const DisplayCheckListItemEP = (id) => {
  return axios(`/checklists/${id}/checkItems?`, {
    method: "GET",
  })
    .then((res) => {
      // console.log("ddddddasa", res);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const handleAddItemEP = (checkListId, newAddItem) => {
  return axios(`/checklists/${checkListId}/checkItems?name=${newAddItem}`, {
    method: "POST",
  })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      alert("Internal Error");
    });
};

export const DeleteCheckItemEP = (checkListId, checkItemsId) => {
  return axios(`/checklists/${checkListId}/checkItems/${checkItemsId}?`, {
    method: "DELETE",
  })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      alert("Internal Error");
    });
};

export const handleCheckBoxEP = (cardId, checkItemId, checkItemstate) => {
  return axios
    .put(`/cards/${cardId}/checkItem/${checkItemId}?`, {
      state: checkItemstate,
    })
    .then((res) => {
      return res.data;
      // setChekItems(
      //   checkItems.map((checkItem) => {
      //     if (checkItem.id === checkItemId) {
      //       return { ...checkItem, state: checkItemstate };
      //     } else {
      //       return checkItem;
      //     }
      //   })
      // );
    })
    .catch((err) => {
      alert("Internal Error");
    });
};
