export function isDateInCurrentMonth(date: Date): boolean {
    const today = new Date();
    return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }