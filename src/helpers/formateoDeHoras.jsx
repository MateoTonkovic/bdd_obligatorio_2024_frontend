export const formatearHoraHHMM = (hora) => {
  return `${Math.floor(hora / 10000)}:${(hora % 10000) / 100}`;
};
