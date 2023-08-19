import PreviewPlayer from "@/components/previewPlayer/PreviewPlayer";
import { customFetch } from "@/middleware/customFetch";
import styles from "./film.module.css";
import Content from "@/components/Film/Content";
import Actors from "@/components/Film/Actors";
import TextContainer from "@/components/TextContainer/TextContainer";
import FilmsItem from "@/components/filmItem/FilmItem";
import NewFilms from "@/components/newFilms/NewFilms";

export async function getData(params) {
  const film = await customFetch(
    `${process.env.NEXT_PUBLIC_SERVER_PATH}get-film?title=${params.slug}`
  );
  return film;
}

const Page = async ({ params }) => {
  const { data } = await getData(params);

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.leftInfoContainer}>
          <h1 className={styles.heading}>{data.title.toUpperCase()}</h1>
          <div className={styles.infoCommon}>
            {data?.yearCreate && (
              <p className={styles.infoCommonString}>
                Год создания: {data?.yearCreate}
              </p>
            )}
            {data?.gendre && (
              <p className={styles.infoCommonString}>Жандр: {data?.gendre}</p>
            )}
            {data?.duration && (
              <p className={styles.infoCommonString}>
                Продолжительность: {data?.duration}
              </p>
            )}
            {data?.countries && (
              <p className={styles.infoCommonString}>
                Страна: {data?.countries}
              </p>
            )}
            {data?.ageRestriction && (
              <p className={styles.infoCommonString}>
                Возрастное ограничение: {data?.ageRestriction}+
              </p>
            )}
          </div>
          <Content props={data?.description}></Content>
          <Actors props={data.actors}></Actors>
        </div>
        <div className={styles.rightInfoContainer}>
          <PreviewPlayer film={data.title}></PreviewPlayer>
        </div>
      </div>
      {/* <NewFilms></NewFilms> */}
      <TextContainer
        props={{ title: data.title, year: data.yearCreate, text: data.content }}
      />
    </div>
  );
};

export default Page;
