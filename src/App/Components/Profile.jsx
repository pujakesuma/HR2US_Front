import React, { Component } from 'react'
import { Table, Container, Card, Row, Col, Button, ButtonToolbar } from 'react-bootstrap'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import Header from '../Header'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getEngineer, deleteEngineer } from '../Redux/actions/Profile'
import Numbering from 'react-number-format'

class Profile extends Component {

    componentDidMount(){
        this.getData(`http://localhost:5000/api/engineers/`+this.props.match.params.id)
    }

    getData = (url) => {
        this.props.get(url)
    }

    deleteData = () => {
        const url = `http://localhost:5000/api/engineers/${this.props.Profile.id}`
        const config = (
            { headers: {
                Authorization:'Bearer' + localStorage.getItem('token'),
                email: localStorage.getItem('email')
            }}
        )
        this.props.delete(url, config)
        localStorage.clear()
    }

    render() {
        return (
            <>
            <Header/>
            <Container className='justify-content-center mt-3' style={{ paddingBottom:'20px'}}>
                <Row className='justify-content-center'>
                    <Col md='3'>
                        {(!this.props.Profile.photo) ?
                        <Card style={{ marginBottom:'15px', marginRight: '20px', borderRadius:'12%', width: '14rem', height:'20rem', backgroundImage: `url(../../Image/profile-icon.png)`, backgroundSize: 'cover', backgroundPosition:'center' }}>
                            <Card.Body style={{ height: '200px' }}>
                            </Card.Body>
                        </Card> :
                        <Card style={{ marginBottom:'15px', marginRight: '20px', borderRadius:'12%', width: '14rem', height:'20rem', backgroundImage: `url(http://localhost:5000/uploads/engineers/${this.props.Profile.photo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <Card.Body style={{ height: '200px'}}>
                            </Card.Body>
                        </Card>
                        }
                    </Col>
                    <Col>
                    <Table striped bordered hover>
                    <tbody>
                        <tr>
                        <td width='30%'>Name</td>
                        <td> {this.props.Profile.name}</td>
                        </tr>
                        <tr>
                        <td>Date Of Birth</td>
                        <td>{this.props.Profile.dateOfBirth}</td>
                        </tr>
                        <tr>
                        <td>Location</td>
                        <td>{(this.props.Profile.location!==null)&&(this.props.Profile.location!=='null')&&this.props.Profile.location}</td>
                        </tr>
                        <tr>
                        <td>Description</td>
                        <td>{(this.props.Profile.description!==null)&&(this.props.Profile.description!=='null')&&this.props.Profile.description}</td>
                        </tr>
                        <tr>
                        <td>Email</td>
                        <td>{this.props.Profile.email}</td>
                        </tr>
                        <tr>
                        <td>Expected Salary</td>
                        <td><Numbering value={this.props.Profile.expectedSalary} displayType='text' thousandSeparator prefix='Rp. ' /></td>
                        </tr>
                        <tr>
                        <td>Skill</td>
                        <td>{(this.props.Profile.skill!==null)&&(this.props.Profile.skill!=='null')&&this.props.Profile.skill}</td>
                        </tr>
                        <tr>
                        <td>Showcase</td>
                        <td>{(this.props.Profile.showcase!==null)&&(this.props.Profile.showcase!=='null')&&this.props.Profile.showcase}</td>
                        </tr>
                    </tbody>
                    </Table>
                    <ButtonToolbar>
                        <Link to={`/edit/${this.props.Profile.id}`}>
                            <Button variant="outline-warning"><FontAwesomeIcon icon={faPencilAlt}/> Edit</Button>
                        </Link>&nbsp;
                        <Button variant="outline-danger" onClick={this.deleteData}><FontAwesomeIcon icon={faTrash}/> Delete</Button>
                    </ButtonToolbar>
                    </Col>
                </Row>
                {(this.props.Profile.isDeleted) ? <Redirect to='/'/> : null }
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
    delete: (url, config) => dispatch(deleteEngineer(url, config))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
