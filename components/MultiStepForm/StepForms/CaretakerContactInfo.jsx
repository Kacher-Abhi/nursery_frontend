"use client";
import NavButtons from "@/components/FormInputs/NavButtons";
import SelectInput from "@/components/FormInputs/SelectInput";
import TextInput from "@/components/FormInputs/TextInput";
import {
    setCurrentStep,
    updateCaretakerFormData,
    updateFormData,
} from "@/redux/slices/onboardingCaretakerSlice";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { updateCurrentStep } from "@/redux/slices/NurserySlice";


export default function CaretakerContactInfo({ setEmail }) {
    const currentStep = useSelector((store) => store.nursery.currentStep);
    const formData = useSelector((store) => store.createCaretaker.formData);
    const nurseryId = useSelector((store) => store.nursery.nurseryId);

    console.log(formData, currentStep);
    const [loading, setLoading] = useState(false);
    const {
        register,
        reset,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            ...formData,
        },
    });

    const createCaretaker = async (data) => {
        try {
            const formData = new FormData();
            formData.append('nurseryId', nurseryId);  // Fix typo in 'nurseryId'
            for (const key in data) {
                formData.append(key, data[key]);
            }
            const response = await axios.post(`${process.env.API_HOST}/caretakers/createCaretaker`, formData, {
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json;charset=utf-8',
                },
            });

            return { flag: true, message: 'Caretaker Created' };
        } catch (error) {
            console.error('An error occurred:', error.response.data);
            return { flag: false, message: error.response.data };
        }
    };


    const dispatch = useDispatch();
    async function processData(data) {
        const { flag, message } = await createCaretaker(data);
        setEmail(data['email'])
        if (flag) {
            dispatch(updateCaretakerFormData(data));
            dispatch(updateCurrentStep(currentStep + 1));
            toast.success(message);
        } else {
            toast.error(message);
        }
    }
    return (
        <form className="px-12 py-4" onSubmit={handleSubmit(processData)}>
            <div className="mb-8">
                <h5 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Caretaker Contact Info
                </h5>
                <p>Please provide your email and phone number.</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">

                <TextInput
                    label="Email Address"
                    name="email"
                    type="email"
                    register={register}
                    errors={errors}
                />
                <TextInput
                    label="Phone Number"
                    name="phoneNumber"
                    register={register}
                    errors={errors}
                />
                <TextInput
                    label="Password"
                    name="password"
                    type="password"
                    register={register}
                    errors={errors}
                />
            </div>

            <NavButtons />
        </form>
    );
}
