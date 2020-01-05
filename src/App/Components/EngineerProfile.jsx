import React, { Component } from 'react'
import { Table, Container, Card, Row, Col, Button, ButtonToolbar } from 'react-bootstrap'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { engineerProfile } from '../Redux/actions/Engineers'
import Numbering from 'react-number-format'

class EngineerProfile extends Component {

    componentDidMount(){
        this.engineerProfile(`http://localhost:5000/api/engineers/`+this.props.match.params.id)
    }

    engineerProfile = (url) => {
        this.props.fetch(url)
    }

    render() {
        return (
            <>
            <Header/>
            <Container className='justify-content-center mt-3' style={{ paddingBottom:'20px'}}>
                <Row className='justify-content-center'>
                    <Col md='3'>
                    { (!this.props.Engineers.photo) ?
                    <Card style={{ marginBottom:'15px', marginRight: '20px', borderRadius:'12%', width: '14rem', height:'20rem', backgroundImage: `url(../../Image/profile-icon.png)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <Card.Body style={{ height: '200px'}}>
                    </Card.Body>
                    </Card> : 
                    <Card style={{ marginBottom:'15px', marginRight: '20px', borderRadius:'12%', width: '14rem', height:'20rem', backgroundImage: `url(http://localhost:5000/uploads/engineers/${this.props.Engineers.photo})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
                    <Card.Body style={{ height: '200px'}}>
                    </Card.Body>
                    </Card> }
                    </Col>
                    <Col>
                    <Table striped bordered hover>
                        <tbody>
                            <tr>
                                <td width='30%'>Name</td>
                                <td>{this.props.Engineers.name}</td>
                            </tr>
                            <tr>
                            <td>Date Of Birth</td>
                            <td>{this.props.Engineers.dateOfBirth}</td>
                            </tr>
                            <tr>
                            <td>Location</td>
                            <td>{(this.props.Engineers.location!==null)&&(this.props.Engineers.location!=='null')&&this.props.Engineers.location}</td>
                            </tr>
                            <tr>
                            <td>Description</td>
                            <td>{(this.props.Engineers.description!==null)&&(this.props.Engineers.description!=='null')&&this.props.Engineers.description}</td>
                            </tr>
                            <tr>
                            <td>Email</td>
                            <td>{this.props.Engineers.email}</td>
                            </tr>
                            <tr>
                            <td>Expected Salary</td>
                            <td><Numbering value={this.props.Engineers.expectedSalary} displayType='text' thousandSeparator prefix='Rp. ' /></td>
                            </tr>
                            <tr>
                            <td>Skill</td>
                            <td>{(this.props.Engineers.skill!==null)&&(this.props.Engineers.skill!=='null')&&this.props.Engineers.skill}</td>
                            </tr>
                            <tr>
                            <td>Showcase</td>
                            <td>{(this.props.Engineers.showcase!==null)&&(this.props.Engineers.showcase!=='null')&&this.props.Engineers.showcase}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <ButtonToolbar>
                        <Link to={`/`}>
                            <Button variant="outline-primary">
                                <FontAwesomeIcon icon={faArrowAltCircleLeft}/>Back
                            </Button>
                        </Link>&nbsp;
                    </ButtonToolbar>
                    </Col>
                </Row>
            </Container>
            </>
        )
    }
}

const mapStateToProps = state => ({
    Engineers: state.Engineers
})

const mapDispatchToProps = dispatch => ({
    fetch: url => dispatch(engineerProfile(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(EngineerProfile)
