import React, { useState, useEffect, useContext } from "react";
import search from "../assets/search.png";
import Loader from "../components/loader";
import { axiosHandler, getToken } from "../helper";
import { activeChatUserAction } from "../stateManagement/actions";
import { store } from "../stateManagement/store";
import { PROFILE_URL } from "../urls";
import { UserMain } from "./homeComponents";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [nextPage, setNextPage] = useState(1);

  const { dispatch } = useContext(store);

  useEffect(() => {
    getUserList();
  }, []);

  const getUserList = async () => {
    const _token = await getToken();
    const _users = await axiosHandler({
      method: "get",
      url: PROFILE_URL + `?page=${nextPage}`,
      token: _token,
    }).catch((e) => null);
    if (_users) {
      if (_users.data.next) {
        setNextPage(nextPage + 1);
      }
      setUsers(_users.data.results);
      setFetching(false);
    }
  };

  const setActiveUser = (user_data) => {
    dispatch({ type: activeChatUserAction, payload: user_data });
  };

  return (
    <div>
      <div className="searchCon">
        <img src={search} />
        <input placeholder="Search users" />
      </div>
      <div className="userList">
        {fetching ? (
          <center>
            <Loader />
          </center>
        ) : users.length < 1 ? (
          <div className="noUser">You don't have any user to chat with.</div>
        ) : (
          users.map((item, i) => (
            <UserMain
              key={i}
              name={`${item.first_name || ""} ${item.last_name || ""}`}
              profilePicture={item.profile_picture}
              caption={item.caption}
              count={item.message_count}
              clickable
              onClick={() => setActiveUser(item)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default UsersList;
