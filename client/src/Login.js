import React from "react";
import { Button, DialogTitle, Dialog, DialogContent, FormLabel, DialogActions, TextField } from "@mui/material"

import { Form } from "react-bootstrap";
import { useState } from "react";
import { Flip, toast } from "react-toastify";

function Login({ setUser, setError }) {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClickToOpen = () => {
    setOpen(true);
  };

  const handleToClose = () => {
    setOpen(false);
    setUsername("");
    setPassword("");
  };

  function handleLogin(e) {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
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
    <div>
      <Button variant="outlined" style={{backgroundColor:"white"}} onClick={handleClickToOpen}>Login</Button>
      <Dialog open={open} onClose={handleToClose} onSubmit={handleLogin}>
        <DialogTitle>{"Please Log In"}</DialogTitle>
        <DialogContent>
          <Form>
            <FormLabel>Username</FormLabel>
            <TextField
              required
              variant="outlined"
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            ></TextField>
            <TextField 
              required
              variant="outlined"
              id="password"
              label="Password"
              name='password'
              type="password"
              onChange={e=>setPassword(e.target.value)}
          ></TextField>
        </Form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleToClose} color="primary" autoFocus>Close</Button>
        <Button
          onClick={handleLogin}
          color="primary"
          autoFocus
          primary="true"
        >OK
        </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Login;