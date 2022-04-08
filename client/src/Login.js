import React from "react"
import { Button, DialogTitle, Dialog, DialogContent, DialogActions, TextField, FormControl, Stack } from "@mui/material"
import { useState } from "react"
import { Flip, toast } from "react-toastify"

function Login({ setUser, setError }) {
  const [open, setOpen] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleClickToOpen = () => {
    setOpen(true)
  }

  const handleToClose = () => {
    setOpen(false)
    setUsername("")
    setPassword("")
  }

  function handleLogin(e) {
    e.preventDefault()
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
        handleToClose();
      } else {
        return r.json().then((user) =>
          toast.error(user.errors, {
            autoClose: 1000,
            hideProgressBar: true,
            transition: Flip,
            position: "top-center"
          })
        )
      }
    })
  }

  return (
          <div style={{marginInline:5}}>
      <Button title="Login Existing User" variant="outlined" style={{backgroundColor:"white"}} onClick={handleClickToOpen}>Login</Button>
      <Dialog open={open} onClose={handleToClose} onSubmit={handleLogin}>
        <DialogTitle>{"Please Log In"}</DialogTitle>
        <DialogContent>
      <Stack>
        <FormControl sx={{m: 2 }}>
          <TextField 
            required
            variant="outlined"
            label= "Username"
            name= "username"
            onChange={e=>setUsername(e.target.value)}
          />
        </FormControl>

        <FormControl sx={{m: 2 }}>
          <TextField 
            required
            variant="outlined"
            label= "Password"
            name= "password"
            type="password"
            onChange={e=>setPassword(e.target.value)}
          />
        </FormControl>
      </Stack>   
      </DialogContent>
      <DialogActions sx={{display:"flex", justifyContent:"space-around"}}>
        <Button onClick={handleToClose} variant="outlined" color="warning" autoFocus>Close</Button>
        <Button
          onClick={handleLogin}
          variant="outlined"
          color="success"
          autoFocus
          primary="true"
        >OK
        </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
export default Login