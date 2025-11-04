import type { ConfirmToken, UserRegistrationForm } from "@/types/index";
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

export async function confirmAccountApi(token: ConfirmToken) {
  try {
    const url = "auth/confirm-account";
    const { data } = await api.post<string>(url, token);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}

export async function requestConfirmationCode(formData: ConfirmToken) {
  try {
    const url = "auth/request-code";
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
// auth / request - code;
