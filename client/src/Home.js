import { Paper } from "@mui/material";

function Home({categories}) {

  const listCategories = categories.map(category => (
    <div key={category.id}>
      <Paper sx={{m:2, width:200, fontSize:30}}>{category.name}</Paper>
      {category.items.map(item=>(
        <div key={item.id}>
          <Paper sx={{m:2, width:150, fontSize:20}}>{item.name}</Paper>
        </div>
      ))}
    </div>
  ))

  return (
    <div>
      {listCategories}
    </div>
  )
}
export default Home