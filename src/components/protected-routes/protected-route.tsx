import { userState } from "@/atoms/userState";
import React from "react";
import { useLocation } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";

type TProtectedProps = {
  children: React.ReactNode;
};
const userType = ["organization", "proctor", "student"];
const ProtectedRoute = ({ children }: TProtectedProps) => {
  const user = useRecoilValue(userState);
  const location = useLocation();
  const setUser = useSetRecoilState(userState);

  console.log(user);

  React.useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setUser((prev) => {
        return {
          accessToken: localStorage?.getItem("accessToken") || "",
          role: localStorage?.getItem("role") || "",
        };
      });
    }
  }, [user?.role]);

  if (
    location?.pathname?.split("/")[1] !== "" &&
    userType.includes(location?.pathname?.split("/")[1]) &&
    user?.role !== location?.pathname?.split("/")[1]
  )
    return;

  return children;
};

export default ProtectedRoute;
