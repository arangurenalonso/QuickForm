export const applyTemplate = (
  template: string,
  vars: Record<string, string | number>
) =>
  template.replace(/\{(\w+)\}/g, (_, key) => String(vars[key] ?? `{${key}}`));
