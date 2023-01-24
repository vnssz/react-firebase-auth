import { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";


const Home = () => {
  const [name, setName] = useState("App");
  const [user, setUsers] = useState(10);

  const handleClick = (e) => {
    
  };

  return(
  <div className="Home-Page">
<h1>Home</h1>
  </div>) 
};

export default Home;
