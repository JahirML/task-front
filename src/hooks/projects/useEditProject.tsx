import { useMutation } from "@tanstack/react-query";

import { editProject as editProjectApi } from "@/api/ProjectApi";
import type { ProjectFormData } from "../../types";

type EditProjectVariables = {
  projectId: string;
  formData: ProjectFormData;
};

function useEditProject() {
  const { mutate: editProject, isPending } = useMutation({
    mutationFn: ({ projectId, formData }: EditProjectVariables) =>
      editProjectApi(projectId, formData),
  });
  return { editProject, isPending };
}

export default useEditProject;
