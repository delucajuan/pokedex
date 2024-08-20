export const formatPokemonName = (name: string): string => {
  if (name?.length) {
    return name
      .toLowerCase() // Convert the entire name to lowercase
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize the first letter of each word
  }
  return name;
};

export const capitalizeFirstLetter = (string: string): string => {
  if (string?.length) {
    return string
      .toLowerCase() // Convert the entire string to lowercase
      .replace(/^\w/, (char) => char.toUpperCase()); // Capitalize the first letter
  }
  return string;
};
