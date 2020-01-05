import { Table, Container, Card, Row, Col, Button, ButtonToolbar } from 'react-bootstrap'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons'
import Header from '../../Header'
import { Link } from 'react-router-dom'
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { getCompany, deleteCompany } from '../../Redux/actions/Profile'

class Profile extends Component {

    componentDidMount(){
        this.getData(`http://localhost:5000/api/companies/`+this.props.match.params.id)
    }

    getData = (url) => {
        this.props.get(url)
    }

    deleteData = () => {
        const url = `http://localhost:5000/api/companies/${this.props.Profile.CompanyId}`
        const config =(
            { headers: { 
                Authorization:'Bearer '+localStorage.getItem('token'), 
                email: localStorage.getItem('email')
            }})
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
                    {(!this.props.Profile.CompanyLogo) ?
                    <Card style={{ marginBottom:'15px', marginRight: '20px', borderRadius:'12%', width: '14rem', height:'20rem', backgroundImage: `url(../../Image/profile-icon.png)`, backgroundSize: 'cover', backgroundPosition:'center' }}>
                    <Card.Body style={{ height: '200px'}}>
                    </Card.Body>
                    </Card> : 
                    <Card style={{ marginBottom:'15px', marginRight: '20px', borderRadius:'12%', width: '14rem', height:'20rem', backgroundImage: `url(http://localhost:5000/uploads/companies/${this.props.Profile.CompanyLogo})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <Card.Body style={{ height: '200px'}}>
                    </Card.Body>
                    </Card>}</Col>
                    <Col>
                    <Table striped bordered hover>
                    <tbody>
                        <tr>
                        <td width='30%'>Company Name</td>
                        <td> {this.props.Profile.CompanyName}</td>
                        </tr>
                        <tr>
                        <td>Email</td>
                        <td>{this.props.Profile.CompanyEmail}</td>
                        </tr>
                        <tr>
                        <td>Location</td>
                        <td>{(this.props.Profile.CompanyLocation!==null)&&(this.props.Profile.CompanyLocation!=='null')&&this.props.Profile.CompanyLocation}</td>
                        </tr>
                        <tr>
                        <td>Description</td>
                        <td>{(this.props.Profile.CompanyDesc!==null)&&(this.props.Profile.CompanyDesc!=='null')&&this.props.Profile.CompanyDesc}</td>
                        </tr>
                    </tbody>
                    </Table>
                    <ButtonToolbar>
                    <Link to={`/editcompany/${this.props.Profile.CompanyId}`}><Button variant="outline-warning"><FontAwesomeIcon icon={faPencilAlt}/> Edit</Button></Link>&nbsp;
                    <Button variant="outline-danger" onClick={this.deleteData} ><FontAwesomeIcon icon={faTrash} /> Delete</Button>
                    </ButtonToolbar>
                    </Col>
                </Row>
                { (this.props.Profile.isDeleted) ? <Redirect to='/login' /> : null }
            </Container>
            </>
        )
    }
}

const mapStateToProps = state => ({
    Profile: state.Profile
})

const mapDispatchToProps= dispatch => ({
    get: url => dispatch(getCompany(url)),
    delete: (url, config) => dispatch(deleteCompany(url, config))
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)