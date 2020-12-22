import React, { useState, useEffect, useContext } from "react";
import searchImg from "../assets/search.png";
import Loader from "../components/loader";
import { axiosHandler, getToken, LastUserChat } from "../helper";
import {activeChatUserAction, triggerRefreshUserListAction} from "../stateManagement/actions";
import { store } from "../stateManagement/store";
import { PROFILE_URL } from "../urls";
import { UserMain } from "./homeComponents";

let goneNext = false;

function UsersList() {
  const [users, setUsers] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [nextPage, setNextPage] = useState(1);
  const [canGoNext, setCanGoNext] = useState(false);
  const [search, setSearch] = useState("")

  const { state:{triggerRefreshUserList}, dispatch } = useContext(store);

  useEffect(() => {
    getUserList();
  }, [search]);

  useEffect(() => {
    if(triggerRefreshUserList){
      getUserList()
      dispatch({type: triggerRefreshUserListAction, payload: false})
    }

  }, [triggerRefreshUserList])

  const getUserList = async (append=false) => {
    let extra="";
    if(search !== ""){
      extra += `&keyword=${search}`
    }
    setCanGoNext(false);
    const _token = await getToken();
    const _users = await axiosHandler({
      method: "get",
      url: PROFILE_URL + `?page=${nextPage}${extra}`,
      token: _token,
    }).catch((e) => null);
    if (_users) {
      if (_users.data.next) {
        setNextPage(nextPage + 1);
        setCanGoNext(true);
      }
      if(append){
        setUsers([...users, ..._users.data.results]);
        goneNext = false;
      }
      else{
        setUsers(_users.data.results);
      }
      
      setFetching(false);
    }

    checkLastChat(_users.data.results)
  };

  const checkLastChat = (users) => {
    let lastUserChat = localStorage.getItem(LastUserChat)
    if(lastUserChat){
      lastUserChat = JSON.parse(lastUserChat);
      if(users.filter(item => item.id === lastUserChat.id).length){
        setActiveUser(lastUserChat)
      }
    }
  }

  const setActiveUser = (user_data) => {
    localStorage.setItem(LastUserChat, JSON.stringify(user_data))
    dispatch({ type: activeChatUserAction, payload: user_data });
  };

  const handleScroll = (e) => {
    if(e.target.scrollTop >= (e.target.scrollHeight - (e.target.offsetHeight + 200))){
      if(canGoNext && !goneNext){
        getUserList(true)
      }
    }
  }

  return (
    <div>
      <SearchDebouce setSearch={setSearch} />
      <div className="userList" onScroll={handleScroll}>
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
              profilePicture={item.profile_picture ? item.profile_picture.file_upload : ""}
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

let debouceTimeout;

const SearchDebouce = (props) => {
  const [search, setSearch] = useState("")

  useEffect(() => {
    clearTimeout(debouceTimeout);
    debouceTimeout = setTimeout(() => {
      props.setSearch(search)
    }, 1000)
  }, [search])

  return (
    <div className="searchCon">
        <img src={searchImg} />
        <input placeholder="Search users" value={search} onChange={e => setSearch(e.target.value)} />
      </div>
  )
}

export default UsersList;
