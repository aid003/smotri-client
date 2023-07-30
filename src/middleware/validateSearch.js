import { useAnkets } from "../hooks/useListFilmsAnket";


export const ValidateSearch = async (usersString) => {
  const ankets = await useAnkets();
  const userValue = usersString;

  if (!userValue || !ankets) {
    throw new Error("Не введены параметры для поиска");
  }
  console.log(ankets, userValue);

  let result = ''
  for (const anket of ankets) {
    if(anket.title.t)
  }


};
