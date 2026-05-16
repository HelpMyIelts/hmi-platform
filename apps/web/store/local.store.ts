export const localStore = {
  getItem: (name: string) => {
    const str = typeof window !== 'undefined' ? localStorage.getItem(name) : null;
    if (!str) return null;
    try {
      return JSON.parse(str);
    } catch (e) {
      return null;
    }
  },
  setItem: (name: string, value: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(name, JSON.stringify(value));
    }
  },
  removeItem: (name: string) => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(name);
    }
  },
};
