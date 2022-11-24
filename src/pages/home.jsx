import { url } from "../apiurl/url.js";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [selectedClient, setSelectedClient] = useState("");

  const getTargetYear = () => {
    let date = new Date();
    let year = date.getFullYear();
    console.log(year);
    document.getElementById("targetYear").innerHTML = year;
  };

  const getGroupName = async () => {
    try {
      const groupNameUrl = await axios.get(url + "/retail_group");
      console.log(groupNameUrl);
    } catch (error) {
      console.log(error);
    }
  };

  function handleSelectChange(event) {
    setSelectedClient(event.target.value);
  }

  return (
    <h4 className="target">
      Target <span id="targetYear"></span>
    </h4>
  );
}
