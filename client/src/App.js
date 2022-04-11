import React, { useState, useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import {Button} from "@mui/material"

import "./App.css"
import CreateItem from "./CreateItem"
import EditUser from "./EditUser"
import Home from "./Home"
import ItemDetail from "./ItemDetail"
import Items from "./Items"
import JulianCalendar from "./JulianCalendar"
import Login from "./Login"
import Logout from "./Logout"
import MenuBar from "./MenuBar"
import Signup from "./Signup"
import SignupForm from "./SignupForm"
import Usda from "./Usda"
import User from "./User"


function App() {
  const [user, setUser] = useState([])
  const [items, setItems] = useState(null)
  const [error, setError] = useState(null)
  const [selectedItem, setSelectedItem] = useState([])
  const [filteredItems, setFilteredItems] = useState("")
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch("/me")
    .then(r => r.json())
    .then(user => setUser(user))
  },[setUser])

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

  function handleItemNav(item){
    setSelectedItem(item)
    navigate("/item-detail")
    setFilteredItems("")
  }

  const listFilteredItem = items?.filter(item => item.name.toLowerCase().trim().includes(filteredItems.toLowerCase().trim())).map(item=> {
    return(
      <div key={item.id} className="f-list">
        <Button variant="outlined" value={item.name} onClick={e=>handleItemNav(item)}>
          {item.name}
        </Button>
      </div>
    )
  })

  return (
    <>
      <ToastContainer/>
      <MenuBar setFilteredItems={setFilteredItems} filteredItems={filteredItems} user={user}/>
      {filteredItems? listFilteredItem:null}
      <Routes>
        <Route path="/" element={<Home categories={categories} />}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login user={user} setUser={setUser} error={error} setError={setError}/>}/>
        <Route path="/edit-user" element={<EditUser user={user} setUser={setUser}/>}/>
        <Route path="/items" element={<Items items={items} setSelectedItem={setSelectedItem} selectedItem={selectedItem} user={user}/>}/>
        <Route path="/create-item" element={<CreateItem categories={categories}/>}/>
        <Route path="/item-detail" element={<ItemDetail item={selectedItem} user={user}/>}/>
        <Route path="/user" element={<User user={user} />}/>
        <Route path="/signup-form" element={<SignupForm/>}/>
        <Route path="/logout" element={<Logout setUser={setUser} user={user}/>}/>
        <Route path="/usda" element={<Usda/>}/>
        <Route path="/julian" element={<JulianCalendar/>}/>
      </Routes>
    </>
  )
}

export default App