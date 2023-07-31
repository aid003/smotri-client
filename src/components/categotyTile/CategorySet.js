import { category } from "./data";
import styles from './category.module.css'

const CategorySet = () => {
  const values = category;

  return (
    <ul className={styles.categoryList}>
      {values.map((el) => (
        <li className={styles.categoryItem} key={el.id}>{el.name}</li>
      ))}
    </ul>
  );
};

export default CategorySet;
