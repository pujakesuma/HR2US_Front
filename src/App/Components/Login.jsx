import React, { Component } from 'react'
import { Form, Button, Card, Row, Col, Container, Alert, Nav } from 'react-bootstrap'
import axios from 'axios'
import { Redirect, withRouter } from 'react-router-dom'

class Login extends Component {
    constructor(){
        super()
        this.state={
            message: '',
            email: '',
            role: '',
            token: '',
            id: ''
        }
    }

    Login = e => {
        e.preventDefault();
        const dataLogin = {
            email: this.state.email,
            password: this.state.password,
            role: this.state.role
        }

        axios.post('https://hr2us-app.herokuapp.com/userAuth/login', dataLogin)
        .then( res => {
            console.log(res)
            console.log(dataLogin)
            this.setState({
                email: res.data.data.email,
                message: res.data.message,
                role: res.data.data.role,
                token: res.data.token,
                id: res.data.data.id
            })
            localStorage.setItem('id', this.state.id)
            localStorage.setItem('email', this.state.email)
            localStorage.setItem('role', this.state.role)
            localStorage.setItem('token', this.state.token)
            console.log(localStorage)
            this.props.history.push('/')
        })
        .catch(err => {
            this.setState({
                message: 'Login Failed!'
            })
        })
    }

    render() {
        return (
            <Container className='justify-content-center mt-5' style={{ paddingBottom: '20px' }}>
                <Row className="justify-content-center">
                    <Col md="5">
                        {(this.state.message==='Login Failed!') ? (['danger'].map((variant, idx) => (
                            <Alert key={idx} variant={variant}>
                                {this.state.message}
                            </Alert>)
                            )) : null
                        }
                        <Card>
                            <Card.Header>
                                <Row className="justify-content-center">
                                    <h2>Sign in</h2>
                                </Row>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={ (e) => this.Login(e)}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email Address </Form.Label>
                                        <Form.Control onChange={(e) => {this.setState({email: e.target.value });console.log(e.target.value)}} name="email" type="text" placeholder="Enter your email" />
                                        <Form.Text className="text-muted"> We'll never share your email with anyone else </Form.Text>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label> Password </Form.Label>
                                        <Form.Control onChange={(e) => this.setState({password: e.target.value })} name="password" type="password" placeholder="Password" />
                                    </Form.Group>
                                    <Form.Group controlId="formGridState">
                                        <Form.Label> Role </Form.Label>
                                        <Form.Control as="select" name="role" onChange={(e) => this.setState({role: e.target.value })}>
                                            <option value='..'>..</option>
                                            <option value='company'>company</option>
                                            <option value='engineer'>engineer</option>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm="4">Not Registered?</Form.Label>
                                        <Col sm="8">
                                            <Nav.Link href="/register">Create an account</Nav.Link>
                                        </Col>
                                    </Form.Group>
                                    <Button variant="primary" type="submit">Sign in</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                {(localStorage.getItem('token')) ? (localStorage.getItem('role')==='engineer') ? <Redirect to='/companies'/> : <Redirect to='/' /> : null }
            </Container>
        )
    }
}

export default withRouter(Login)
