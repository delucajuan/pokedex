export const formatPokemonName = (name: string): string => {
  return name
    .toLowerCase() // Convert the entire name to lowercase
    .replace(/-/g, ' ') // Replace all hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
};

export const capitalizeFirstLetter = (string: string): string => {
  if (string.length) {
    return string
      .toLowerCase() // Convert the entire string to lowercase
      .replace(/-/g, ' ') // Replace all hyphens with spaces
      .replace(/^\w/, (char) => char.toUpperCase()); // Capitalize the first letter
  }
  return string;
};
