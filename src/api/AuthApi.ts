import type { UserRegistrationForm } from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function createAccountApi(formatData: UserRegistrationForm) {
  try {
    const url = "auth/create-account";
    const { data } = await api.post<string>(url, formatData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
