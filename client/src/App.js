import React, { useState, useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router-dom"
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
import Usda from "./Usda"
import {Button} from "@mui/material"


function App() {
  const [user, setUser] = useState([])
  const [items, setItems] = useState(null)
  const [error, setError] = useState(null)
  const [selectedItem, setSelectedItem] = useState([])
  const [filteredItems, setFilteredItems] = useState("")
  const navigate = useNavigate()
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

  function handleItemNav(item){
    setSelectedItem(item)
    navigate("/item-detail")
    setFilteredItems("")
  }

  const listFilteredItem = items?.filter(item => item.name.toLowerCase().trim().includes(filteredItems.toLowerCase().trim())).map(item=> {
    return(
    <div key={item.id} style={{maxWidth:200, marginRight:100, marginLeft:"auto", textAlign:"right"}}>
      <Button variant="outlined" sx={{marginRight:2, marginTop:5}} value={item.name} onClick={e=>handleItemNav(item)} >{item.name}</Button>
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
        <Route path="/item-detail" element={<ItemDetail item={selectedItem}/>}/>
        <Route path="/user" element={<User user={user} />}/>
        <Route path="/signup-form" element={<SignupForm/>}/>
        <Route path="/logout" element={<Logout setUser={setUser}/>}/>
        <Route path="/usda" element={<Usda/>}/>
      </Routes>
    </>
  )
}

export default App