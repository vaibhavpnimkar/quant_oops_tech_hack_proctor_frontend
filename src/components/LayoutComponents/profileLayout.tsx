import { BookOpenCheck, CircleUserRound, Newspaper } from "lucide-react";
import ProfileSidebar from "./profileSidebar";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const links = [
    {
      title: "Profile",
      target: "/student/account/profile",
      icon: <CircleUserRound />,
    },
    {
      title: "All Exams",
      target: "/student/account/allexams",
      icon: <BookOpenCheck />,
    },
    {
      title: "Results",
      target: "/student/account/results",
      icon: <Newspaper />,
    },
  ];
  return (
    <div className="flex min-h-[100vh]">
      <ProfileSidebar links={links} />
      <div className="grow px-12 py-8 bg-secondary">{children}</div>
    </div>
  );
};

export default ProfileLayout;
