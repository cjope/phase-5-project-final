import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import {Button} from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import CreateItem from "./CreateItem";
import EditUser from "./EditUser";
import ItemDetail from "./ItemDetail";
import Items from "./Items";
import JulianCalendar from "./JulianCalendar";
import Login from "./Login";
import Logout from "./Logout";
import MenuBar from "./MenuBar";
import Signup from "./Signup";
import Usda from "./Usda";
import User from "./User";

function App() {
  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState([]);
  const [filteredItems, setFilteredItems] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/me").then((r) => r.json()).then(user => setUser(user));
  },[setUser]);

  function getCategories(){
      fetch("/categories").then((r) => r.json()).then((categories) => setCategories(categories));
  };

  useEffect(()=>{
    getCategories();
  },[setUser]);

  function handleItemNav(item){
    setSelectedItem(item);
    navigate("/item-detail");
    setFilteredItems("");
  };

  function handleUpdateLike(){
    getCategories();
  };

  const listFilteredItem = categories?.map(category=>category.items.filter(item => item.name.toLowerCase().trim().includes(filteredItems.toLowerCase().trim())).map(item => {
    return(
      <div key={item.id} className="i-filter">
        <Button variant="outlined" value={item.name} onClick={(e) => handleItemNav(item)}>
          {item.name}
        </Button>
      </div>
    )
  }));

  return (
    <>
      <ToastContainer/>
      <MenuBar setFilteredItems={setFilteredItems} filteredItems={filteredItems} user={user}/>
      {filteredItems? listFilteredItem:null}
      <Routes>
        <Route path="/" element={<Items setSelectedItem={setSelectedItem} selectedItem={selectedItem} user={user} categories={categories} updateLike={handleUpdateLike}/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login user={user} setUser={setUser} error={error} setError={setError} updateLikes={handleUpdateLike}/>}/>
        <Route path="/edit-user" element={<EditUser user={user} setUser={setUser}/>}/>
        <Route path="/create-item" element={<CreateItem categories={categories}/>}/>
        <Route path="/item-detail" element={<ItemDetail item={selectedItem} user={user}/>}/>
        <Route path="/user" element={<User user={user} />}/>
        <Route path="/logout" element={<Logout setUser={setUser} user={user}/>}/>
        <Route path="/usda" element={<Usda/>}/>
        <Route path="/julian" element={<JulianCalendar/>}/>
      </Routes>
    </>
  )
}

export default App