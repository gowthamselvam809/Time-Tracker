import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
// import timer from '../images/timer.jpg'
import '../style/login.scss'

const AuthLayout = ({ children }) => {

    return (
        <Container fluid className='main_container'>
            <Row className='login_container'>
                <Col xl={6} lg={6} md={6} className='left_side'>

                </Col>
                <Col xl={6} lg={6} sm={6} md={6}>
                    <Row className='h-100'>
                        <Col lg={12} className='h-100 d-flex justify-content-center align-items-center'>
                            {children}
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default AuthLayout