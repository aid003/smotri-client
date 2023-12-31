import PreviewPlayer from "@/components/previewPlayer/PreviewPlayer";
import { customFetch } from "@/middleware/customFetch";
import styles from "./film.module.css";
import Content from "@/components/Film/Content";
import Actors from "@/components/Film/Actors";
import TextContainer from "@/components/TextContainer/TextContainer";
import Image from "next/image";
import VideoPlayer from "@/components/VideoPlayer/VideoPlayer";

export async function getData(params) {
  const film = await customFetch(
    `${process.env.NEXT_PUBLIC_SERVER_PATH}get-film?title=${params.slug}`
  );

  return film;
}

export async function generateMetadata({ params }) {
  const { data } = await getData(params);

  return {
    title: data.TitleSeo,
    description: data.DescriptionSeo,
    keywords: data.KeywordsSeo,
    applicationName: data.applicationNameSeo,
    colorScheme: data.colorSchemeSeo,
  };
}

const Page = async ({ params }) => {
  const { data } = await getData(params);

  console.log(data);

  return (
    <div className={styles.container}>
      <div className={styles.photo}>
        <Image
          width={1920}
          height={1080}
          alt=""
          className={styles.img}
          priority={true}
          src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${data.photo}`}
        ></Image>
      </div>
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
          <Actors props={data.actors}></Actors>
          <Content props={data?.description}></Content>
        </div>
        <div className={styles.rightInfoContainer}>
          {data.preview ? (
            <PreviewPlayer film={data.preview}></PreviewPlayer>
          ) : (
            <Image
              width={900}
              height={400}
              alt=""
              className={styles.imgAlt}
              src={`${process.env.NEXT_PUBLIC_BASE_PHOTO_URL}/${data.photo}`}
            ></Image>
          )}
        </div>
      </div>
      {/* <NewFilms></NewFilms> */}
      <TextContainer
        props={{ title: data.title, year: data.yearCreate, text: data.content }}
      />
      <VideoPlayer
        props={{ filmsQuality: data.qualityUrls, title: data.title }}
      />
    </div>
  );
};

export default Page;
