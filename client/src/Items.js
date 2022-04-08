import { ListItem, Grid, Stack, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';


function Items({items, setSelectedItem, user}) {
  const navigate = useNavigate()

  function handleViewItem(item){
      setSelectedItem(item)
    navigate("/item-detail")
  }

/*const userItems = items?.filter(item => {
  let used = item.users.some(   ({ id }) => id ===user.id)
  return used
})

const listUserItems = userItems?.map(item => {
  return(
    <div key={item.id} >
      <Grid>
        <Stack spacing={2}>
          <ListItem>
            <Paper 
              elevation={10}
              sx={{p:2, width:300}}
              style={{fontSize:25, cursor: "pointer"}}
              onClick={e=>handleViewItem(item)}
            >{item.name}
            </Paper>
          </ListItem>
        </Stack>
      </Grid>
    </div>
  )})*/

  const listAllItems = items?.map(item => {
    return(
      <div key={item.id}>
        <Grid>
          <Stack spacing={2}>
            <ListItem>
              <Paper 
                elevation={10}
                sx={{p:2, width:300}}
                style={{fontSize:25, cursor: "pointer"}}
                onClick={e=>handleViewItem(item)}
              >{item.name}
              </Paper>
            </ListItem>
          </Stack>
        </Grid>
      </div>
    )
  })

  return (
      <div style={{textAlign: "center", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        {/* User: {listUserItems} */}
        {listAllItems}
    </div>
  )
}
export default Items