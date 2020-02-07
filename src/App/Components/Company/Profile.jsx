import {
  Table,
  Container,
  Card,
  Row,
  Col,
  Button,
  ButtonToolbar
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import Header from "../../Header";
import { Link } from "react-router-dom";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { getCompany, deleteCompany } from "../../Redux/actions/CompanyProfile";

class Profile extends Component {
  componentDidMount() {
    this.getData(
      `https://hr2us-app.herokuapp.com/api/companies/` +
        this.props.match.params.id
    );
  }

  getData = url => {
    this.props.get(url);
    console.log(this.props);
  };

  deleteData = () => {
    const url = `https://hr2us-app.herokuapp.com/api/companies/${this.props.CompanyProfile.id}`;
    const config = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        email: localStorage.getItem("email")
      }
    };
    this.props.delete(url, config);
    localStorage.clear();
  };

  render() {
    return (
      <>
        <Header />
        <Container
          className="justify-content-center mt-3"
          style={{ paddingBottom: "20px" }}
        >
          <Row className="justify-content-center">
            <Col md="3">
              {!this.props.CompanyProfile.logo ? (
                <Card
                  style={{
                    marginBottom: "15px",
                    marginRight: "20px",
                    borderRadius: "12%",
                    width: "14rem",
                    height: "20rem",
                    backgroundImage: `url(../../Image/profile-icon.png)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  <Card.Body style={{ height: "200px" }}></Card.Body>
                </Card>
              ) : (
                <Card
                  style={{
                    marginBottom: "15px",
                    marginRight: "20px",
                    borderRadius: "12%",
                    width: "14rem",
                    height: "20rem",
                    backgroundImage: `url(https://hr2us-app.herokuapp.com/uploads/companies/${this.props.CompanyProfile.logo})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                  }}
                >
                  <Card.Body style={{ height: "200px" }}></Card.Body>
                </Card>
              )}
            </Col>
            <Col>
              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td width="30%">Company Name</td>
                    <td> {this.props.CompanyProfile.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{this.props.CompanyProfile.email}</td>
                  </tr>
                  <tr>
                    <td>Location</td>
                    <td>
                      {this.props.CompanyProfile.location !== null &&
                        this.props.CompanyProfile.location !== "null" &&
                        this.props.CompanyProfile.location}
                    </td>
                  </tr>
                  <tr>
                    <td>Description</td>
                    <td>
                      {this.props.CompanyProfile.description !== null &&
                        this.props.CompanyProfile.description !== "null" &&
                        this.props.CompanyProfile.description}
                    </td>
                  </tr>
                </tbody>
              </Table>
              <ButtonToolbar>
                <Link to={`/editcompany/${this.props.CompanyProfile.id}`}>
                  <Button variant="outline-warning">
                    <FontAwesomeIcon icon={faPencilAlt} /> Edit
                  </Button>
                </Link>
                &nbsp;
                <Button variant="outline-danger" onClick={this.deleteData}>
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </Button>
              </ButtonToolbar>
            </Col>
          </Row>
          {this.props.CompanyProfile.isDeleted ? (
            <Redirect to="/login" />
          ) : null}
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  CompanyProfile: state.CompanyProfile
});

const mapDispatchToProps = dispatch => ({
  get: url => dispatch(getCompany(url)),
  delete: (url, config) => dispatch(deleteCompany(url, config))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
