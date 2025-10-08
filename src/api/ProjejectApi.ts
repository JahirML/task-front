import api from "@/lib/axios";
import { dashboardProjectSchema, type ProjectFormData } from "../types";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
  try {
    const { data } = await api.post("/projects", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}

export async function getProjects() {
  try {
    const { data } = await api("/projects");
    const res = dashboardProjectSchema.safeParse(data);
    if (res.success) {
      return res.data;
    }
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}
