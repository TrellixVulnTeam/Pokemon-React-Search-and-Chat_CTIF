export const Capitalise = (string) => {
  const cap = string.charAt(0).toUpperCase();
  const rest = string.slice(1);
  const newName = cap + rest;
  return newName;
};
