import { ListItem, Grid, Stack, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
function Items({items, setSelectedItem}) {
  const navigate = useNavigate()
  
  function handleViewItem(item){
      setSelectedItem(item)
    navigate("/item-detail")
  }

  const listItems = items?.map(item=> (
    <div key={item.id} >
      <Grid>
        <Stack spacing={2}>
          <ListItem>
            <Paper 
              elevation={10}
              sx={{p:2, width:300}}
              style={{fontSize:25, cursor: "pointer"}}
              onClick={e=>handleViewItem(item)}>{item.name}
            </Paper>
          </ListItem>
        </Stack>
      </Grid>
    </div>
  ))

  return (
      <div style={{textAlign: "center", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
        {listItems}
    </div>
  );
}
export default Items