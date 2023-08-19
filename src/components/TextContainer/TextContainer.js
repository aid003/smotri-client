import styles from "./textContainer.module.css";

const TextContainer = ({ props }) => {
  const { title, text, year } = props;
  return (
    <div className={styles.container}>
      <p className={styles.text}>{text}</p>
      <h2 className={styles.heading}>
        {`Смотреть онлайн ${title} ${year} бесплатно в хорошем качестве HD720,1080`}
      </h2>
    </div>
  );
};

export default TextContainer;
