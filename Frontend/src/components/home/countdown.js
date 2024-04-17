import React, { useState, useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { createTimeEntriesAPI, getLastTimeEntriesAPI, updateTimeEntriesAPI } from '../../api/api';

const Timer = () => {
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchLastEntries();
    }, [])

    const fetchLastEntries = async () => {
        setIsLoading(true)
        const response = await getLastTimeEntriesAPI({ userId: localStorage.getItem('userId') });
        console.log(response);
        if (response.entryData) {
            localStorage.setItem('timeTrackerId', response.entryData._id);
            setStartDate(response.entryData.startDate);
            setIsRunning(true);
            setTotalDuration(response.totalDuration || 0);
        } else {
            setTotalDuration(response.totalDuration || 0);
        }
        setIsLoading(false);
    }


    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                const now = new Date().getTime();
                setElapsedTime(now - startDate);
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning, startDate]);

    const handleStart = async () => {
        setIsLoading(true)
        setEndDate(null)
        const now = new Date().getTime();
        setStartDate(now);
        setIsRunning(true);
        const response = await createTimeEntriesAPI({ userId: localStorage.getItem('userId'), startDate: now, isRunning: true });
        if (response) {
            localStorage.setItem('timeTrackerId', response._id);
            console.log(response);
        }
        setIsLoading(false)
    };

    const handleStop = async () => {
        setIsLoading(true)
        const now = new Date().getTime();
        setEndDate(now);
        const duration = totalDuration + (now - startDate);
        setTotalDuration(duration);
        setIsRunning(false);
        const response = await updateTimeEntriesAPI({ id: localStorage.getItem('timeTrackerId'), endDate: now, isRunning: false });
        if (response) {
            console.log(response);
        }
        setIsLoading(false);
    };

    function getMonthAbbreviation(month) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return months[parseInt(month) - 1];
    }

    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const getStartEndTime = (time) => {
        if (time) {
            const currentDate = new Date(time);
            const hours = currentDate.getHours();
            const minutes = currentDate.getMinutes();
            const seconds = currentDate.getSeconds();
            return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        } else {
            return `00:00:00`
        }
    }

    const formattedAbbreviationDate = () => {
        const currentDate = new Date();
        const day = currentDate.getDate().toString().padStart(2, '0');
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const year = currentDate.getFullYear().toString();
        return `${day}-${getMonthAbbreviation(month)}-${year}`;
    }


    return (
        <Container fluid>
            <Row>
                <Col className='mb-3'>
                    <div className='w-100 d-flex flex-direction-row '>
                        <div className='w-50'>
                            <div className='card_container_body_timer'>{formatTime(elapsedTime)}</div>
                            <div className='card_container_body_date'>{formattedAbbreviationDate()}</div>
                        </div>
                        <div className='w-50 clock_in_container'>
                            <div className='clock_in_container_box'>
                                <div className='clock_in_container_box_time'>{getStartEndTime(startDate)}</div>
                                <div className='clock_in_container_box_bottom'>Clock In Time</div>
                            </div>
                        </div>
                    </div>
                    {!isRunning ? (
                        <button className='card_container_body_button_in' disabled={isLoading} onClick={handleStart}>Clock In</button>
                    ) : (
                        <button className='card_container_body_button_out' disabled={isLoading} onClick={handleStop}>Clock Out</button>
                    )}

                    <button className='card_container_body_button_out' onClick={() => { localStorage.clear(); navigate('/') }}>Log Out</button>

                </Col>
                <hr />
                <Col className='w-100 d-flex flex-direction-row '>
                    <div className='w-50 clock_in_container_clock_out'>
                        <div className='clock_in_container_box'>
                            <div className='clock_in_container_box_time'>{getStartEndTime(endDate)}</div>
                            <div className='clock_in_container_box_bottom'>Clock Out Time</div>
                        </div>
                    </div>
                    <div className='w-50 clock_in_container_clock_out'>
                        <div className='clock_in_container_box'>
                            <div className='clock_in_container_box_time'>{formatTime(totalDuration)}</div>
                            <div className='clock_in_container_box_bottom'>Today Work Duration</div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Timer;
