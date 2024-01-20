// import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NProps } from "./LayoutProps";

// navbar collapse krne ke liye button dena hai abhi sath me scroll krke dekhe ho tm ??

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const Navbar = ({ email, name, links }: NProps) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="w-full z-10 p-4 px-4 flex border-b border-gray-200 sticky top-0 bg-primary-foreground">
      <div className="flex items-center"></div>
      <div className="ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>{name}</DropdownMenuLabel>
            <DropdownMenuLabel>{email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {links?.map((item) => {
                return (
                  <DropdownMenuItem>
                    <Link to={item.target}>
                      <span className="flex gap-x-2">
                        {item.icon}
                        {item.title}
                      </span>
                    </Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <Button
              onClick={handleLogout}
              variant="secondary"
              className="w-full"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
