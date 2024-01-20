import { Link } from "react-router-dom";
import CreateAccount from "../Register/Register";
import UserLogin from "../Login/Login";
import { Button } from "../ui/button";

const LandingPageNavbar = () => {
  return (
    <div className="w-full p-1 px-4 z-30 flex border-b border-border sticky top-0 bg-foreground items-center">
      <CreateAccount />
      <UserLogin />
      <img
        src="/medusalogo.png"
        alt="logo"
        className="h-20 p-1 transform scale-150
      "
      />
      <div className="flex gap-x-3 ml-auto">
        <Link className="" to="/?modal=login">
          <Button variant={"default"}>Login</Button>
        </Link>
        <Link className="" to="/?modal=signup">
          <Button variant={"secondary"}>Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPageNavbar;
