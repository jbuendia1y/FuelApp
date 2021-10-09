export const computeKmRecorrido = (formData: any, lastFormDoc?: any) => {
  if (lastFormDoc) return formData.horometro - lastFormDoc.horometro;
  return 0;
};

export const computePagoTotal = (precioPorGalon: number, galones: number) => {
  const pagoTotal = precioPorGalon * galones;
  return parseFloat(pagoTotal.toFixed(2));
};

export const computePagoPorKm = (kmRecorrido: number, pagoTotal: number) => {
  const pagoPorKm = kmRecorrido === 0 ? 0 : pagoTotal / kmRecorrido;
  return parseFloat(pagoPorKm.toFixed(2));
};

export const computeKmPorGalon = (kmRecorrido: number, galones: number) => {
  const kmPorGalon = kmRecorrido / galones;
  return parseFloat(kmPorGalon.toFixed(2));
};
