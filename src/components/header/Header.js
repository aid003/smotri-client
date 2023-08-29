import styles from "./Header.module.css";
import Searcher from "./Searcher";

const Header = ({ children }) => {
  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.widthContainer}>
          <h1 className={styles.mainHeading}>Smotri tyt</h1>
          <Searcher></Searcher>
        </div>
      </div>
      {children}
    </>
  );
};

export default Header;
