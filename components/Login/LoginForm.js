'use client'
import { setEmail, setNurseryId } from '@/redux/slices/CurrentUserSlice';
import { store } from '@/redux/store';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

const LoginForm = ({ nursery }) => {
    const nuseryId = useSelector((store) => store.currentUser.nurseryId);
    const dispatch = useDispatch();
    const router = useRouter();
    useEffect(()=>{
        dispatch(setNurseryId(nursery.nurseryId))
    },[])
    const initialValues = {
        nurseryId: nursery.nurseryId,
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,'Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
    });

    const onSubmit = async (values, { setSubmitting, resetForm }) => {
        // Handle form submission here
        console.log("nurseryId",nuseryId)
        console.log(values, "values");
        setSubmitting(false);
        try {
            const formData = new FormData();
            formData.append('nurseryId', values.nurseryId);
            formData.append('username', values.email);
            formData.append('password', values.password);


            const response = await fetch('http://localhost:8080/auth/token', {
                method: 'POST',
                body: formData,
            });




            if (response.ok) {
                const data = await response.json();
                const { token, expires, role } = data;
                dispatch(setEmail(values.email));
                // Store the token and role in cookies
                Cookies.set('jwt', token,{expires: 1/24});
                Cookies.set('role', role, {expires: 1/24});
                toast.success("Login Successful");
                resetForm({
                    values: {
                        nurseryId: values.nurseryId,
                        email: '',
                        password: '',
                    },
                });
                router.push("/")
            } else {
                toast.error(await response.text())
                dispatch(setNurseryId(""))
                resetForm({
                    values: {
                        nurseryId: values.nurseryId,
                        email: '',
                        password: '',
                    },
                });
                console.log("after",nuseryId)
            }
        } catch (error) {
            // Handle login error
            console.error('Login failed:', error);
        }
    };


    return (
        <>
        <Toaster/>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                <img
                src={`data:image/png;base64, ${nursery.image}`}
                alt="Nursery Logo"
                className="nursery-logo"
            />
                    <div className="block mb-2">
                        <label  htmlFor="email">NurseryId:</label>
                        <Field className="w-full mt-1 p-2 border border-gray-300 rounded-md" type="text" id="nurseryId" name="nurseryId" disabled={true} />
                    </div>
                    <div className="block mb-2">
                        <label htmlFor="email">Email:</label>
                        <Field className="w-full mt-1 p-2 border border-gray-300 rounded-md" type="email" id="email" name="email" />
                        <ErrorMessage className='text-red-600' name="email" component="div" />
                    </div>

                    <div className="block mb-2">
                        <label htmlFor="password">Password:</label>
                        <Field className="w-full mt-1 p-2 border border-gray-300 rounded-md" type="password" id="password" name="password" />
                        <ErrorMessage className='text-red-600' name="password" component="div" />
                    </div>

                    <button
                        type='submit'
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Login
                    </button>
                </Form>
            </Formik>
        </>

    );
};

export default LoginForm;