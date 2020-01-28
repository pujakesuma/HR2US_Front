import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import '../../Css/Style.css'
import logo from '../../Image/company.png'

function CardList(props) {
    return (
        <>
        { props.Companies.card.map(item => (
            (!item.logo) ?
            <div class="containerImage">
                <img src={logo} alt="CardImage" className="imageGrid"/>
                <div class="overlay">
                    <Container>
                        <Row>
                            <Link to={`/companyprofile/${item.id}`} style={{ color: 'white', fontWeight: 'bolder'}}>{item.name}</Link>
                        </Row>
                        <Row style={{ fontSize: '11px' }}>
                            <Col style={{ padding: '0px'}}>{item.description}</Col>
                        </Row>
                        <Row style={{ fontSize: '11px' }}>
                            <Col style={{ padding: '0px'}}>
                                <FontAwesomeIcon icon={faEnvelope} /> {item.email}
                            </Col>
                        </Row>
                        <Row style={{ fontSize: '11px'}}>
                        <Col style={{ padding: '0px'}}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} /> {item.location}
                        </Col>
                        </Row>
                    </Container>
                </div>
            </div> :
            <div class="containerImage">
                <img src={`http://localhost:5000/uploads/companies/${item.logo}`} alt="CardImage" className="imageGrid"/>
                <div class="overlay">
                    <Container>
                        <Row>
                            <Link to={`/companyprofile/${item.id}`} style={{ color: 'white', fontWeight: 'bolder'}}>{item.name}</Link>
                        </Row>
                        <Row style={{ fontSize: '11px' }}>
                            <Col style={{ padding: '0px'}}>{item.description}</Col>
                        </Row>
                        <Row style={{ fontSize: '11px' }}>
                            <Col style={{ padding: '0px'}}>
                                <FontAwesomeIcon icon={faEnvelope} /> {item.email}
                            </Col>
                        </Row>
                        <Row style={{ fontSize: '11px'}}>
                            <Col style={{ padding: '0px'}}>
                                <FontAwesomeIcon icon={faMapMarkerAlt} /> {item.location}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        )) }
        </>
    )
}

const mapStateToProps = state => ({
    Companies : state.Companies
})

export default connect(mapStateToProps)(CardList)