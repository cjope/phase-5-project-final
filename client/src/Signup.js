import { Dialog, DialogContent, DialogTitle, Button } from "@material-ui/core";
import React, { useState } from "react";
import SignupForm from "./SignupForm";
import { toast, Flip } from "react-toastify";
import { Form } from "react-bootstrap";

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

  function handleSignUp(e) {
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
    <>
      <Button variant="outlined" style={{backgroundColor:"white"}} onClick={handleClickToOpen}>
        Signup
      </Button>
      <Dialog open={open} onClose={handleToClose} onSubmit={handleSignUp}>
        <DialogTitle>{"Sign Up"}</DialogTitle>
        <DialogContent>
          <Form onSubmit={handleSignUp}>
            <SignupForm
            setUsername={setUsername}
            setEmail={setEmail}
            setPassword={setPassword}
            setPasswordConfirmation={setPasswordConfirmation}
            handleSignUp={handleSignUp}
            handleToClose={handleToClose}
            />
            <Button type="submit" color="primary" autoFocus>
              Submit
            </Button>
            <Button onClick={handleToClose} color="secondary" autoFocus>
              Close
            </Button>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default Signup