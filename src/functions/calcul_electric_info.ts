export const calculElectricInfo = (data: number[]) => {
  return data.reduce((a: any, b: any) => a + b, 0);
};
