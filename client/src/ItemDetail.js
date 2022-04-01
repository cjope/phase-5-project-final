import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Button, FormControl, Paper, TextField } from '@mui/material';
import {    CalendarPicker } from '@mui/lab';
import Stack from '@mui/material/Stack';
import { useState } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles'; 

const pastDate = new Date().getFullYear()-3
const futureDate = new Date().getFullYear()+5
const minDate = new Date(pastDate, 1, 1)
const maxDate = new Date(futureDate, 1, 1)


function ItemDetail({item}) {


    const [date, setDate] = useState(new Date()); 
    const [disabled, setDisabled] = useState(false)

    // const extendedTime = new Date(date?.toDateString())
    // console.log(date.toDateString())

    let newExtDate = new Date()

    // console.log({item})
    
    function dateCalc(){
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    let d = item.extension
    let t = item.ext_type
        if (t === 1){
            day = day + d
        }
        else if (t === 2) {
            day = day + (d * 7)
        }
        else if (t === 3) {
            month = month + d
        } else {
            year = year + d
        }
        newExtDate = new Date(year, month, day).toDateString()
    }
    dateCalc()
    console.log(newExtDate)
  
    return (
    <div style={{textAlign: "center", display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
        <div style={{display:"flex", justifyContent:"space-around", flexDirection:"row", marginTop:"5%", marginRight: 25}} >
        <Stack spacing={6}>
            <Paper elevation={10} sx={{p:2, width:340, paddingBottom:6, paddingTop:6  }} style={{fontSize:25}} >{item.name}</Paper>
            <Paper>
                <Paper elevation={10} sx={{p:2, width:300, m:2}} style={{fontSize:25}}>Item is {item.perishable? "Perishable":"Shelf Stable"}</Paper>    
                <Paper elevation={10} sx={{p:2, width:300, m:2}} style={{fontSize:25}}>Storage Type: {item.storage_type}</Paper>
            </Paper>
            <Paper>
        <h2>Expiration Date</h2>
        <Paper elevation={10} sx={{p:2, width:300, m:2}} style={{fontSize:25}}>{date.toDateString()}</Paper>
        </Paper>
        </Stack>
        </div>

        <div style={{display:"flex", justifyContent:"space-around", flexDirection:"row", marginTop:"5%", marginLeft:20}} >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={6}>
        
            <Grid item xs={12} md={6} backgroundColor={"white"} borderRadius={5}>
                
                <CalendarPicker 
                date={date}
                disabled={disabled}
                minDate={minDate}
                maxDate={maxDate}
                onChange={(newDate) => setDate(newDate)}
                />
                {/* <button onClick={e=>setDisabled(!disabled)}>{disabled?"Enable":"Disable"}</button> */}
            </Grid>

      
        <Paper>
        <h3>Can be Extended {item.timeframe} to:</h3>
        <Paper elevation={10} sx={{p:2, width:300, m:2}} style={{fontSize:25}}>{newExtDate}</Paper>
        </Paper>
        
        </Stack>
        
        
        </LocalizationProvider>
        </div>

   
    </div>
    );
}

export default ItemDetail