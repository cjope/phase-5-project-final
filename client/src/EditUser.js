import React, {useState} from "react"
import { Button, DialogTitle, Dialog, TextField, DialogContent } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Flip, toast } from "react-toastify"

function EditUser({user}){
  const [email, setEmail] = useState(null)
  const [username, setUsername] = useState(null)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(()=>{
    setUsername(user.username)
    setEmail(user.email)
    user?.username ? setOpen(true): setOpen(false)
  },[user])

  const handleToClose = () => {
    navigate("/")
  }

  function handleUpdateUsername(e){
    e.preventDefault()
    fetch("/update-user", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        username,
      }),
    });
    toast.success(`Your username has been updated to ${username}`, {
      autoClose: 1500,
      hideProgressBar: true,
      transition: Flip,
      closeButton:false,
      icon:false,
      position: "top-center"
    })
    setTimeout(handleToClose, 2000)
  }

  function handleUpdateEmail(e){
    e.preventDefault()
    fetch("/update-user", {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });
  }

  return(
    <div className="eu">
      <Dialog open={open} onClose={handleToClose}>
        <DialogTitle>{"Edit User Details"}</DialogTitle>
        <DialogContent>
          <div style={{display:"flex"}} >
            <TextField
              variant="outlined"
              id="username"
              label="Username"
              name='username'
              defaultValue={user.username}
              onChange={e=>setUsername(e.target.value)}
              sx={{m:1}}
            />
            <Button sx={{m:1}} color="primary" variant="outlined" disabled={user?.username === username || username === ""} onClick={handleUpdateUsername}>
              Update
            </Button>
          </div>
          <div style={{display:"flex"}} >
            <TextField 
              variant="outlined"
              id="outline-required"
              label="Email"
              name='email'
              type="email"
              defaultValue={user?.email}
              onChange={e=>setEmail(e.target.value)}
              sx={{m:1}}
            />
            <Button sx={{m:1}} color="primary" variant="outlined" disabled={user?.email === email || email === ""} onClick={handleUpdateEmail}>
              Update
            </Button>
          </div>
        </DialogContent>
        <Button color="warning" variant="outlined" onClick={handleToClose}>
            Close
          </Button>
      </Dialog>
    </div>
  )
}
export default EditUser