import { Link } from "react-router-dom";
function Menu() {
  return (
    <div className="menu">
      <Link to="/items">Items</Link>
      <Link to="/create-item">New Item</Link>
    </div>
  );
}
export default Menu;