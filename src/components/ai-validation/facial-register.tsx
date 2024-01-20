import { useFaceio } from "@/hooks/useFaceio";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const FacialRegister = () => {
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);
  const { handleSignIn } = useFaceio();
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(async () => {
      try {
        await handleSignIn();
        setIsEnrolled(true);
      } catch (error) {
        console.log(error);
        setIsEnrolled(false);
      }
    }, 1000);
  }, []);

  if (isEnrolled === null) return <div>Loading...</div>;
  return (
    <div>
      {isEnrolled ? (
        <div>
          <h1>
            You have registered yourself successfully, Now proctor will verify
            your entered details and will approve your request.
          </h1>
          <Button onClick={() => navigate("/")}>Goto Home</Button>
        </div>
      ) : (
        <div>
          <p>Face not enrolled try again</p>
          <Button onClick={() => window.location.reload()}>Scan Face</Button>
        </div>
      )}
    </div>
  );
};

export default FacialRegister;
