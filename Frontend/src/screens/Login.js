import React from 'react'
import '../style/login.scss'
import LoginForm from '../components/auth/loginForm';
import AuthLayout from '../layout/authLayout';

const Login = () => {

    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    )
}

export default Login; 