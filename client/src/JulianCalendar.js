import { FormControl, TextField, Button } from "@mui/material"
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
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleJulianDate}
                >
                    Submit
                </Button>
            </FormControl>
            <div style={{textAlign:"center"}}>
                <h1>Calendar Date is: {julianDate}</h1>
            </div>
        </div>  
    )
}
export default JulianCalendar


