export const timestampToBirthday = (timestamp: number): string => {
  const date = new Date(timestamp as number);
  return date.toLocaleDateString('es-PE', { month: 'long', day: 'numeric' });
};
