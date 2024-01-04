import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

import { BASE_API } from "@/config/env";
import { RoutePath } from "@/constants";
import useAuth from "@/hooks/useAuth";

import { userPhotoService, userProfileService } from "@/apis/userService";
import Sidebar from "./Sidebar";
import Header from "./Header";

type User = {
  displayName: string;
  jobTitle: string;
};

type Item = {
  title: string;
  icon: (color: string) => JSX.Element;
  path: string;
};

const initialMenu = {
  title: "",
  icon: () => <div />,
  path: "/",
};

const initialUser = {
  displayName: "",
  jobTitle: "",
};

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const isAuthenticated = useAuth();
  const [user, setUser] = useState<User>(initialUser);
  const [userPhoto, setUserPhoto] = useState<string>("");
  const [activeMenu, setActiveMenu] = useState<Item>(initialMenu);
  const getUserProfile = async () => {
    try {
      const userProfile = await userProfileService();
      const imgSrc = await userPhotoService();

      setUser(userProfile);
      setUserPhoto(imgSrc);
    } catch (error) {
      // if (axios.isAxiosError(error)) {
      //   window.location.replace(`${BASE_API}/auth/me`);
      // } else {
      //   navigate(RoutePath.Login, { replace: true });
      // }
    }
  };

  useEffect(() => {
    // if (!isAuthenticated) {
    //   navigate(RoutePath.Login, { replace: true });
    // } else {
    //   getUserProfile();
    // }
  }, [isAuthenticated]);

  return (
    <div className="flex h-full w-full p-0">
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      <div className="flex flex-col w-full">
        <Header activeMenu={activeMenu} user={user} userPhoto={userPhoto} />
        <Outlet />
      </div>
    </div>
  );
};

export default ProtectedRoute;
