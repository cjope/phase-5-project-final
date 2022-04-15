import { FormControl, TextField, Button, Tooltip } from "@mui/material"
import { useState } from "react"

function JulianCalendar(){
    const [julianDate, setJulianDate] = useState()
    const [julianDay, setJulianDay] =useState(1)

    function handleJulianDate(e){
      const day = julianDay.slice(2,6)
      const year = new Date(20+julianDay.slice(0,2),0)
      setJulianDate(new Date(year.setDate(day)).toLocaleDateString())
    }

    return(
        <div style={{display:"flex", flexDirection:"column"}}>
            <FormControl>
                <TextField 
                    required
                    autoFocus
                    variant="outlined"
                    label= "Julian Date"
                    type="text"
                    onChange={e=>setJulianDay(e.target.value)}
                    >
                </TextField>
                <Tooltip title={julianDay.length === 5 ? "" : "Date needs to be 5 digits"}>
                <span style={{width:"100%"}}>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleJulianDate}
                    disabled={julianDay.length !== 5}
                    sx={{width:"100%"}}
                    
                >
                    Submit
                </Button>
                </span>
                </Tooltip>
            </FormControl>
            <div style={{textAlign:"center"}}>
                {julianDate?<h1>Calendar Date is: {julianDate}</h1>:<></>}
            </div>
        </div>  
    )
}
export default JulianCalendar


