import styles from './showcase.module.css'

const Showcase = async ({ children }) => {
  return (
    <>
      <div className={styles.showcaseContainer}>{children}</div>
    </>
  );
};

export default Showcase;
