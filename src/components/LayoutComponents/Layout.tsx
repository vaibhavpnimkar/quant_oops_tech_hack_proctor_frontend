import {
  BookOpenCheck,
  BookPlus,
  CircleEllipsis,
  Layers,
  LayoutDashboard,
  User2Icon,
  Users,
  Users2Icon,
} from "lucide-react";
import React from "react";
import Navbar from "./Navbar";
import LeftSidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

let links = [
  {
    title: "Dashboard",
    target: "/organization/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    title: "All Proctors",
    target: "/organization/allProctors?page=1",
    icon: <Users />,
  },
  {
    title: "Exams",
    target: "/organization/exams?page=1",
    icon: <BookOpenCheck />,
  },
  {
    title: "Questions",
    target: "/organization/questions",
    icon: <BookPlus />,
  },
  {
    title: "Students",
    target: "/organization/students",
    icon: <Users2Icon />,
  },
];

const proctorLinks = [
  {
    title: "Active Exams",
    target: "/proctor/activeExams",
    icon: <Layers />,
  },
  {
    title: "Pending Approvals",
    target: "/proctor/studentapprovals",
    icon: <CircleEllipsis />,
  },
];

// create sets of links for orgs, proctors and superadmin. Check the url for organization etc and if the role matches, the user can access the page.

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const User = {
    name: "Bilal Sajid",
    email: "bsajid173@gmaail.com",
    links: [
      {
        title: "Account",
        // target: `/${location?.pathname?.split("/")[1]}/account/profile`,
        target: "/student/account/profile",
        icon: <User2Icon />,
      },
    ],
  };

  return (
    <div className="flex min-h-[100vh]">
      <LeftSidebar
        links={
          location?.pathname?.split("/")[1] === "proctor" ? proctorLinks : links
        }
      />
      <div className="grow">
        <Navbar email={User.email} name={User.name} links={User.links} />
        {children}
      </div>
    </div>
  );
};

export default Layout;
