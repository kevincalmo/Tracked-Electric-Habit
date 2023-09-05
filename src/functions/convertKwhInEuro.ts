export function convertKwhInEuro(conso: number) {
  return (conso * 0.7952).toPrecision(3);
}
