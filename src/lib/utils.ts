import dayjs from "dayjs";

export const encode = (data: any) => {
  return btoa(encodeURIComponent(JSON.stringify(data)));
};

export const decode = (data: string) => {
  if (!data) return null;
  return JSON.parse(decodeURIComponent(atob(data)));
};

export const customSessionStorage = {
  getItem: (name: string) => {
    const storedValue = sessionStorage.getItem(name);
    return storedValue ? decode(storedValue) : null;
  },
  setItem: (name: string, value: any) => {
    sessionStorage.setItem(name, encode(value));
  },
  removeItem: (name: string) => {
    sessionStorage.removeItem(name);
  },
};

export const formatTimestamp = (timestamp: number) => {
  const date = dayjs(timestamp);
  return date.isSame(dayjs(), "day") ? "Today" : date.format("DD-MM-YYYY");
};
