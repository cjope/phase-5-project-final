import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Button, Paper } from '@mui/material';
import {    CalendarPicker } from '@mui/lab';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
// import { createTheme } from '@mui/material';

// const theme = createTheme({
//   typography: {
//   },
// });
 

const pastDate = new Date().getFullYear()-3
const futureDate = new Date().getFullYear()+5
const minDate = new Date(pastDate, 1, 1)
const maxDate = new Date(futureDate, 1, 1)


const Div = styled('div')(({ theme }) => ({
  ...theme.typography.button,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  borderRadius: 10,
  elevation: 10
}));


function Items({items}) {

  const [date, setDate] = useState(new Date());

  // const listItems = items?.map(item=> (
  //     <tr key={item.id} >
  //       <td>{item.name}</td>
  //       {/* <td>{new Date(item.exp_date).toLocaleDateString("en-us", {day: "numeric", month: "numeric", year: "2-digit"})}</td> */}
  //       <td>{item.timeframe}</td>
  //       {/* <td>{new Date(item.extended_date).toLocaleDateString("en-us", {day: "numeric", month: "numeric", year: "2-digit"})}</td> */}
  //       <td>{item.storage_type}</td>
  //     </tr>
  // ))
  
  // const [value, setValue] = useState(new Date());

  const firstItem = items?.filter(item=> item.id === 1 )[0]

  return (
    <div style={{textAlign: "center", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={6}>
          <Div style={{fontSize:50}} >{"Potatoes!"}</Div>
            <Grid item xs={12} md={6} backgroundColor={"white"} borderRadius={5}>
              <CalendarPicker 
                date={date} 
                minDate={minDate}
                maxDate={maxDate}
                onChange={(newDate) => setDate(newDate)}
              />
            </Grid>
        </Stack>
      </LocalizationProvider>
      <br/>
      <Paper elevation={10} sx={{p:2, width:300}} style={{fontSize:25}} >{date.toDateString()}</Paper>
      <br/>
      <Button size='large' variant="outlined" style={{fontSize:25, backgroundColor:"white"}} >{date.toDateString()}</Button>
      <br/>
      <Div style={{fontSize:30}} >{date.toDateString()}</Div>
      <br/>
      <Div style={{fontSize:25}}>{firstItem?.perishable? "Item is Perishable":""}</Div>
      <br/>
      <Div style={{fontSize:20}}>storage type:{firstItem?.storage_type}</Div>
    </div>
  );
}
export default Items;