/** Converte os issues de um ZodError em um mapa { campo: mensagem } (1 por campo). */
export function fieldErrorsFromIssues(
  issues: ReadonlyArray<{ path: ReadonlyArray<string | number>; message: string }>,
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === 'string' && !out[key]) out[key] = issue.message;
  }
  return out;
}
