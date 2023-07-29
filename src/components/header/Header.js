"use client"
import styles from './Header.module.css'
import Searcher from './Searcher';

const Header = ({ children }) => {
  return (
    <>
      <div className={styles.headerContainer}>
        Burger
        <h1>Title</h1>
        <Searcher></Searcher>
        
      </div>
      {children}
    </>
  );
};

export default Header;
