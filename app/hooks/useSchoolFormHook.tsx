import { useState } from "react";
// import { SchoolFormData } from "../interfaces";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useRouter } from "next/navigation";

// Zod schema for form validation
const schoolFormSchema = z.object({
  schoolName: z
    .string()
    .min(1, "School name is required")
    .min(2, "School name must be at least 2 characters"),
  emailAddress: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  address: z
    .string()
    .min(1, "Address is required")
    .min(5, "Address must be at least 5 characters"),
  city: z
    .string()
    .min(1, "City is required")
    .min(2, "City must be at least 2 characters"),
  state: z
    .string()
    .min(1, "State is required")
    .min(2, "State must be at least 2 characters"),
  contactNumber: z
    .string()
    .min(1, "Contact number is required")
    .regex(/^[0-9+\-\s()]+$/, "Please enter a valid phone number")
    .min(10, "Contact number must be at least 10 digits"),
  schoolImage: z.any().optional(),
});

type SchoolFormData = z.infer<typeof schoolFormSchema>;

const useSchoolFormHook = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string>("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<SchoolFormData>({
    resolver: zodResolver(schoolFormSchema),
    mode: "onChange", // Validate on change for better UX
    defaultValues: {
      schoolName: "",
      emailAddress: "",
      address: "",
      city: "",
      state: "",
      contactNumber: "",
      schoolImage: null,
    },
  });

  // Watch the school image field to update the filename display
  const schoolImageFiles = watch("schoolImage");

  const onSubmit = async (data: SchoolFormData) => {
    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("schoolName", data.schoolName);
      formData.append("emailAddress", data.emailAddress);
      formData.append("address", data.address);
      formData.append("city", data.city);
      formData.append("state", data.state);
      formData.append("contactNumber", data.contactNumber);

      if (data.schoolImage && data.schoolImage.length > 0) {
        formData.append("schoolImage", data.schoolImage[0]);
      }

      const response = await fetch("/api/schools", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        router.push("/schools");
      }

      reset();
      setSelectedFileName("");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error adding school. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    setIsSubmitting,
    handleSubmit,
    onSubmit,
    schoolImageFiles,
    selectedFileName,
    register,
    control,
    errors,
    isValid,
    isDirty,
    setSelectedFileName,
  };
};

export default useSchoolFormHook;
