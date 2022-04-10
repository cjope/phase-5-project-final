import React from "react"
import { Button, DialogTitle, Dialog, DialogContent, DialogActions, TextField, FormControl, Stack } from "@mui/material"
import { useState } from "react"
import { Flip, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function Login({ setUser, setError }) {
  const [open, setOpen] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleClickToOpen = () => {
    setOpen(true)
  }

  const handleToClose = () => {
    setOpen(false)
    navigate(-1)
    // setUsername("")
    // setPassword("")
    
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
    <>
      <Dialog open={open} onClose={handleToClose} onSubmit={handleLogin}>
        <DialogTitle>{"Please Log In"}</DialogTitle>
          <DialogContent>
            <Stack>

              <FormControl sx={{m: 2 }}>
                <TextField 
                  tabIndex={0}
                  required
                  autoFocus
                  type="text"
                  variant="outlined"
                  label= "Username"
                  name= "username"
                  onChange={e=>setUsername(e.target.value)}
                />
              </FormControl>

              <FormControl sx={{m: 2 }}>
                <TextField 
                  tabIndex={1}
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
          <Button
            onClick={handleLogin}
            variant="outlined"
            color="success"
            primary="true"
            type="submit"
          >
            OK
          </Button>

        <Button onClick={handleToClose} variant="outlined" color="warning">
          Close
        </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default Login