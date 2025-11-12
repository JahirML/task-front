import {
  TeamMembersSchema,
  type Project,
  type TeamMember,
  type TeamMemberForm,
} from "./../types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export const findUserByEmail = async ({
  projectId,
  formData,
}: {
  projectId: Project["_id"];
  formData: TeamMemberForm;
}) => {
  try {
    const url = `/projects/${projectId}/team/find`;
    const { data } = await api.post(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const addUserToProject = async ({
  projectId,
  id,
}: {
  projectId: Project["_id"];
  id: TeamMember["_id"];
}) => {
  try {
    const url = `/projects/${projectId}/team`;
    const { data } = await api.post(url, { id });
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getmembers = async (projectId: Project["_id"]) => {
  try {
    const url = `/projects/${projectId}/team`;
    const { data } = await api.get(url);
    const response = TeamMembersSchema.safeParse(data);
    if (response.success) return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const removeUser = async ({
  projectId,
  id,
}: {
  projectId: Project["_id"];
  id: TeamMember["_id"];
}) => {
  try {
    const url = `/projects/${projectId}/team/${id}`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
