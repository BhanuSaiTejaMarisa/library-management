import { useNavigate } from "react-router-dom";

const ComingSoonWrapper = ({ content }: { content: string }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-orange-500 mb-4">Coming Soon</h1>
      <p className="text-xl text-gray-600 mb-2">{content}</p>
      <p className="text-gray-500 mb-6">
        We are working hard to bring this feature to you. Stay tuned!
      </p>
      <div className="flex items-center gap-4">
        <button
          className="bg-orange-500 text-white px-6 py-2 rounded font-medium hover:bg-orange-600 transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
        <button
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded font-medium hover:bg-gray-300 transition focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          onClick={() => alert("Thank you for your patience!")}
        >
          Notify Me
        </button>
      </div>
    </div>
  );
};

export default ComingSoonWrapper;
