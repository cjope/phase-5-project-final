import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, Menu, TextField, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Login from './Login';
import EditUser from './EditUser';
import Signup from './Signup';
import Logout from './Logout';
import { Link } from '@mui/material';

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

  // Not Used anymore?
  function handleClick(e){
    navigate(e)
    handleMenuClose()
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
       <p style={{textAlign:"center", height:2, marginBottom:20, marginTop:0}}>{user.username}</p>
        <div style={{display:"flex", flexDirection:"row"}}>
          <Link href="/edit-user" underline="none"><Button variant="outlined" sx={{marginInline:1}}>Edit User</Button></Link>
          <Link href="/logout" underline="none"><Button variant="outlined" sx={{marginInline:1}}>Logout</Button></Link>
        </div>
        </>
        :
        <div style={{display:"flex", flexDirection:"row"}}>
         <Link href="/login" underline="none"><Button variant="outlined" sx={{marginInline:1}}>Login</Button></Link>
         <Link href="/signup" underline="none"><Button variant="outlined" sx={{marginInline:1}}>Signup</Button></Link>
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
    <div onClick={handleMenuClose} style={{marginInlineEnd:8}} >
      <div style={{display:"flex", flexDirection:"row"}}>
        <Link href="/julian" underline="none"><Button variant="outlined" sx={{marginInline:1}}>Julian Calc</Button></Link>
        <Link href="/usda" underline="none"><Button variant="outlined" sx={{marginInline:1}}>USDA</Button></Link>
        <Link href="/items" underline="none"><Button variant="outlined" sx={{marginInline:1}}>Items</Button></Link>
        {user?.is_admin === true ? <Link href="/create-item" underline="none"><Button variant="outlined" sx={{marginInline:1}}>Create Item</Button></Link>:<></>}
      </div>
    </div>
  </Menu>
  )

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar>

            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              aria-haspopup="true"
              onClick={e=>handleUserMenuOpen(e)}
            >
              <MenuIcon/>
              <Box sx={{ flexGrow: 1 }}/>
            </IconButton>

            <div style={{width:195}}></div>
            <Box sx={{ flexGrow: 1 }}/>
            <Box sx={{ display: { xs: 'flex', md: 'flex'}}}/>

              <h2>Fresh</h2>

              <IconButton onClick={e=>{navigate("/")}}>
                <img src="orange-timer.png" alt="orange" style={{width:"40px"}}/>
              </IconButton>

              <h2>Extend</h2>
              
              <Box sx={{ flexGrow: 1 }}/>

              <Box sx={{ display: { xs: 'flex', md: 'flex'} }}>
                <TextField id="outlined-search" variant="outlined" label="Search field" type="search" autoSave='false' onChange={handleSearch}/>
                <div>
                  <IconButton title={`Logged in as ${user?.username}`} size="large" edge="end" color="inherit" onClick={e=>handleMenuOpen(e)}>
                    <AccountCircle/>
                  </IconButton>
                </div>
              </Box>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}/>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderUserMenu}
      </Box>
    </div>
  )
}
export default Menubar