import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { NavBar } from "../components";
import MaterialTable from "material-table";
import "bootstrap/dist/css/bootstrap.min.css";

import { Link } from "@material-ui/core";

function App() {
  const [data, setData] = useState([]);
  const columns = [
    {
      title: "ID",
      field: "_id",
      render: (rawData) => (
        <Link
          href={"http://localhost:3000/api/college/1000?random=${rawData._id}"}
        >
          {rawData._id}
        </Link>
      ),
    },
    { title: "Name", field: "Name" },
    { title: "City", field: "City" },

    { title: "Year founded", field: "Year_founded" },
    { title: "Courses", field: "Courses" },
    { title: "No of students", field: "No_of_students" },
    { title: "State", field: "State" },
    { title: "Country", field: "Country" },
  ];

  useEffect(() => {
    fetch("http://localhost:3000/api/colleges/")
      .then((resp) => resp.json())
      // .then((resp) => console.log(resp.data))
      .then((resp) => {
        setData(resp.data);
      });
  }, []);

  return (
    <div className="App">
      <h1 align="center">College Website</h1>
      <h6 align="center">Assignment created by Davangave Balaji</h6>
      <MaterialTable
        title="College List"
        data={data}
        columns={columns}
        // actions={[
        //   {
        //     icon: "save",
        //     tooltip: "Save User",
        //     onClick: (
        //       <Link to={"http://localhost:3000/api/movie/${data._id}"}>
        //         Edit
        //       </Link>
        //     ),
        //   },
        // ]}
      />
    </div>
  );
}

export default App;
