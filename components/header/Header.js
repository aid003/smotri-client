import styles from './Header.module.css'

const Header = ({ children }) => {
  return (
    <>
      <div className={styles.headerContainer}>
        Burger
        <h1>Title</h1>

        
      </div>
      {children}
    </>
  );
};

export default Header;
