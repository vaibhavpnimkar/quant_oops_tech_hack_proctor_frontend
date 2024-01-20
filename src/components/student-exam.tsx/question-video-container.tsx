import AllQuestion from "./all-question";
import VideoMonitor from "./video-monitor";

const QuestionVideoContainer = () => {
  return (
    <div className="flex items-start justify-between gap-8 p-4 mt-4 border rounded-lg shadow-md border-1 border-primary">
      <AllQuestion />
      <VideoMonitor />
    </div>
  );
};

export default QuestionVideoContainer;
