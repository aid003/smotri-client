import { useAnkets } from "@/hooks/useListFilmsAnket";

const Searcher = async () => {
  const ankets = await useAnkets()

  return (
    <div>
      {ankets.map((el) => (
        <p key={el.title}>{el.title}</p>
      ))}
    </div>
  );
};

export default Searcher;
