import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, Paper, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import { useState } from "react";

function Home({categories}) {
  const [expanded, setExpanded] = useState(false)

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }  

  const listCategories = categories.map(category => (
    <Accordion key={category.id} expanded={expanded === `panel${category.id}`} sx={{margin:0}} onChange={handleChange(`panel${category.id}`)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
        <Typography sx={{ margin:0, fontWeight:"bolder"}}>
          {category.name}
        </Typography>
      </AccordionSummary>
      {category.items.map(item=>(
        <AccordionDetails key={item.id}>
          {item.name}
        </AccordionDetails>
      ))}
      <Paper>{categories.items}</Paper>
    </Accordion>
  ))

  return (
    <div>
      {listCategories}
    </div>
  )
}
export default Home