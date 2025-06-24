import styles from "./NoPage.module.css";
import image404 from "../../assets/images/design/image-404.jpg";
import { Link } from "react-router-dom";

function NoPage() {
  return (
    <div className={styles.noPage}>
      <img src={image404} alt="" />

      <h6>Uh Oh. That page doesn't exist.</h6>
      <p>
        The page you're looking for is not available.<br></br>
        Wanna go back to our <Link to="/">Home</Link> page
      </p>
    </div>
  );
}

export default NoPage;
