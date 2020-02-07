import React, { Component } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Button,
  Form,
  Alert
} from "react-bootstrap";
import Header from "../../Header";
import { connect } from "react-redux";
import { getCompany, updateCompany } from "../../Redux/actions/CompanyProfile";

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      logo: null,
      description: "",
      location: "",
      email: "",
      message: ""
    };
  }

  componentDidMount() {
    this.getData(
      `https://hr2us-app.herokuapp.com/api/companies/` +
        this.props.match.params.id
    );
    this.setState({
      name: this.props.CompanyProfile.name,
      logo: this.props.CompanyProfile.logo,
      description: this.props.CompanyProfile.description,
      location: this.props.CompanyProfile.location,
      email: this.props.CompanyProfile.email
    });
  }
  getData = url => {
    this.props.get(url);
  };

  Update = e => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("email", this.state.email);
    formData.append("location", this.state.location);
    formData.append("description", this.state.description);
    formData.append("logo", this.state.logo);

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("token"),
        email: localStorage.getItem("email")
      }
    };

    const url = `https://hr2us-app.herokuapp.com/api/companies/${localStorage.getItem(
      "id"
    )}`;
    this.props.update(url, formData, config);
  };

  onFileChange = e => {
    this.setState({
      logo: e.target.files[0]
    });
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
              <Card
                style={{
                  marginBottom: "15px",
                  marginRight: "20px",
                  borderRadius: "12%",
                  width: "14rem",
                  height: "20rem",
                  backgroundImage: `url(https://hr2us-app.herokuapp.com/uploads/companies/${this.state.logo})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover"
                }}
              >
                <Card.Body style={{ height: "200px" }}></Card.Body>
              </Card>
            </Col>
            <Col>
              {this.props.CompanyProfile.message === "Update Failed!"
                ? ["danger"].map((variant, idx) => (
                    <Alert key={idx} variant={variant}>
                      {this.props.CompanyProfile.message}
                    </Alert>
                  ))
                : this.props.CompanyProfile.message === "Update Success!" &&
                  ["success"].map((variant, idx) => (
                    <Alert key={idx} variant={variant}>
                      {this.props.CompanyProfile.message}
                    </Alert>
                  ))}
              <Form onSubmit={e => this.Update(e)}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Company Name</Form.Label>
                  <Form.Control
                    onChange={e => this.setState({ name: e.target.value })}
                    name="name"
                    type="text"
                    value={this.state.name}
                    placeholder="Enter Company Name"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Company Logo</Form.Label>
                  <Form.Control
                    onChange={this.onFileChange}
                    name="logo"
                    type="file"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    onChange={e => this.setState({ location: e.target.value })}
                    name="location"
                    type="text"
                    value={this.state.location}
                    placeholder="Enter Company Location"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    onChange={e => this.setState({ email: e.target.value })}
                    name="email"
                    type="email"
                    value={this.state.email}
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    onChange={e =>
                      this.setState({ description: e.target.value })
                    }
                    name="description"
                    type="text"
                    value={this.state.description}
                    placeholder="Enter description"
                  />
                </Form.Group>
                <Button
                  variant="outline-warning"
                  type="button"
                  href={`/profilecompany/${localStorage.getItem("id")}`}
                >
                  Cancel
                </Button>
                &nbsp;
                <Button variant="outline-primary" type="submit">
                  Save
                </Button>
              </Form>
            </Col>
          </Row>
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
  update: (url, data, config) => dispatch(updateCompany(url, data, config))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
