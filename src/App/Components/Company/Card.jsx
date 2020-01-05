import React, { Component } from 'react'
import Header from '../../Header'
import CardList from './CardList'
import { Button,Row, ButtonToolbar, DropdownButton, Dropdown, Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { fetchCompanies } from '../../Redux/actions/Companies'
import '../../Css/Style.css'

class Card extends Component {

    componentDidMount(){
        this.fetchCompanies('http://localhost:5000/api/companies/?page=1')
    }

    fetchCompanies = (url) => {
        this.props.fetch(url)
    }

    render() {
        return (
            <>
            {
                (!localStorage.getItem('token')) ?
                this.props.history.push('/login') : <Header searchBar='true'/>
            }
            <Container className='justify-content-center mt-3' style={{ paddingBottom:'20px'}}>
                <Row>
                    <ButtonToolbar>
                        {['Primary'].map(
                            variant => (
                            <DropdownButton
                                title='Per Page'
                                variant={variant.toLowerCase()}
                                id={`dropdown-variants-${variant}`}
                                key={variant}>
                                <Dropdown.Item eventKey="1" onClick={() => this.fetchCompanies((this.props.Companies.base_url.replace(/&limit=5|&limit=10|&limit=15|&limit=20/gi,''))+'&limit=5')}> 5</Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={() => this.fetchCompanies((this.props.Companies.base_url.replace(/&limit=5|&limit=10|&limit=15|&limit=20/gi,''))+'&limit=10')}> 10</Dropdown.Item>
                                <Dropdown.Item eventKey="3" onClick={() => this.fetchCompanies((this.props.Companies.base_url.replace(/&limit=5|&limit=10|&limit=15|&limit=20/gi,''))+'&limit=15')}> 15</Dropdown.Item>
                                <Dropdown.Item eventKey="4" onClick={() => this.fetchCompanies((this.props.Companies.base_url.replace(/&limit=5|&limit=10|&limit=15|&limit=20/gi,''))+'&limit=20')}> 20</Dropdown.Item>
                            </DropdownButton>
                            ),
                        )}
                    </ButtonToolbar>&nbsp;
                    <ButtonToolbar>
                        {['Primary'].map(
                            variant => (
                            <DropdownButton
                                title='Sort By'
                                variant={variant.toLowerCase()}
                                id={`dropdown-variants-${variant}`}
                                key={variant}>
                                <Dropdown.Item eventKey="1" onClick={() => this.fetchCompanies((this.props.Companies.base_url.replace(/&sort=name&order=asc|&sort=name&order=desc/gi,''))+'&sort=name&order=asc')}>Name (A-Z)</Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={() => this.fetchCompanies((this.props.Companies.base_url.replace(/&sort=name&order=asc|&sort=name&order=desc/gi,''))+'&sort=name&order=desc')}>Name (Z-A)</Dropdown.Item>
                            </DropdownButton>
                            ),
                        )}
                    </ButtonToolbar>
                </Row>
            </Container>
            { // conditional rendering show loading and error
                this.props.Companies.isLoading ?
                <Row className="justify-content-center">
                <p>Loading..</p></Row> : 
                this.props.Companies.isError ? (
                <Row className="justify-content-center">
                <Button variant="outline-primary" onClick={() => this.fetchCompanies('http://localhost:5000/api/companies/?page=1')}> Try Again</Button>
                </Row>
                ) : (this.props.Companies.dataTotal<=0) ? <Row className="justify-content-center"><p>No Data Found!</p></Row> :
                <div className='containerGrid'>
                <CardList list={this.props.Companies.card}/>
                </div>
            }
                <Row className="justify-content-center" >
            { // conditional rendering when there is no previous
                (!this.props.Companies.previous) ? <Button variant="outline-primary" disabled> Previous </Button> : <Button variant="outline-primary" onClick={() => this.fetchCompanies(this.props.Companies.previous)}> Previous </Button>
            }&nbsp;
                <Button variant="outline-primary" disabled>
            {this.props.Companies.page}
                </Button>&nbsp;
            {
                (!this.props.Companies.next) ?
                <Button variant="outline-primary" disabled> Next </Button> : <Button variant="outline-primary" onClick={() => this.fetchCompanies(this.props.Companies.next)}> Next </Button>
            }
                </Row>
            </>
        );
    }
}

const mapStateToProps = state => ({
    Companies: state.Companies
})

const mapDispatchToProps = dispatch => ({
    fetch: url => dispatch(fetchCompanies(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(Card)
