import Film from "@/components/Film/filmItem/Film";
import PreviewPlayer from "@/components/previewPlayer/PreviewPlayer";
import { customFetch } from "@/middleware/customFetch";

export async function getData(params) {
  const film = await customFetch(
    `${process.env.NEXT_PUBLIC_SERVER_PATH}get-film?title=${params.slug}`
  );
  return film;
}

const Page = async ({ params }) => {
  const { data } = await getData(params)


  return (
    <>
      <p>{data.title}</p>
      <PreviewPlayer></PreviewPlayer>
    </>
  );
};

export default Page;
