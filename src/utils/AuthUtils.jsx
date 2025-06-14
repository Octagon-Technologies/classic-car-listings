import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../config/config";

export function useRequireAuth(redirectTo = "/admin") {
  const navigate = useNavigate();

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      console.log("user is", user);
      if (!user) {
        navigate(redirectTo);
      }
    }

    checkUser();
  }, []);
}
