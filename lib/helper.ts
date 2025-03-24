export function formatDate(date: number | Date | undefined){
  const newDate = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
  }).format(date)
  return newDate
}