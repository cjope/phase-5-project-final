// import { Dialog, DialogContent, DialogTitle, Button } from "@material-ui/core";
import React, { useState } from "react";
import { toast, Flip } from "react-toastify";
import { FormControl, TextField, Dialog, DialogContent, DialogTitle, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Signup({ setUser }) {
  const [email, setEmail] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [passwordConfirmation, setPasswordConfirmation] = useState([])
  const navigate = useNavigate()

  function handleToClose() {
    navigate(-1)
  }

  function handleSignup(e) {
    e.preventDefault()
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
        password_confirmation: passwordConfirmation
      }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
        handleToClose()
      } else {
        toast.error( r.errors, {
          autoClose: 1000,
          hideProgressBar: true,
          transition: Flip,
          position: "top-center"
        })
      }
    })
  }

  return (
    <div className="su1">
      <Dialog open={true} onClose={handleToClose} onSubmit={handleSignup}>
        <DialogTitle>{"Sign Up"}</DialogTitle>
        <DialogContent>
          <Stack>
            <FormControl sx={{m: 2 }}>
              <TextField 
                required
                autoFocus
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
                label= "Email"
                name= "email"
                type="email"
                onChange={e=>setEmail(e.target.value)}
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

            <FormControl sx={{m: 2 }}>
              <TextField 
                required
                variant="outlined"
                label= "Confirm Password"
                name= "password_confirmation"
                type="password"
                onChange={e=>setPasswordConfirmation(e.target.value)}
              />
            </FormControl>
          </Stack>
        </DialogContent>
        
        <div className="su2">
          <Button
            sx={{m:2}}
            variant="contained"
            color="success"
            primary="true"
            onClick={handleSignup}
          >
            OK
          </Button>
          <Button onClick={handleToClose} variant="contained" color="warning"  sx={{m:2}}>
            Close
          </Button>
        </div>
      </Dialog>
    </div>
  )
}
export default Signup