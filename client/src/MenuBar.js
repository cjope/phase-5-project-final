import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, IconButton, MenuItem, Menu } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

function Menubar() {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const isMenuOpen = Boolean(anchorEl);
  const [menuSelect, setMenuSelect] = useState()

  function handleProfileMenuOpen(e){
    e.pageX < 100 ? setMenuSelect(0):setMenuSelect(1)
    setAnchorEl(e.currentTarget)
  }

  function handleMenuClose(){
    setAnchorEl(null)
  }

  function handleClick(e){
    navigate(e)
    handleMenuClose()
  }
  
  const renderMenu = (
    <Menu 
      anchorEl={anchorEl} 
      anchorOrigin={{vertical: 'top', horizontal: 'right', }} 
      keepMounted 
      transformOrigin={{ vertical: 'top', horizontal: 'right'}} 
      open={isMenuOpen} 
      onClose={handleMenuClose}
    >
      {menuSelect === 0 ?
        (
          <div>
            <MenuItem onClick={e=> handleClick("items")}>Items</MenuItem>
            <MenuItem onClick={e=> handleClick("create-item")}>Create New Item</MenuItem>
          </div>
        ):
        (
          <div>
            <MenuItem onClick={e=> handleClick("edit-user")}>Edit User</MenuItem>
          </div>
        )
      }
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
            onClick={e=>handleProfileMenuOpen(e)}
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
            
            {/* User Icon */}
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              onClick={e=>handleProfileMenuOpen(e)}

            >
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