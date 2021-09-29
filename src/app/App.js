import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Map from "./Map";

import { NavBar } from "../components";
import { CollegesList, CollegesInsert, CollegesUpdate } from "../pages";

import "./App.css";

import MaterialTable from "material-table";

import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  const [data, setData] = useState([]);
  const columns = [
    // { title: "ID", field: "id" },
    //{ title: "success", field: "success" },
    // { title: "City", field: "City" },
    { title: "Email", field: "email" },
    // { title: "Phone", field: "phone" },
    // { title: "Web Link", field: "website" },
  ];
  useEffect(() => {
    fetch("http://localhost:3000/api/colleges/")
      .then((resp) => resp.json())
      .then((resp) => {
        setData(resp);
      });
  }, []);

  return (
    <div className="App">
      <h1 align="center">React-App</h1>
      <h4 align="center">Material Table</h4>
      <MaterialTable title="Employee Data" data={data} columns={columns} />
    </div>
  );
}

export default App;
