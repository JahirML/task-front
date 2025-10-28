import { isAxiosError } from "axios";
import {
  type TaskFormData,
  type Project,
  type Task,
  taskSchema,
} from "./../types/index";
import api from "@/lib/axios";

type TaskApi = {
  formData: TaskFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
};

export async function createTask({
  projectId,
  formData,
}: Pick<TaskApi, "formData" | "projectId">) {
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

export async function getTaskById({
  projectId,
  taskId,
}: Pick<TaskApi, "projectId" | "taskId">) {
  try {
    const url = `projects/${projectId}/tasks/${taskId}`;
    const { data } = await api(url);
    const response = taskSchema.safeParse(data);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.error);
    }
  }
}

export async function updateTask({
  projectId,
  taskId,
  formData,
}: Pick<TaskApi, "projectId" | "taskId" | "formData">) {
  try {
    const url = `projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.put<string>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.error);
    }
  }
}

export async function deleteteTask({
  taskId,
  projectId,
}: Pick<TaskApi, "taskId" | "projectId">) {
  try {
    const url = `projects/${projectId}/tasks/${taskId}`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.message) {
      throw new Error(error.response?.data.error);
    }
  }
}
