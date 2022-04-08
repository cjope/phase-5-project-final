// import { Dialog, DialogContent, DialogTitle, Button } from "@material-ui/core";
import React, { useState } from "react";
import { toast, Flip } from "react-toastify";
import { DialogActions, FormControl, TextField, Dialog, DialogContent, DialogTitle, Button, Stack } from "@mui/material";

function Signup({ setUser }) {
  const [email, setEmail] = useState([])
  const [username, setUsername] = useState([])
  const [password, setPassword] = useState([])
  const [passwordConfirmation, setPasswordConfirmation] = useState([])
  const [open, setOpen] = useState(false)

  function handleClickToOpen() {
    setOpen(true)
  }

  function handleToClose() {
    setOpen(false)
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
    <div style={{marginInline:5}}>
    <Button title="Login Existing User" variant="outlined" style={{backgroundColor:"white"}} onClick={handleClickToOpen}>Sign Up</Button>
    <Dialog open={open} onClose={handleToClose} onSubmit={handleSignup}>
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
          autoFocus
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
          autoFocus
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
          autoFocus
          variant="outlined"
          label= "Confirm Password"
          name= "password_confirmation"
          type="password"
          onChange={e=>setPasswordConfirmation(e.target.value)}
        />
      </FormControl>
      </Stack>
    </DialogContent>
    <DialogActions sx={{display:"flex", justifyContent:"space-around"}}>
      <Button onClick={handleToClose} variant="outlined" color="warning" autoFocus>Close</Button>
      <Button
        variant="outlined"
        color="success"
        autoFocus
        primary="true"
        onClick={handleSignup}
      >OK
      </Button>
      </DialogActions>
    </Dialog>
  </div>
   
   
   
   
   
   
   
   
   
   
   
    // <>
    //   <Button variant="outlined" style={{backgroundColor:"white"}} onClick={handleClickToOpen}>
    //     Signup
    //   </Button>
    //   <Dialog open={open} onClose={handleToClose} onSubmit={handleSignup}>
    //     <DialogTitle>{"Sign Up"}</DialogTitle>
    //     <DialogContent>
    //       <Form onSubmit={handleSignup}>
    //         <SignupForm
    //         setUsername={setUsername}
    //         setEmail={setEmail}
    //         setPassword={setPassword}
    //         setPasswordConfirmation={setPasswordConfirmation}
    //         handleSignup={handleSignup}
    //         handleToClose={handleToClose}
    //         />
    //         <Button type="submit" color="primary" autoFocus>
    //           Submit
    //         </Button>
    //         <Button onClick={handleToClose} color="secondary" autoFocus>
    //           Close
    //         </Button>
    //       </Form>
    //     </DialogContent>
    //   </Dialog>
    // </>
  )
}
export default Signup