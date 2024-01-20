import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const ExamFinished = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center mt-16">
      <div>Exam Finished!</div>
      <Button
        className="mt-8"
        onClick={() => navigate("/student/account/profile")}
      >
        Go To Profile
      </Button>
    </div>
  );
};

export default ExamFinished;
