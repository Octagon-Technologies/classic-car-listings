import { useEffect, useState } from "react";
import Header from "../../../home/Header";
import Loading from "../../../home/Loading.jsx";
import styles from "./AdminDashboard.module.css";
import { supabase } from "../../../config/config";
import LoginPage from "./login/LoginPage.jsx";
import carUpload from "../../../assets/images/admin/car-upload.jpg";
import carUpgrade from "../../../assets/images/admin/car-upgrade.jpg";
import carSale from "../../../assets/images/admin/car-sale.jpg";
import { Link, useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.log(error);
        return;
      } else if (!data?.session?.user) {
        setIsLoading(false);
        return;
      }

      const uuid = data.session.user.id;
      const expiresAt = data.session.expires_at;

      const { data: currentUser, error: userError } = await supabase
        .from("employees")
        .select()
        .eq("uuid", uuid)
        .single();

      if (userError) {
        console.error("User fetch error: ", userError);
        return;
      }
      setUser(currentUser);

      console.log(data);
      console.log(`expiresAt is ${expiresAt}`);
      console.log(`currentUser is ${currentUser}`);

      setIsLoading(false);
    }

    fetchUser();
  }, []);

  async function logOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error(error);
      return;
    }

    window.location.href = "/admin"; // Do a forced page restart
  }

  return (
    <>
      <Header />

      {isLoading && <Loading />}
      {!isLoading && !user && (
        <div>
          <p className={styles.notLoggedIn}>Status: Not Logged In</p>

          <LoginPage style={{ marginTop: "48px" }} />
        </div>
      )}
      {!isLoading && user && (
        <div className={styles.body}>
          <p className={styles.title}>Welcome, {user.name}</p>
          <p className={styles.whatToYou}>What do you want to do today?</p>

          <div className={styles.actions}>
            <Link className={styles.action} to={"/admin/upload"}>
              <img src={carUpload} alt="" />
              <p>Upload a new car</p>
            </Link>

            <Link className={styles.action} to={"/admin/showcase"}>
              <img src={carSale} alt="" />
              <p>Update details of an existing car</p>
            </Link>
          </div>
          <p className={styles.signOut} onClick={logOut}>Log Out</p>
        </div>
      )}
    </>
  );
}

export default AdminDashboard;
