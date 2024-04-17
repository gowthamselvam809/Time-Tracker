import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userLoginAPI } from '../../api/api';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../store/userSlice';

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data);
        setIsLoading(true)
        const response = await userLoginAPI(data);
        if (response) {
            console.log(response);
            localStorage.setItem('userId', response.id);
            toast.success("Login success!!!")
            dispatch(setUserInfo(response));
            navigate('/home');
        }
        setIsLoading(false);

    };

    return (
        <Form className='login_form' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='login_form_header'>Login For Time Tracker</h2>
            <Form.Group controlId='formBasicEmail' className='login_form_group'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='text' placeholder='Enter email' {...register('email', { required: 'Email is required' })} />
                {errors.email && <p className='text-danger'>{errors.email.message}</p>}
            </Form.Group>
            <Form.Group controlId='formBasicPassword' className='login_form_group'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' {...register('password', { required: 'Password is required' })} />
                {errors.password && <p className='text-danger'>{errors.password.message}</p>}
            </Form.Group>
            <Button variant='primary' disabled={isLoading} type='submit' className='login_form_button'>
                Submit
            </Button>
            <p className="mt-3  d-flex justify-content-center align-items-center">
                Don't have an account?<Link to='/register' className='text-decoration-none'> &nbsp;Register</Link>
            </p>
        </Form>
    );
};

export default LoginForm;
