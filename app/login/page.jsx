// pages/login.js
'use client'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';

const LoginPage = ({ params }) => {
    const router = useRouter();
    const initialValues = {
        nurseryId: ''
    };

    const validationSchema = Yup.object({
        nurseryId: Yup.string().min(6, "NurseryId should be a minimum of 6 Characters").required("Required")
    });
    const onSubmit = async (values, { resetForm }) => {
        const response = await fetch(`/api/nursery/${values.nurseryId}`);
        if (response.ok) {
            toast.success("Nursery Id was matched, please continute to login")
            router.push("/login/" + values.nurseryId)
        }
        else {
            toast.error("Nursery not found with ID: "+ values.nurseryId)
            resetForm({
                values: {
                    nurseryId: ''
                }
            })
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
                        <label htmlFor="email">NurseryId:</label>
                        <Field className="w-full mt-1 p-2 border border-gray-300 rounded-md" type="text" id="nurseryId" name="nurseryId" />
                        <ErrorMessage className='text-red-600' name="nurseryId" component="div" />

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

export default LoginPage;
