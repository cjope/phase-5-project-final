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
import MenuBar from "./MenuBar"
import Signup from "./Signup"
import SignupForm from "./SignupForm"
import User from "./User"
import ItemDetail from "./ItemDetail"

function App() {
  const [user, setUser] = useState([])
  const [items, setItems] = useState(null)
  const [error, setError] = useState(null)
  const [selectedItem, setSelectedItem] = useState([])
  const [categories, setCategories] = useState([])

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

  
  useEffect(() => {
    fetch("/categories")
    .then(r => r.json())
    .then(cat => setCategories(cat))
  },[])

  return (
    <>
      <ToastContainer/>
      <MenuBar/>
      <Routes>
        <Route path="/" element={<Home categories={categories} />}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login user={user} setUser={setUser} error={error} setError={setError}/>}/>
        <Route path="/edit-user" element={<EditUser user={user} setUser={setUser}/>}/>
        <Route path="/items" element={<Items items={items} setSelectedItem={setSelectedItem}/>}/>
        <Route path="/create-item" element={<CreateItem categories={categories}/>}/>
        <Route path="/item-detail" element={<ItemDetail item={selectedItem}/>}/>
        <Route path="/user" element={<User user={user} />}/>
        <Route path="/signup-form" element={<SignupForm/>}/>
        <Route path="/logout" element={<Logout setUser={setUser}/>}/>
      </Routes>
    </>
  );
}

export default App