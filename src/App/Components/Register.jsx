import React, { Component } from 'react'
import { Form, Button, Card, Row, Col, Container, Alert, Nav } from 'react-bootstrap'
import axios from 'axios'

export class Register extends Component {
    constructor(){
        super()
        this.state={
            message: '',
            email: '',
            password: '',
            role: '',
            name: ''
        }
    }

    register = e => {
        e.preventDefault();
        const data = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        }
        
        axios.post('http://localhost:5000/userAuth/register', data)
        .then( res => {
            this.setState({
                message: res.data.message
            })
        })
        .catch(err=>{
            this.setState({
                message: 'Register Failed'
            })
        })
    }

    render() {
        return (
            <Container className='justify-content-center mt-5' style={{ paddingBottom: '20px' }}>
                <Row className="justify-content-center">
                    <Col md="5">
                        {(this.state.message==='Register Failed!') ? (['danger'].map((variant, idx) => (
                            <Alert key={idx} variant={variant}>
                                {this.state.message}
                            </Alert>)
                            )) : (this.state.message==='Register success') ? (['success'].map((variant, idx) => (
                                <Alert key={idx} variant={variant}>
                                    {this.state.message}
                                </Alert>)
                            )) : null
                        }
                        <Card>
                            <Card.Header>
                                <Row className="justify-content-center">
                                    <h2>Sign Up</h2>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={ (e) => this.register(e)}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label> Name </Form.Label>
                                        <Form.Control onChange={(e) => this.setState({name: e.target.value })} name="name" type="text" placeholder="Enter Name" />
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email Address </Form.Label>
                                        <Form.Control onChange={(e) => this.setState({email: e.target.value })} name="email" type="text" placeholder="Enter your email" />
                                        <Form.Text className="text-muted"> We'll never share your email with anyone else </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label> Password </Form.Label>
                                        <Form.Control onChange={(e) => this.setState({password: e.target.value })} name="password" type="password" placeholder="Password" />
                                    </Form.Group>
                                    <Form.Group controlId="formGridState">
                                        <Form.Label> Role </Form.Label>
                                        <Form.Control as="select" name="role" onChange={(e) => this.setState({role: e.target.value })}>
                                            <option value='Select a role...'>Select a role...</option>
                                            <option value='company'>company</option>
                                            <option value='engineer'>engineer</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="6">Already have an account?</Form.Label>
                                        <Col sm="4">
                                            <Nav.Link href="/login">Login here</Nav.Link>
                                        </Col>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Sign Up</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Register
