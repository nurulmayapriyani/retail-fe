import "./style/navbar.css";
import logo from "./image/res.png";



export default function Navbar() {
  return (
    <nav>
      <img className ="logo" src={logo} alt="logo" />
      <a className="active" href="#brand">
        Hello,
      </a>
    </nav>
  );
}
