import { useFormik } from 'formik';
import Axios from 'axios'
import { Link } from '../components/Link';
import { useRouter } from 'next/router';
import * as Yup from "yup";
import { FaEnvelope, FaUserAlt, FaLock, FaPhoneAlt } from 'react-icons/fa'
import bcrypt from 'bcryptjs'

const SignupSchema = Yup.object({
    Name: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required('Please enter your name'),
    Email: Yup.string().email().required('Please enter your email'),
    Number: Yup.string().min(6).max(12).required('Please enter your number'),
    Password: Yup.string().min(6).required('Please enter your password'),
    ConfirmPassword: Yup.string().min(6).required('enter your confirm password'),
    Role: Yup.string().min(2, 'Too Short!').max(70, 'Too Long!').required('Please enter your Role'),

});

const SignUpForm = () => {

    const router = useRouter();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            Name: '',
            Email: '',
            Number: '',
            Password: '',
            ConfirmPassword: '',
            Role: '',
        },
        validationSchema: SignupSchema,
        onSubmit: async(values, action) => {
            const hashedPassword = await bcrypt.hash(values.Password,12)
            Axios.post('http://127.0.0.1:8090/api/register', {
                Name: values.Name,
                Email: values.Email,
                Number: values.Number,
                Password: hashedPassword,
                Role: values.Role
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then((res) => {
                if (res) {
                    router.push('/');
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
                        <div className='py-2'>
                            <h2 className='text-3xl font-bold text-green-500 mb-2'>
                                Sign in to Account
                            </h2>
                            <div className='border-2 w-20 border-green-500 inline-block mb-2'></div>
                            <form onSubmit={handleSubmit}>
                                <input type="hidden" name="CSRFToken" value="" />
                                <div className='flex flex-col items-center'>
                                    <div className='bg-gray-100 w-80 p-2 flex items-center mb-2'>
                                        <FaUserAlt className='text-gray-400 m-2' />
                                        <input
                                            type="text"
                                            name="Name"
                                            placeholder='Name'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Name}
                                            required={true}
                                            className='bg-gray-100 outline-none text-sm flex-1'
                                        />
                                        {
                                            errors.Name && touched.Name ? (
                                                <p className='text-red-500 absolute text-sm mt-8 ml-8'>{errors.Name}</p>
                                            ) : null
                                        }
                                    </div>

                                    <div className='bg-gray-100 w-80 p-2 flex items-center mb-2'>
                                        <FaEnvelope className='text-gray-400 m-2' />
                                        <input
                                            type="email"
                                            name="Email"
                                            placeholder='Email'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Email}
                                            required={true}
                                            className='bg-gray-100 outline-none text-sm flex-1'
                                        />
                                        {
                                            errors.Email && touched.Email ? (
                                                <p className='text-red-500 absolute text-sm mt-8 ml-8'>{errors.Email}</p>
                                            ) : null
                                        }
                                    </div>
                                    <div className='bg-gray-100 w-80 p-2 flex items-center mb-2'>
                                        <FaPhoneAlt className='text-gray-400 m-2' />
                                        <input
                                            type="text"
                                            name="Number"
                                            placeholder='Mobile'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Number}
                                            required={true}
                                            className='bg-gray-100 outline-none text-sm flex-1'
                                        />
                                        {
                                            errors.Email && touched.Number ? (
                                                <p className='text-red-500 absolute text-sm mt-8 ml-8'>{errors.Number}</p>
                                            ) : null
                                        }
                                    </div>
                                    <div className='bg-gray-100 w-80 p-2 flex items-center mb-2'>
                                        <FaLock className='text-gray-400 m-2' />
                                        <input
                                            type="password"
                                            name="Password"
                                            placeholder='Password'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Password}
                                            required={true}
                                            autocomplete="on"
                                            className='bg-gray-100 outline-none text-sm flex-1'
                                        />
                                        {
                                            errors.Password && touched.Password ? (
                                                <p className='text-red-500 absolute text-sm mt-8 ml-8'>{errors.Password}</p>
                                            ) : null
                                        }
                                    </div>
                                    <div className='bg-gray-100 w-80 p-2 flex items-center mb-2'>
                                        <FaLock className='text-gray-400 m-2' />
                                        <input
                                            type="password"
                                            name="ConfirmPassword"
                                            placeholder='Confirm Password'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.ConfirmPassword}
                                            required={true}
                                            autocomplete="on"
                                            className='bg-gray-100 outline-none text-sm flex-1'
                                        />
                                        {
                                            errors.ConfirmPassword && touched.ConfirmPassword ? (
                                                <p className='text-red-500 absolute text-sm mt-8 ml-8'>{errors.ConfirmPassword}</p>
                                            ) : null
                                        }
                                    </div>
                                    <div className=" w-80 flex justify-around items-center mb-2">
                                        <div className='mr-5'>
                                            <label className='font-bold text-green-500 '>
                                                <input
                                                    name="Role"
                                                    onChange={handleChange}
                                                    component="input"
                                                    type="radio"
                                                    value="Admin"
                                                    class="mr-1"
                                                />
                                                Admin
                                            </label>
                                        </div>
                                        <div>
                                            <label className='font-bold text-green-500'>
                                                <input
                                                    onChange={handleChange}
                                                    name="Role"
                                                    component="input"
                                                    type="radio"
                                                    value="User"
                                                    class="mr-1"
                                                />
                                                User
                                            </label>
                                        </div>
                                    </div>
                                    <button
                                        type='submit'
                                        className='border-2 border-green-500 text-green-500 rounded-full px-12 py-2 inline-block font-semibold hover:bg-green-500 hover:text-white'
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className='w-2/5 bg-green-500 text-white rounded-tr-2xl rounded-br-2xl py-36 px-12'>
                        <h2 className='text-3xl font-bold mb-2'>Hello!</h2>
                        <div className='border-2 w-10 border-white inline-block mb-2'></div>
                        <p className='mb-10'>
                            Login Here
                        </p>
                        <a
                            href='/'
                            className='border-2 border-white rounded-full px-12 py-2 inline-block font-semibold hover:bg-white hover:text-green-500'
                        >
                            Login
                        </a>
                    </div>
                </div>
            </main>
        </div>
    )
}
export default SignUpForm;


const styles = {

}