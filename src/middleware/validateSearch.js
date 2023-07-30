import { useAnkets } from "../hooks/useListFilmsAnket";

export const ValidateSearch = async (usersString, anketsData) => {
  const ankets = anketsData;
  const userValue = usersString;

  if (!userValue || !ankets) {
    throw new Error("Не введены параметры для поиска");
  }

  const result = [];

  for (const anket of ankets) {
    if (anket.title.toLowerCase().indexOf(userValue.toLowerCase()) !== -1) {
      result.push(anket);
    }
  }

  return result;
};
