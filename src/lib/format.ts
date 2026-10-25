const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  dateStyle: "medium",
  timeStyle: "short",
});

export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}
