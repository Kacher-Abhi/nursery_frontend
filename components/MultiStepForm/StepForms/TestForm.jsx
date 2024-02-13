"use client";
import NavButtons from "@/components/FormInputs/NavButtons";
import SelectInput from "@/components/FormInputs/SelectInput";
import TextInput from "@/components/FormInputs/TextInput";
import {
  setCurrentStep,
  updateTestFormData,
} from "@/redux/slices/TestSlice";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import ImageUploader from "./ImageUploader";

export default function TestForm({ nursery }) {
  const currentStep = useSelector((store) => store.createTest.currentStep);
  const formData = useSelector((store) => store.createTest.formData);
  const nurseryId = useSelector((store) => store.nursery.nurseryId);
  const [selectedTestResultImage, setSelectedTestResultImage] = useState(null);
  const [selectedPrescriptionImage, setSelectedPrescriptionImage] = useState(null);

  console.log(formData, currentStep);
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const handleTestResultImageChange = (imageFile) => {
    // Handle the selected image file, you can save it in your form state or perform other actions
    // console.log("Selected Image:", imageFile.name);
    setSelectedTestResultImage(imageFile);
  };

  const handlePrescriptionImageChange = (imageFile) => {
    // Handle the selected image file, you can save it in your form state or perform other actions
    // console.log("Selected Image:", imageFile.name);
    setSelectedPrescriptionImage(imageFile);
  };

  const createTest = async (data, testResult, description) => {
    try {
        const formData = new FormData();
        // formData.append('nurseryId', nurseryId);
        formData.append('nurseryId', nurseryId);  // Fix typo in 'nurseryId'
        formData.append('testResult', selectedTestResultImage);
        formData.append('description', selectedPrescriptionImage);
        for (const key in data) {
          formData.append(key, data[key]);
        }

        console.log("FormData:", formData);

        const response = await axios.post(
            "http://localhost:8080/tests/createTest",
            formData);

        return { flag: true, message: "Test Added" };
    } catch (error) {
        return { flag: false, message: error.response.data };
    }
};

  const dispatch = useDispatch();
  async function processData(data) {
    const { flag, message } = await createTest(data, selectedTestResultImage, selectedPrescriptionImage);
    if (flag) {
      dispatch(updateTestFormData(data));
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
          Test Details
        </h5>
        <p>Please provide the nesessary details.</p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <TextInput
          label="Test Name"
          name="testName"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Result"
          name="result"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Patient Id"
          name="patientId"
          register={register}
          errors={errors}
        />
        <TextInput
          label="Caretaker Id"
          name="caretakerId"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Test Taken Date"
          type="date"
          name="testTakenDate"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Test Taken Time"
          type="time"
          name="testTakenTime"
          register={register}
          errors={errors}
        />

        <ImageUploader
          onImageChange={handleTestResultImageChange}
          label="Test Result"
          name="testResult"
        />

        <ImageUploader
          onImageChange={handlePrescriptionImageChange}
          label="Description"
          name="prescription"
        />
      </div>

      <NavButtons />
    </form>
  );
}
