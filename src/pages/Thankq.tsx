// src/pages/ThankYou.tsx
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";
import Spline from '@splinetool/react-spline';

export default function ThankYou() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white px-4 relative">
      <PixelatedCanvas
        src="/seng.webp"
        width={400}
        height={500}
        cellSize={3}
        dotScale={0.9}
        shape="square"
        backgroundColor=""
        dropoutStrength={0.4}
        interactive
        distortionStrength={3}
        distortionRadius={80}
        distortionMode="swirl"
        followSpeed={0.2}
        jitterStrength={4}
        jitterSpeed={4}
        sampleAverage
        tintColor="#FFFFFF"
        tintStrength={0.2}
        className="mr-6 mt-96 z-20"
      />
      <div className="absolute transform -translate-y-32 inset-0 w-full h-full">
        <Spline scene="https://prod.spline.design/gr-afaaytK0kmHTP/scene.splinecode" />

        <div className="absolute bottom-0 left-0 w-full h-1/4"></div>
      </div>
      
      <div className="absolute bottom-6 right-6 z-30 text-3xl rounded-md p-2 text-gray-400 bg-black transform -translate-y-30 font-semibold tracking-wide">
        shaping futures
      </div>
      
        <div className="max-w-md w-full bg-white/10 backdrop-blur-lg rounded-2xl ml- shadow-2xl p-12 text-center border border-white/20">
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

      <PixelatedCanvas
        src="/rocket.png"
        width={400}
        height={500}
        cellSize={3}
        dotScale={0.9}
        shape="square"
        backgroundColor=""
        dropoutStrength={0.4}
        interactive
        distortionStrength={3}
        distortionRadius={80}
        distortionMode="swirl"
        followSpeed={0.2}
        jitterStrength={4}
        jitterSpeed={4}
        sampleAverage
        tintColor="#FFFFFF"
        tintStrength={0.2}
        className="rounded-xl mr- mt-96 z-20"
      />
    </div>
  );
}