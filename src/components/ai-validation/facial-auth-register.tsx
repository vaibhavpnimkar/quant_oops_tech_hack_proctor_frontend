import {  useEffect } from "react";
import faceIO from "@faceio/fiojs";
import { Button } from "../ui/button";
import { useFaceio } from "@/hooks/useFaceio";
export const FacialAuthRegister = () => {
  const { handleSignIn, handleLogIn } = useFaceio();
  return (
    <div>
      <Button onClick={handleSignIn}>Register</Button>
      <Button onClick={handleLogIn}>Authenticate</Button>
    </div>
  );  
};
