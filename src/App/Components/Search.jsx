import React, { Component } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import { fetchEngineers } from "../Redux/actions/Engineers";

class Search extends Component {
  searchEngineers = e => {
    const key = e.target.value;
    this.props.fetch(
      `https://hr2us-app.herokuapp.com/api/engineers/?page=1?name=${key}`
    );
  };

  render() {
    return (
      <>
        <Form className="ml-auto mt-2">
          <InputGroup>
            <InputGroup.Append>
              <InputGroup.Text
                style={{
                  backgroundColor: "#DADADA",
                  borderRadius: "10px 0px 0px 10px"
                }}
              >
                <FontAwesomeIcon icon={faSearch} />
              </InputGroup.Text>
            </InputGroup.Append>
            <FormControl
              type="text"
              style={{
                backgroundColor: "#DADADA",
                borderRadius: "0px 10px 10px 0px"
              }}
              placeholder="Search"
              onChange={this.searchEngineers}
              className="mr-sm-2"
            />
          </InputGroup>
        </Form>
      </>
    );
  }
}

const mapStateToProps = state => ({
  Engineers: state.Engineers
});

const mapDispatchToProps = dispatch => ({
  fetch: url => dispatch(fetchEngineers(url))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
