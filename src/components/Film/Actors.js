import styles from "./actors.module.css";

const Actors = ({ props }) => {
  return (
    <div className={styles.container}>
      <div className={styles.actors}>Актерский состав: {props}</div>
    </div>
  );
};

export default Actors;
