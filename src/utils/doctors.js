import { cloneDeep } from "./common";
import { PHONE_NUMBER } from "../constants/regex";

export const checkFormErrors = (formData) => {
  return Boolean(Object.values(formData).find(({ error }) => error));
};

export const getDoctorInitialFormData = () => {
  return {
    firstName: {
      error: false,
      value: "",
      errorMessage: "",
    },
    lastName: {
      error: false,
      value: "",
      errorMessage: "",
    },
    contact: {
      error: false,
      value: "",
      errorMessage: "",
    },
    share: {
      error: false,
      value: "",
      errorMessage: "",
    },
  };
};

export const prepareDoctorPayload = (formData) => {
  return {
    firstName: formData.firstName.value,
    lastName: formData.lastName.value,
    contact: formData.contact.value,
    defaultShare: formData.share.value,
  };
};
export const validateDoctorForm = (formData) => {
  const updatedFormData = cloneDeep(formData);

  // Resetting error messages before validations
  Object.keys(updatedFormData).forEach((key) => {
    updatedFormData[key].error = false;
    updatedFormData[key].errorMessage = "";
  });

  if (!updatedFormData.firstName.value) {
    updatedFormData.firstName.error = true;
    updatedFormData.firstName.errorMessage = "First name is required";
  }

  if (!updatedFormData.lastName.value) {
    updatedFormData.lastName.error = true;
    updatedFormData.lastName.errorMessage = "Last name is required";
  }

  if (!updatedFormData.contact.value) {
    updatedFormData.contact.error = true;
    updatedFormData.contact.errorMessage = "Contact is required";
  } else if (!PHONE_NUMBER.test(updatedFormData.contact.value)) {
    updatedFormData.contact.error = true;
    updatedFormData.contact.errorMessage = "Incorrect contact number";
  }

  if (!updatedFormData.share.value) {
    updatedFormData.share.error = true;
    updatedFormData.share.errorMessage = "Share % is required";
  } else if (!(updatedFormData.share.value > 0 && updatedFormData.share.value < 100)) {
    updatedFormData.contact.error = true;
    updatedFormData.contact.errorMessage = "Share % should be between 0-100";
  }

  return {
    formData: updatedFormData,
    hasErrors: checkFormErrors(updatedFormData),
  };
};
