import React, { Component } from "react";
import ReactTable from "react-table";
import api from "../api";

import styled from "styled-components";

import "react-table/react-table.css";

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;

const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
`;

class UpdateCollege extends Component {
  updateUser = (event) => {
    event.preventDefault();

    window.location.href = `/colleges/update/${this.props.id}`;
  };

  render() {
    return <Update onClick={this.updateUser}>Update</Update>;
  }
}

class DeleteCollege extends Component {
  deleteUser = (event) => {
    event.preventDefault();

    if (
      window.confirm(
        `Do tou want to delete the college ${this.props.id} permanently?`
      )
    ) {
      api.deleteCollegeById(this.props.id);
      window.location.reload();
    }
  };

  render() {
    return <Delete onClick={this.deleteUser}>Delete</Delete>;
  }
}

class CollegesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colleges: [],
      columns: [],
      isLoading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    await api.getAllColleges().then((colleges) => {
      this.setState({
        colleges: colleges.data.data,
        isLoading: false,
      });
    });
  };

  render() {
    const { colleges, isLoading } = this.state;
    console.log("TCL: CollegesList -> render -> colleges", colleges);

    const columns = [
      {
        Header: "ID",
        accessor: "_id",
        filterable: true,
      },
      {
        Header: "Name",
        accessor: "Name",
        filterable: true,
      },
      {
        Header: "No_of_students",
        accessor: "No_of_students",
        filterable: true,
      },
      {
        Header: "Courses",
        accessor: "Courses",
        Cell: (props) => <span>{props.value.join(" / ")}</span>,
      },
      {
        Header: "",
        accessor: "",
        Cell: function (props) {
          return (
            <span>
              <DeleteCollege id={props.original._id} />
            </span>
          );
        },
      },
      {
        Header: "",
        accessor: "",
        Cell: function (props) {
          return (
            <span>
              <UpdateCollege id={props.original._id} />
            </span>
          );
        },
      },
    ];

    let showTable = true;
    if (!colleges.length) {
      showTable = false;
    }

    return (
      <Wrapper>
        {showTable && (
          <ReactTable
            data={colleges}
            columns={columns}
            loading={isLoading}
            defaultPageSize={10}
            showPageSizeOptions={true}
            minRows={0}
          />
        )}
      </Wrapper>
    );
  }
}

export default CollegesList;
