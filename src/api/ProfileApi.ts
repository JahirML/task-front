import { isAxiosError } from "axios";
import type { UserProfileForm } from "../types";
import api from "@/lib/axios";

export const updateProfile = async (formData: UserProfileForm) => {
  try {
    const { data } = await api.put<string>("/auth/profile", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
