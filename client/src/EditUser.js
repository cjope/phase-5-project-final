import React, {useState} from "react"
import { Button, DialogTitle, Dialog, TextField, DialogContent } from "@mui/material"
import { Form } from "react-bootstrap"

function EditUser({user}){
  const [email, setEmail] = useState([])
  const [username, setUsername] = useState([])
  const [open, setOpen] = React.useState(false)

  const handleClickToOpen = () => {
    setOpen(true)
  }

  const handleToClose = () => {
    setOpen(false)
  }

  function handleSubmit(e){
    e.preventDefault()
  }

  return(
    <>
      <Button variant="outlined" color="primary" onClick={handleClickToOpen}>Edit User</Button>
      <Dialog open={open} onClose={handleToClose} onSubmit={handleSubmit} >
        <DialogTitle>{"Sign Up"}</DialogTitle>
        <DialogContent>
          <Form>
            <TextField 
              required
              variant="outlined"
              id="outline-required"
              label="UserName"
              name='username'
              defaultValue={user?.username}
              onChange={e=>setUsername(e.target.value)}
            ></TextField>
            <TextField 
              required
              variant="outlined"
              id="outline-required"
              label="Email"
              name='email'
              defaultValue={user?.email}
              onChange={e=>setEmail(e.target.value)}
            ></TextField>
          </Form>
        </DialogContent>
      <Button type="submit" color="primary" autoFocus>Submit</Button>
      <Button onClick={handleToClose} color="secondary" autoFocus>Close</Button>
      </Dialog>
    </>
  )
}
export default EditUser