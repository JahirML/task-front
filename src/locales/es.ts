export const statusTranslations: { [key: string]: string } = {
  pending: "Pendiente",
  onHold: "En espera",
  inProgress: "En Progreso",
  underReview: "En revision",
  completed: "Completado",
};

export const statusColors: { [key: string]: string } = {
  pending: "border-t-slate-500",
  onHold: " border-t-red-500 ",
  inProgress: "border-t-blue-500",
  underReview: "border-t-amber-400",
  completed: "border-t-emerald-500",
};
