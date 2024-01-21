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
import ImageUploader from "./ImageUploader"
import axios from "axios";
import toast from "react-hot-toast";
import ImageInput from "@/components/FormInputs/ImageInput";

// components\MultiStepForm\StepForms\ImageUploader

export default function NurseryCreationForm({setNursery}) {
  const currentStep = useSelector((store) => store.onboarding.currentStep);
  const formData = useSelector((store) => store.onboarding.formData);
  console.log(formData, currentStep);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
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

  const handleImageChange = (imageFile) => {
    // Handle the selected image file, you can save it in your form state or perform other actions
    console.log('Selected Image:', imageFile);
    setSelectedImage(imageFile);
  };

  const createNursery = async (data, imageFile) => {
    try {
      const formData = new FormData();
      formData.append('image', imageFile)
      for (const key in data) {
        formData.append(key, data[key]);
      }
      const response = await axios.post(`http://localhost:8080/nurseries/createNursery`, formData);
      setNursery(data['nurseryId'])
      return {flag : true, message : "Nursery Created"};
    } catch (error) {
      console.error('An error occurred:', error.response.data);
      return {flag : false, message : error.response.data};
    }
  };

  const dispatch = useDispatch();
  async function processData(data) {

    const {flag, message} = await createNursery(data, selectedImage);

    if(flag){
      dispatch(updateFormData(data));
      dispatch(setCurrentStep(currentStep + 1));
      toast.success(message);
    }else{
      toast.error(message);
    }  
  }
  
  return (
    <form className="px-12 py-4" onSubmit={handleSubmit(processData)}>
      <div className="mb-8">
        <h5 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Nursery Info
        </h5>
        <p className="text-small md:text-small dark:text-white">Please provide your name,email address,and phone number.</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">

        <TextInput
          label="Nursery Id"
          name="nurseryId"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Nursery Name"
          name="nurseryName"
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
          label="Primary Color"
          name="primaryColor"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Secondary Color"
          name="secondaryColor"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Address"
          name="address"
          register={register}
          errors={errors}
        />
        <TextInput
          label="State"
          name="state"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Zipcode"
          name="zipcode"
          register={register}
          errors={errors}
        />
        {/* <ImageInput
          label = "Choose your Logo"
          imageUrl = ""
          setImageUrl
          className = "col-span-full"
          endpoint = ""

     /> */}
      <ImageUploader onImageChange={handleImageChange} label="Nursery Logo"/>
      </div>

      <NavButtons />
    </form>
  );
}
