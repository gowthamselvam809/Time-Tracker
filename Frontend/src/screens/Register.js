import React from 'react'
import RegisterForm from '../components/auth/registerForm';
import AuthLayout from '../layout/authLayout';
import '../style/login.scss'

const Register = () => {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    )
}

export default Register; 