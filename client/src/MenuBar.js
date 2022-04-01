import { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu } from '@mui/material';
import EditUser from './EditUser'

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import Items from './Items';
import { Link, useNavigate } from 'react-router-dom'

function Menubar() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const [menuSelect, setMenuSelect] = useState("")

  function handleProfileMenuOpen(e){
    setAnchorEl(e.currentTarget)
  }

  function handleMenuClose(){
    setAnchorEl(null);
  }

  function handleClick(e){
    navigate(e)
    handleMenuClose()
  }

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu 
      anchorEl={anchorEl} 
      anchorOrigin={{vertical: 'top', horizontal: 'right', }} 
      id={menuId} 
      keepMounted 
      transformOrigin={{ vertical: 'top', horizontal: 'right'}} 
      open={isMenuOpen} 
      onClose={handleMenuClose}
    >
      <MenuItem onClick={e=> handleClick("items")}>Items</MenuItem>
      <MenuItem onClick={e=> handleClick("edit-user")}>Edit User</MenuItem>
      <MenuItem onClick={e=> handleClick("items")}>Items</MenuItem>
      <MenuItem onClick={e=> handleClick("items")}>Items</MenuItem>
    </Menu>
  )

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          {/* Menu Icon */}
          <IconButton
            size="large" 
            edge="start" 
            color="inherit" 
            aria-label="open drawer" 
            sx={{ mr: 2 }}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}></Box>
          <h2>Fresh</h2>
          <IconButton onClick={e=>{navigate("/")}} ><img src="orange-timer.png" alt="orange" style={{width:"40px"}}/></IconButton>
          <h2>Extend</h2>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            
            {/* User Icon */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              color="inherit"
              onClick={handleProfileMenuOpen}

            >
              {/* <EditUser></EditUser> */}
             <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  )
}
export default Menubar