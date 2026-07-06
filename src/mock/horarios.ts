function addDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export const HORARIOS_DISPONIVEIS = [
  '08:00', '09:00', '10:00', '11:00',
  '13:00', '14:00', '15:00', '16:00', '17:00',
];

export const HORARIOS_OCUPADOS: { data: string; hora: string }[] = [
  { data: addDays(0), hora: '08:00' },
  { data: addDays(0), hora: '09:00' },
  { data: addDays(0), hora: '10:00' },
  { data: addDays(1), hora: '08:00' },
  { data: addDays(1), hora: '13:00' },
  { data: addDays(1), hora: '14:00' },
  { data: addDays(2), hora: '09:00' },
  { data: addDays(2), hora: '11:00' },
  { data: addDays(2), hora: '15:00' },
  // dia 3 completamente lotado
  { data: addDays(3), hora: '08:00' },
  { data: addDays(3), hora: '09:00' },
  { data: addDays(3), hora: '10:00' },
  { data: addDays(3), hora: '11:00' },
  { data: addDays(3), hora: '13:00' },
  { data: addDays(3), hora: '14:00' },
  { data: addDays(3), hora: '15:00' },
  { data: addDays(3), hora: '16:00' },
  { data: addDays(3), hora: '17:00' },
  { data: addDays(5), hora: '10:00' },
  { data: addDays(5), hora: '16:00' },
];

export function horariosOcupadosNoDia(data: string): string[] {
  return HORARIOS_OCUPADOS.filter((s) => s.data === data).map((s) => s.hora);
}

function hojeStr(): string {
  return new Date().toISOString().slice(0, 10);
}

function horaAtualStr(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
}

export function isHorarioPassado(data: string, hora: string): boolean {
  if (data !== hojeStr()) return false;
  return hora <= horaAtualStr();
}

export function isDiaLotado(data: string): boolean {
  const ocupados = horariosOcupadosNoDia(data);
  return HORARIOS_DISPONIVEIS.every((h) => ocupados.includes(h) || isHorarioPassado(data, h));
}

export function primeiroHorarioLivre(data: string): string | null {
  const ocupados = horariosOcupadosNoDia(data);
  return HORARIOS_DISPONIVEIS.find((h) => !ocupados.includes(h) && !isHorarioPassado(data, h)) ?? null;
}
