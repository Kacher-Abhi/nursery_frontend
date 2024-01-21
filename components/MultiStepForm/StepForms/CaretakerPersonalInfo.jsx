"use client";
import NavButtons from "@/components/FormInputs/NavButtons";
import SelectInput from "@/components/FormInputs/SelectInput";
import TextInput from "@/components/FormInputs/TextInput";
import {
    updateCaretakerFormData,
} from "@/redux/slices/onboardingCaretakerSlice";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { updateCurrentStep } from "@/redux/slices/NurserySlice";


export default function CaretakerPersonalInfo({ setEmail }) {
    const currentStep = useSelector((store) => store.nursery.currentStep);
    const formData = useSelector((store) => store.createCaretaker.formData);

    console.log(formData, currentStep);
    const [loading, setLoading] = useState(false);
    const gender = [
        {
            id: "male",
            title: "Male",
        },
        {
            id: "female",
            title: "Female",
        },
    ];
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

    function calculateAge(dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const currentDate = new Date();

        let age = currentDate.getFullYear() - dob.getFullYear();

        if (
            currentDate.getMonth() < dob.getMonth() ||
            (currentDate.getMonth() === dob.getMonth() && currentDate.getDate() < dob.getDate())
        ) {
            age--;
        }

        return age;
    }


    const dispatch = useDispatch();
    async function processData(data) {
        const age = calculateAge(data.dob);
        const name = data.firstName + data.lastName;
        const newData = { ...data, age,  name};

        dispatch(updateCaretakerFormData(newData));
        dispatch(updateCurrentStep(currentStep + 1));


    }
    return (
        <form className="px-12 py-4" onSubmit={handleSubmit(processData)}>
            <div className="mb-8">
                <h5 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Caretaker Info
                </h5>
                <p>Please provide your name,email address,and phone number.</p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">

                <TextInput
                    label="First Name"
                    name="firstName"
                    register={register}
                    errors={errors}
                />

                <TextInput
                    label="Last Name"
                    name="lastName"
                    register={register}
                    errors={errors}
                />
                <TextInput
                    label="Date of Birth"
                    type="date"
                    name="dob"
                    register={register}
                    errors={errors}
                />

                <SelectInput
                    label="Select your Gender"
                    name="sex"
                    register={register}
                    options={gender}
                />
                <TextInput
                    label="Years Of Experience"
                    name="yearsOfExperience"
                    type="number"
                    register={register}
                    errors={errors}
                />

                <TextInput
                    label="Designation"
                    name="designation"
                    register={register}
                    errors={errors}
                />
            </div>

            <NavButtons />
        </form>
    );
}
