export const formatBytes = (bytes: number, precision = 2) => {
  // Handle the case where bytes might be null or undefined
  if (bytes === null || bytes === undefined) return "N/A";

  // If bytes is 0 or falsy, return '0 Bytes'
  if (!+bytes) return "0 Bytes";

  const base = 1024; // Base for conversion between units (1024 for binary units like MiB, GiB)
  const dm = precision < 0 ? 0 : precision; // Ensure decimals is not negative
  const units = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]; // Units array

  // Calculate the appropriate unit index
  const unitIndex = Math.floor(Math.log(bytes) / Math.log(base));

  // Calculate and format the size
  const formattedSize = (bytes / Math.pow(base, unitIndex)).toFixed(dm);

  return `${parseFloat(formattedSize)} ${units[unitIndex]}`;
};
