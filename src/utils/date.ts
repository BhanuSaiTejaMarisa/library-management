export function getCurrentDateTime(): string {
  const now = new Date();

  return now.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
  });
}
