import { isAxiosError } from "axios";
import type { TaskFormData, Project } from "./../types/index";
import api from "@/lib/axios";

type TaskApi = {
  formData: TaskFormData;
  projectId: Project["_id"];
};

export async function createTask({ projectId, formData }: TaskApi) {
  try {
    const url = `/projects/${projectId}/tasks`;
    const { data } = await api.post<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.error);
    }
  }
}
