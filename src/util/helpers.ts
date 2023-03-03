export const debounce = (func: any, wait: any) => {
  let timeout: NodeJS.Timeout;
  return function mainFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};