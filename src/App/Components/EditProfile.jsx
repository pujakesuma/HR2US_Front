import React, { Component } from 'react'
import { Container, Card, Row, Col, Button, Form, Alert } from 'react-bootstrap'
import Header from '../Header'
import { connect } from 'react-redux'
import { getEngineer, updateEngineer } from '../Redux/actions/Profile'

class EditProfile extends Component {
    constructor(){
        super()
        this.state={
            name: '',
            photo: null,
            description: '',
            skill: '',
            location: '',
            date_of_birth: '',
            expected_salary: '',
            email: '',
            showcase: '',
            message: ''
        }
    }
    componentDidMount(){
        this.getData('http://localhost:5000/api/engineers/'+this.props.match.params.id)
        this.setState({
            name: this.props.Profile.name,
            photo: this.props.Profile.photo,
            description: this.props.Profile.description,
            skill: this.props.Profile.skill,
            location: this.props.Profile.location,
            date_of_birth: this.props.Profile.date_of_birth,
            expected_salary: this.props.Profile.expected_salary,
            email: this.props.Profile.email,
            showcase: this.props.Profile.showcase
        })
    }
    getData = (url) => {
        this.props.get(url)
    }

    Update = e => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('name', this.state.name)
        formData.append('date_of_birth', this.state.date_of_birth)
        formData.append('location', this.state.location)
        formData.append('description', this.state.description)
        formData.append('email', this.state.email)
        formData.append('expected_salary', this.state.expected_salary)
        formData.append('skill', this.state.skill)
        formData.append('showcase', this.state.showcase)
        formData.append('photo', this.state.photo)

        const config = (
            {
                headers: {
                    'Content-type':'multipart/form-data',
                    Authorization: 'Bearer'+localStorage.getItem('token'),
                    email: localStorage.getItem('email')
                }
            }
        )
        const url = `http://localhost:5000/api/engineers/${localStorage.getItem('id')}`
        this.props.update(url, formData, config)
    }

    onFileChange = e => {
        this.setState({
            photo: e.target.files[0]
        })
    }

    render() {
        return (
            <>
            <Header/>
            <Container className='justify-content-center mt-3' style={{ paddingBottom:'20px'}} >
                <Row className='justify-content-center'>
                    <Col md='3'>
                        <Card style={{ marginBottom:'15px', marginRight: '20px', borderRadius:'12%', width: '14rem', height:'20rem', backgroundImage: `url(http://localhost:5000/public/uploads/engineers/${this.state.photo})`,backgroundPosition:'center', backgroundSize: 'cover' }}>
                            <Card.Body style={{ height: '200px'}}>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                    { (this.props.Profile.message==='Update Failed!') ? ( ['danger'].map((variant, idx) => (
                        <Alert key={idx} variant={variant}>
                        {this.props.Profile.message}
                        </Alert>)
                    )) : (this.props.Profile.message==='Update Success!') && ( ['success'].map((variant, idx) => (
                        <Alert key={idx} variant={variant}>
                        {this.props.Profile.message}
                        </Alert>)
                    ))
                    }
                        <Form onSubmit={ (e) => this.Update(e)}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Name</Form.Label>
                                <Form.Control onChange={ (e) => {this.setState({name: e.target.value});console.log(e.target.value)}} name="name" type="text" value={this.state.name} placeholder="Enter name"/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Photo</Form.Label>
                                <Form.Control onChange={ this.onFileChange } name="photo" type="file" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Date Of Birth</Form.Label>
                                <Form.Control onChange={ (e) => this.setState({ date_of_birth: e.target.value })} name="date_of_birth" type="date" value={this.state.date_of_birth} placeholder="Enter Date Of Birth" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Location</Form.Label>
                                <Form.Control onChange={ (e) => this.setState({ location: e.target.value })} name="location" type="text" value={this.state.location} placeholder="Enter Location" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Description</Form.Label>
                                <Form.Control onChange={ (e) => this.setState({ description: e.target.value })} name="description" type="text" value={this.state.description} placeholder="Enter description" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={ (e) => this.setState({ email: e.target.value })} name="email" type="email" value={this.state.email} placeholder="Enter email" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Expected Salary</Form.Label>
                                <Form.Control onChange={ (e) => this.setState({ expected_salary: e.target.value })} name="expected_salary" type="text" value={this.state.expected_salary} placeholder="Enter Expected Salary (IDR)" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Skill</Form.Label>
                                <Form.Control as="textarea" rows="3" onChange={ (e) => this.setState({ skill: e.target.value })} name="skill" type="text" value={this.state.skill} placeholder="Enter skill" />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Showcase</Form.Label>
                                <Form.Control onChange={ (e) => this.setState({ showcase: e.target.value })} name="showcase" type="text" value={this.state.showcase} placeholder="Enter showcase link" />
                            </Form.Group>
                            <Button variant="outline-warning" type="button" href={`/profile/${localStorage.getItem('id')}`} >Cancel</Button>&nbsp;
                            <Button variant="outline-primary" type="submit">Save</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}

const mapStateToProps = state => ({
    Profile: state.Profile
})

const mapDispatchToProps = dispatch => ({
    get: url => dispatch(getEngineer(url)),
    update: (url, data, config) => dispatch(updateEngineer(url, data, config))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile)
