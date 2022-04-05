import React, {useState} from "react"
import { Button, DialogTitle, Dialog, TextField, DialogContent, FormLabel } from "@mui/material"
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
    <div style={{marginInline:5}}>
      <Button title="Edit User Settings" variant="outlined" style={{backgroundColor:"white"}} onClick={handleClickToOpen}>Edit</Button>
      <Dialog open={open} onClose={handleToClose} onSubmit={handleSubmit}>
        <DialogTitle>{"Edit User Details"}</DialogTitle>
        <DialogContent>
          <Form>
            <FormLabel>Username</FormLabel>
            <TextField
              variant="outlined"
              id="username"
              label="Username"
              name='username'
              autofocus
              defaultValue={user?.username}
              onChange={e=>setUsername(e.target.value)}
            />

            <FormLabel>Email</FormLabel>
            <TextField 
              variant="outlined"
              id="outline-required"
              label="Email"
              name='email'
              defaultValue={user?.email}
              onChange={e=>setEmail(e.target.value)}
            />

            <Button type="submit" color="primary">Submit</Button>
            <Button onClick={handleToClose} color="secondary">Close</Button>

          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default EditUser