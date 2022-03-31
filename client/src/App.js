import React, { useState, useEffect } from "react"
import { Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"
import CreateItem from "./CreateItem"
import EditUser from "./EditUser"
import Home from "./Home"
import Items from "./Items"
import Login from "./Login"
import Logout from "./Logout"
import Menu from "./Menu"
import NavBar from "./NavBar"
import SignUp from "./SignUp"
import SignUpForm from "./SignUpForm"
import User from "./User"



function App() {
  const [user, setUser] = useState(null)
  const [items, setItems] = useState(null)

  useEffect(() => {
    fetch("/me")
    .then(r => r.json())
    .then(user => setUser(user))
  },[])

  useEffect(() => {
    fetch("/items")
    .then(r => r.json())
    .then(items => setItems(items))
  },[])

  return (
    <>
      <ToastContainer/>
      <NavBar user={user} setUser={setUser}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<Login user={user} setUser={setUser}/>}/>
        <Route path="/edit-user" element={<EditUser user={user} setUser={setUser}/>}/>
        <Route path="/items" element={<Items items={items}/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/user" element={<User user={user}/>}/>
        <Route path="/user-form" element={<SignUpForm/>}/>
        <Route path="/logout" element={<Logout setUser={setUser}/>}/>
        <Route path="/create-item" element={<CreateItem/>}/>
      </Routes>
    </>
  );
}

export default App;