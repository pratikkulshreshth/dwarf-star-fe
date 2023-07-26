import { useState } from "react";
import { cloneDeep } from "./common";

export const useFormData = (initialFormData) => {
  const [formData, setFormData] = useState(initialFormData);

  const onChangeFormData = (field) => (e) => {
    const updatedFormData = cloneDeep(formData);

    setFormData({
      ...updatedFormData,
      [field]: {
        ...updatedFormData[field],
        value: e.target.value,
      },
    });
  };

  return [formData, setFormData, onChangeFormData];
};
