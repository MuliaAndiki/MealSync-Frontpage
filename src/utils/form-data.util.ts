export function flattenToFormData(obj: Record<string, any>, form?: FormData): FormData {
  const formData = form || new FormData();

  const fileFields = ['pictProduct', 'fotoProfile'];

  function flatten(current: any) {
    for (const key in current) {
      if (!Object.prototype.hasOwnProperty.call(current, key)) continue;

      const value = current[key];
      if (value === undefined || value === null) continue;

      const isFile = value instanceof File || value instanceof Blob;

      if (isFile && fileFields.includes(key)) {
        formData.append(key, value);
      } else if (typeof value === 'object' && !(value instanceof Date)) {
        flatten(value);
      } else if (value instanceof Date) {
        formData.append(key, value.toISOString());
      } else {
        formData.append(key, value);
      }
    }
  }

  flatten(obj);
  return formData;
}
