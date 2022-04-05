import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, MenuItem, Menu, TextField, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Login from './Login';
import EditUser from './EditUser';
import SignupForm from './SignupForm';

function Menubar({setFilteredItems}) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [anchorEl2, setAnchorEl2] = useState(null)

  const isMenuOpen = Boolean(anchorEl);
  const isUserMenuOpen = Boolean(anchorEl2);

  function handleMenuOpen(e){
    setAnchorEl2(e.currentTarget)
  }

  function handleUserMenuOpen(e){
    setAnchorEl(e.currentTarget)
  }

  function handleMenuClose(){
    setAnchorEl(null)
    setAnchorEl2(null)
  }

  function handleClick(e){
    navigate(e)
    handleMenuClose()
  }


  function handleSearch(e){
    setFilteredItems(e.target.value)
  }
  
  const renderUserMenu = (
    <Menu 
      anchorEl={anchorEl2} 
      anchorOrigin={{vertical: 'top', horizontal: 'left' }} 
      keepMounted 
      transformOrigin={{ vertical: 'top', horizontal: 'right'}} 
      open={isUserMenuOpen} 
      onClose={handleMenuClose}
    >
    <div onClick={handleMenuClose} style={{display:"flex", flexDirection:"row-reverse"}}>
      <EditUser/>
      <Login/>
    </div>

    </Menu>
  )

const renderMenu = (
  <Menu 
    anchorEl={anchorEl} 
    anchorOrigin={{vertical: 'top', horizontal: 'right' }} 
    keepMounted 
    transformOrigin={{ vertical: 'top', horizontal: 'left'}} 
    open={isMenuOpen} 
    onClose={handleMenuClose}
  >
    <div style={{display:"flex"}} >
      <Button variant="outlined"  style={{marginInline:5}} onClick={e=> handleClick("/items")}>Items</Button>
      <Button variant="outlined" style={{marginInline:5}} onClick={e=> handleClick("/create-item")}>Create New Item</Button>
    </div>
  </Menu>
)

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <IconButton
            size="large" 
            edge="start"
            color="inherit" 
            sx={{ mr: 2 }}
            aria-haspopup="true"
            onClick={e=>handleUserMenuOpen(e)}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}></Box>
          <h2>Fresh</h2>
          <IconButton onClick={e=>{navigate("/")}} >
            <img src="orange-timer.png" alt="orange" style={{width:"40px"}}/>
          </IconButton>
          <h2>Extend</h2>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'flex', md: 'flex' } }}>

          <div>
            <TextField id="outlined-search" variant="outlined" label="Search field" type="search" onChange={handleSearch} />
          </div>





            
            {/* User Icon */}
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={e=>handleMenuOpen(e)}

            >
             <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderUserMenu}
    </Box>
  )
}
export default Menubar