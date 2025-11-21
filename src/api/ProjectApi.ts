import api from "@/lib/axios";
import {
  dashboardProjectSchema,
  editProjectSchema,
  projectSchema,
  type Project,
  type ProjectFormData,
} from "../types";
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

export async function getProjectById(id: Project["_id"]) {
  try {
    const { data } = await api(`/projects/${id}`);
    const response = projectSchema.safeParse(data);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}

export async function getPartialProjectById(id: Project["_id"]) {
  try {
    const { data } = await api(`/projects/${id}`);
    const response = editProjectSchema.safeParse(data);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}

export async function editProject(
  id: Project["_id"],
  formData: ProjectFormData,
) {
  try {
    const { data } = await api.put<string>(`/projects/${id}`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}

export async function deleteProject(id: Project["_id"]) {
  try {
    const { data } = await api.delete<string>(`/projects/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.error);
    }
  }
}
