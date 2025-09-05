// src/pages/ThankYou.tsx
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    localStorage.clear(); 
    window.location.reload();
    navigate("/"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-center border border-white/20">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-20 h-20 text-green-400 animate-bounce" />
        </div>

        <h1 className="text-2xl md:text-3xl font-bold mb-4">
          Thank You for Your Submission!
        </h1>
        <p className="text-gray-300 mb-8">
          Your job application has been successfully submitted. We’ll review it
          and get back to you soon.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleGoHome}
            className="px-6 py-3 rounded-xl bg-green-500 hover:bg-green-600 transition font-medium shadow-md"
          >
         New Response 
          </button>
        </div>
      </div>
    </div>
  );
}
