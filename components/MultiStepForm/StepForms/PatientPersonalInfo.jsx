"use client";
import NavButtons from "@/components/FormInputs/NavButtons";
import SelectInput from "@/components/FormInputs/SelectInput";
import TextInput from "@/components/FormInputs/TextInput";
import {
  setCurrentStep,
  updateFormData,
  updatePatientFormData,
} from "@/redux/slices/onboardingPatientSlice";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";


export default function PatientPersonalINfo({ setEmail, nursery }) {
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const formData = useSelector((store) => store.onboarding.formData);
  const nurseryId = useSelector((store) => store.nursery.nurseryId);

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

  const createPatient = async (data) => {
    try {
      const formData = new FormData();
      formData.append('nurseryId', nurseryId);  // Fix typo in 'nurseryId'
      for (const key in data) {
        if(key.dob){
            continue;
        }
        formData.append(key, data[key]);
      }
      const response = await axios.post(`${process.env.API_HOST}/patients/createPatient`, formData, {
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json;charset=utf-8',
        },
      });

      return { flag: true, message: 'Patient Created' };
    // console.log("Patient created");
    } catch (error) {
      // console.error('An error occurred:', error.message);
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
    const age = calculateAge(data.dob);
    const newData = { ...data, age };
    const { flag, message } = await createPatient(newData);
    setEmail(data['email'])
    if (flag) {
      dispatch(updatePatientFormData(newData));
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
          Patient Info
          
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
      </div>

      <NavButtons />
    </form>
  );
}
