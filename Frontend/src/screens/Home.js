import React from 'react'
import { Card, Col, Container, Image, Row } from 'react-bootstrap';
import Countdown from '../components/home/countdown';
import '../style/home.scss'
import avatar from '../images/avatar.png'
import { useSelector } from 'react-redux';
const Home = () => {
    const userData = useSelector((state) => state?.userData?.data)

    return (
        <Container fluid className='home_container'>
            <Card className='card_container'  >
                <Row>
                    <Col>
                        <div className='card_container_header'>
                            <div className='card_container_header_avatar_container'>
                                <Image src={avatar} className='card_container_header_avatar_container_image' />
                                <div className='card_container_header_avatar_container_text' >
                                    Hi <span className="username-text">{userData?.name}</span> mark your attendance here.
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className='card_container_body'>
                    <Countdown />
                </Row>
            </Card>
        </Container>
    )
}

export default Home;