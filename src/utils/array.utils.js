export const fList = (list, func = i => i) => {
  if (!Array.isArray(list)) return [];

  return list.map(func);
};
