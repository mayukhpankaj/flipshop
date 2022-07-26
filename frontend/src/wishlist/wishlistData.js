import React, { useEffect, useState } from "react";
import Wishlist from "./wishlist";
import LoadingSpinner from "../Loader/Loader";
import ErrorModal from "../Modal/ErrorModal";
import { useHttpClient } from "../hooks/http-hook";

const Users = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedItems, setLoadedItems] = useState();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/items/all`
        );
        setLoadedItems(responseData.items);
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
      {!isLoading && loadedItems && <Wishlist items={loadedItems} />}
    </React.Fragment>
  );
};

export default Users;
