import { useMutation } from "@tanstack/react-query";

import { createProject as createProjectApi } from "@/api/ProjejectApi";

function useCreateProject() {
  const { mutate: createProject, isPending } = useMutation({
    mutationFn: createProjectApi,
  });
  return { createProject, isPending };
}

export default useCreateProject;
