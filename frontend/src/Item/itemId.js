import React, { useEffect, useState } from "react";
import Itempage from "./itemPage";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../Loader/Loader";
import ErrorModal from "../Modal/ErrorModal";
import { useHttpClient } from "../hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedItem, setLoadedItem] = useState();
  const uid = useParams().uid;
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/items/item/${uid}`
        );
        setLoadedItem(responseData);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
          <LoadingSpinner />
      )}
      {!isLoading && loadedItem && <Itempage items={loadedItem.item} creator={loadedItem.creatorName} />}
    </React.Fragment>
  );
};

export default Users;
