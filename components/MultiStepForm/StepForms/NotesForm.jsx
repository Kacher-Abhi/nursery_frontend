"use client";
import NavButtons from "@/components/FormInputs/NavButtons";
import SelectInput from "@/components/FormInputs/SelectInput";
import TextInput from "@/components/FormInputs/TextInput";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { setCurrentStep, updateNotesFormData } from "@/redux/slices/NotesSlice";

export default function NotesForm({ setEmail }) {
  const currentStep = useSelector((store) => store.createNotes.currentStep);
  const formData = useSelector((store) => store.createNotes.formData);
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

  const createNotes = async (data) => {
    try {
      const formData = new FormData();
      formData.append("nurseryId", nurseryId); // Fix typo in 'nurseryId'
      for (const key in data) {
        formData.append(key, data[key]);
      }
      const response = await axios.post(
        `${process.env.API_HOST}/notes/createNotes`,
        formData,
        {
          headers: {
            accept: "application/json",
            "content-type": "application/json;charset=utf-8",
          },
        }
      );

      return { flag: true, message: "Notes Created" };
    } catch (error) {
      console.error("An error occurred:", error.response.data);
      return { flag: false, message: error.response.data };
    }
  };

  const dispatch = useDispatch();
  async function processData(data) {
    const { flag, message } = await createNotes(data);
    if (flag) {
      dispatch(updateNotesFormData(data));
      dispatch(setCurrentStep(currentStep + 1));
      toast.success(message);
    } else {
      toast.error(message);
    }
  }
  return (
    <form className="px-12 py-4" onSubmit={handleSubmit(processData)}>
      <div className="mb-8">
        <h5 className="text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Add Notes For Patients
        </h5>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        <TextInput
          label="Add Notes"
          name="notes"
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
          label="Notes Taken Date"
          type="date"
          name="date"
          register={register}
          errors={errors}
        />

        <TextInput
          label="Notes Taken Time"
          type="time"
          name="time"
          register={register}
          errors={errors}
        />
      </div>

      <NavButtons />
    </form>
  );
}
