import { useFormik } from 'formik';
import { Link } from '../components/Link';
import Axios from 'axios';
import { FaEnvelope, FaLock } from 'react-icons/fa'
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs'
import Cookies from "js-cookie"
import { useState } from 'react';

const SignupSchema = Yup.object({
    Email: Yup.string().email().required('Please enter your email'),
    Password: Yup.string().min(6).required('Please enter your password'),
});

const LoginForm = () => {

    useState(() => {
        Cookies.remove("LoggedIn")
        Cookies.remove("AdminLoggedIn")
        Cookies.remove("UserLoggedIn")
    }, [LoginForm])

    const router = useRouter();
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            Email: '',
        },
        validationSchema: SignupSchema,
        onSubmit: async (values, action) => {
            Axios.post('http://127.0.0.1:8090/api/login', {
                Email: values.Email,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(async (res) => {
                const doMatch = await bcrypt.compare(values.Password, res.data.recordset[0].Password)
                if (doMatch) {
                    Cookies.set("LoggedIn", true)
                    if (res.data.recordset[0].Role === 'Admin') {
                        router.push("/Admin");
                        Cookies.set("AdminLoggedIn", true)
                    } else if (res.data.recordset[0].Role === 'User') {
                        router.push("/User");
                        Cookies.set("UserLoggedIn", true)
                    }
                    else {
                        router.push("/");
                    }
                } 
                else {
                    alert('Username or Password not found')
                    res.send('Username or Password not found');
                }
            });
            action.resetForm();
        },
    });
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
                <div className='bg-white rounded-2xl shadow-2xl flex w-2/3 max-w-4xl'>
                    <div className='w-3/5 p-5'>
                        <div className='text-left font-bold'>
                            <span className='text-green-500'>School</span>Task
                        </div>
                        <div className='py-10'>
                            <h2 className='text-3xl font-bold text-green-500 mb-5'>
                                Log in to Account
                            </h2>
                            <div className='border-2 w-10 border-green-500 inline-block mb-5'></div>
                            <form onSubmit={handleSubmit}>
                                <input type="hidden" name="CSRFToken" value="" />
                                <div className='flex flex-col items-center'>
                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-3'>
                                        <FaEnvelope className='text-gray-400 m-2' />
                                        <input
                                            type="email"
                                            name="Email"
                                            placeholder='Email'
                                            className='bg-gray-100 outline-none text-sm flex-1'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Email}
                                            required={true}
                                        />
                                        {
                                            errors.Email && touched.Email ? (
                                                <p className='text-red-500 absolute text-sm mt-8 ml-8'>{errors.Email}</p>
                                            ) : null
                                        }
                                    </div>

                                    <div className='bg-gray-100 w-64 p-2 flex items-center mb-5'>
                                        <FaLock className='text-gray-400 m-2' />
                                        <input
                                            type="password"
                                            name="Password"
                                            placeholder='Password'
                                            className='bg-gray-100 outline-none text-sm flex-1'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Password}
                                            required={true}
                                            autocomplete="on"
                                        />
                                        {
                                            errors.Password && touched.Password ? (
                                                <p className="text-red-500 absolute text-sm mt-8 ml-8">{errors.Password}</p>
                                            ) : null
                                        }
                                    </div>

                                    <button
                                        type='submit'
                                        className='border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white'
                                    >
                                        Log In
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12'>
                        <h2 className='text-3xl font-bold mb-2'>Hello!</h2>
                        <div className='border-2 w-10 border-white inline-block mb-2'></div>
                        <p className='mb-10'>
                            Fill up your personal information
                        </p>
                        <a
                            href='/SignUp/SignUp'
                            className='border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500'
                        >
                            Sign Up
                        </a>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default LoginForm;