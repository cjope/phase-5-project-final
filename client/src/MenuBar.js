import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Menu, TextField, Button, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

function Menubar({setFilteredItems, user}) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorEl2, setAnchorEl2] = useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const isUserMenuOpen = Boolean(anchorEl2)

  function handleSearch(e){
    setFilteredItems(e.target.value)
  }

  // Right Menu
  function handleMenuOpen(e){
    setAnchorEl2(e.currentTarget)
  }

  // Left Menu
  function handleUserMenuOpen(e){
    setAnchorEl(e.currentTarget)
  }

  // Both Menus
  function handleMenuClose(){
    setAnchorEl(null)
    setAnchorEl2(null)
  }

  // Right Menu
  const renderUserMenu = (
    <Menu
      anchorEl={anchorEl2}
      keepMounted
      open={isUserMenuOpen}
      onClose={handleMenuClose}
    >
    <div onClick={handleMenuClose} >
       {user ?
       <>
       <p className='mb1'>{user.username}</p>
        <div className='mb2'>
          <Link href="/edit-user" underline="none"><Button variant="outlined">Edit User</Button></Link>
          <Link href="/logout" underline="none"><Button variant="outlined">Logout</Button></Link>
        </div>
        </>
        :
        <div className='mb2'>
         <Link href="/login" underline="none"><Button variant="outlined">Login</Button></Link>
         <Link href="/signup" underline="none"><Button variant="outlined">Signup</Button></Link>
        </div>
        }
    </div>
    </Menu>
  )

//Left Menu 
const renderMenu = (
  <Menu
    anchorEl={anchorEl}
    keepMounted
    open={isMenuOpen}
    onClose={handleMenuClose}
  >
    <div onClick={handleMenuClose} className="mb3">
      <div className='mb2'>
        <Link href="/julian" underline="none"><Button variant="outlined">Julian Calc</Button></Link>
        <Link href="/usda" underline="none"><Button variant="outlined">USDA</Button></Link>
        <Link href="/items" underline="none"><Button variant="outlined">Items</Button></Link>
        {user?.is_admin === true ? <Link href="/create-item" underline="none"><Button variant="outlined">Create Item</Button></Link>:<></>}
      </div>
    </div>
  </Menu>
  )

  return (
    <div className='mb'>
      <Box id="b1">
        <AppBar position="fixed">
          <Toolbar>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-haspopup="true"
              onClick={e=>handleUserMenuOpen(e)}
            >
              <MenuIcon/>
              <Box id="b1"/>
            </IconButton>

            <div className='mb4'></div>

              <Box id="b1"/>

              <h2>Fresh</h2>

              <IconButton onClick={e=>{navigate("/")}}>
                <img src="orange-timer.png" alt="orange" className='mb5'/>
              </IconButton>

              <h2>Extend</h2>
              
              <Box id="b1"/>

              <Box id="b2">
                <TextField id="outlined-search" variant="outlined" label="Search field" type="search" autoSave='false' onChange={handleSearch}/>
                <div>
                  <IconButton title={`Logged in as ${user?.username}`} size="large" edge="end" color={user.is_admin? "warning":"inherit"} onClick={e=>handleMenuOpen(e)}>
                    <AccountCircle/>
                  </IconButton>
                </div>
              </Box>

            <Box id="b2"/>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderUserMenu}
      </Box>
    </div>
  )
}
export default Menubar