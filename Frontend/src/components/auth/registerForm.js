import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { userRegisterAPI } from '../../api/api';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../store/userSlice';


const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async (data) => {
        setIsLoading(true);
        const response = await userRegisterAPI(data);
        if (response) {
            console.log(response);
            localStorage.setItem('userId', response.id);
            dispatch(setUserInfo(response))
            navigate('/home')
        }
        setIsLoading(false);
        console.log(data);
    };

    return (
        <Form className='register_form' onSubmit={handleSubmit(onSubmit)}>
            <h2 className='register_form_header'>Register For Time Tracker</h2>
            <Form.Group controlId='formBasicName' className='register_form_group'>
                <Form.Label>Name</Form.Label>
                <Form.Control className='login_form_group_input' type='text' placeholder='Enter your name' {...register('name', { required: 'Name is required' })} />
                {errors.name && <p className='error_text'>{errors.name.message}</p>}
            </Form.Group>
            <Form.Group controlId='formBasicEmail' className='register_form_group'>
                <Form.Label>Email</Form.Label>
                <Form.Control className='login_form_group_input' type='email' placeholder='Enter email' {...register('email', { required: 'Email is required' })} />
                {errors.email && <p className='error_text'>{errors.email.message}</p>}
            </Form.Group>
            <Form.Group controlId='formBasicPassword' className='register_form_group'>
                <Form.Label>Password</Form.Label>
                <Form.Control className='login_form_group_input' type='password' placeholder='Password' {...register('password', { required: 'Password is required' })} />
                {errors.password && <p className='error_text'>{errors.password.message}</p>}
            </Form.Group>
            <Button variant='primary' disabled={isLoading} type='submit' className='register_form_button'>
                Register
            </Button>
            <p className="mt-3 d-flex justify-content-center align-items-center">
                Already have an account?<Link to='/' className='text-decoration-none'>&nbsp;Login</Link>
            </p>
        </Form>
    );
};

export default RegisterForm;
