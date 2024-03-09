"use client";
import NavButtons from "@/components/FormInputs/NavButtons";
import SelectInput from "@/components/FormInputs/SelectInput";
import TextInput from "@/components/FormInputs/TextInput";
import {
  setCurrentStep,
  updateFormData,
} from "@/redux/slices/onboardingStudentsSlice";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";


export default function AdminCreationForm({ setEmail, nursery }) {
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const formData = useSelector((store) => store.onboarding.formData);
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
  });

  const createAdmin = async (data) => {
    try {
      const formData = new FormData();
      formData.append('nurseryId', nursery);  // Fix typo in 'nurseryId'
      for (const key in data) {
        formData.append(key, data[key]);
      }
      const response = await axios.post(`${process.env.API_HOST}/admins/createAdmin`, formData, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json;charset=utf-8',
          'Authorization': Cookies.get('jwt'),
          'tenant': 'nurs77'
        },
      });

      return { flag: true, message: 'Admin Created' };
    } catch (error) {
      console.error('An error occurred:', error.response.data);
      return { flag: false, message: error.response.data };
    }
  };

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
    const { flag, message } = await createAdmin(data);
    setEmail(data['email'])
    if (flag) {
      dispatch(updateFormData(data));
      dispatch(setCurrentStep(currentStep + 1));
      toast.success(message);
    } else {
      toast.error(message);
    }
  }
  return (
    <form className="px-12 py-4" onSubmit={handleSubmit(processData)}>
      <div className="mb-8">
        {nursery}
        <h5 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Admin Info
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
          label="Email Address"
          name="email"
          type="email"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Phone Number"
          name="phone_number"
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
        {/* <TextInput
          label="Date of Birth"
          type="date"
          name="dob"
          register={register}
          errors={errors}
        /> */}
        <SelectInput
          label="Select your Gender"
          name="sex"
          register={register}
          options={gender}
        />
      </div>

      <NavButtons />
    </form>
  );
}
