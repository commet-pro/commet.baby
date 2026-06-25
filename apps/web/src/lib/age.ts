/** Rótulo amigável de idade a partir de uma data ISO (YYYY-MM-DD). Ex.: "8 meses", "1 ano e 2 meses". */
export function ageLabel(birthDate: string): string {
  const birth = new Date(birthDate);
  if (Number.isNaN(birth.getTime())) return '';

  const now = new Date();
  let months = (now.getFullYear() - birth.getFullYear()) * 12 + (now.getMonth() - birth.getMonth());
  if (now.getDate() < birth.getDate()) months -= 1;
  months = Math.max(0, months);

  const years = Math.floor(months / 12);
  const rem = months % 12;

  if (years === 0) return `${months} ${months === 1 ? 'mês' : 'meses'}`;
  const yearLabel = `${years} ${years === 1 ? 'ano' : 'anos'}`;
  if (rem === 0) return yearLabel;
  return `${yearLabel} e ${rem} ${rem === 1 ? 'mês' : 'meses'}`;
}
