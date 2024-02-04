'use client'
const { Field, Form, Formik, ErrorMessage } = require("formik")
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import * as Yup from 'yup'

const ResetPassword = ({ params }) => {
    const initialValues = {
        email: ''
    }
    const validationSchema = Yup.object({
        email: Yup.string().required("Required").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email address')
    });
    const onSubmit=async(values,{resetForm})=>{
        const formData = new FormData();
        formData.append("nurseryId", params.nurseryId);
        formData.append("email", values.email)
        const response = await fetch(`/api/auth/reset`,{method:'post',body: formData})
        if(response.ok){
            toast.success(`User found in our records, reset password link will be sent to the email ${values.email}`)
            resetForm({
                values:{
                    email:''
                }
            })
        }
        else{
            toast.error(await resposne.text())
        }
    }
    return (
        <>
            <Toaster/>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
            >
                <Form className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
                    <div className="block mb-2">
                        <p>Reset Password: A password reset Link shall be sent to the email provided below</p>
                        <label className='mt-3' htmlFor='email'>Email:</label>
                        <Field className="w-full mt-1 p-2 border border-gray-300 rounded-md" id="email" name="email" type="email" required />
                        <ErrorMessage className='text-red-600' name='email' component="div" />
                    </div>
                    <div className="block mb-2">
                        <p>Reset Password: A password reset Link shall be sent to the email provided below</p>
                        <label className='mt-3' htmlFor='email'>Email:</label>
                        <Field className="w-full mt-1 p-2 border border-gray-300 rounded-md" id="email" name="email" type="email" required />
                        <ErrorMessage className='text-red-600' name='password' component="div" />
                    </div>
                    <button
                        type='submit'
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Send
                    </button>
                </Form>
            </Formik>
        </>
    )
}
export default ResetPassword;