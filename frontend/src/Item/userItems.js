import React, { useEffect, useState, useContext } from "react";
import RenderItems from "./renderItems";
import { AuthContext } from "../context/auth";
import LoadingSpinner from "../Loader/Loader";
import ErrorModal from "../Modal/ErrorModal";
import Fallback from "../Fallback/fallbackPage";
import { useHttpClient } from "../hooks/http-hook";
import './userItems.css';

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedItems, setLoadedItems] = useState();
  const { userId } = useContext(AuthContext);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/items/items`,
          "POST",
          JSON.stringify({
            creator: userId,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        setLoadedItems(responseData.items);
      } catch (err) {}
    };
    fetchUsers();
  }, [sendRequest]);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && <LoadingSpinner />}
      <div className="header"> <h1>Your Items</h1> </div>
      {!isLoading && loadedItems && loadedItems.length === 0 && <Fallback />}
      {!isLoading && loadedItems && <RenderItems items={loadedItems} show={true} />}
    </React.Fragment>
  );
};

export default Users;
