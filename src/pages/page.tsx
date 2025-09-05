import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/hooks";
import AddInfo from "@/components/AddInfo";
import Education from "@/components/Education";
import PersonalInformation from "@/components/PersonalInformation";
import ReviewSubmit from "@/components/ReviewSubmit";
import SkillsQualifications from "@/components/SkillsQualification";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import ClickSpark from "@/components/ui/page.tsx/ClickSpark/ClickSpark";
import WorkExp from "@/components/WorkExp";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const Page1 = () => {
  const navigate = useNavigate();
  const { personalInfo, education, skillndqua, workExp, resume, coverLetter } =
    useAppSelector((state) => state.applicationForm);
  const [stepcount, setStepCount] = useState(0);
  const [submissionStatus, setSubmissionStatus] = useState({
    personalInfo: false,
    education: false,
    workExp: false,
    skillndqua: false,
    addInfo: false,
    reviewSubmit: false,
  });

  const checkSubmissionStatus = () => {
    const formData = JSON.parse(localStorage.getItem("formData") || "{}");
    const personalInfoSubmitted =
      formData.name && formData.email && formData.phone && formData.address;

    const educationData = JSON.parse(
      localStorage.getItem("educationData") || "{}"
    );
    const educationSubmitted =
      educationData.graduation?.university &&
      educationData.graduation?.cgpa &&
      educationData.graduation?.passingyear;

    const expData = JSON.parse(localStorage.getItem("exp") || "[]");
    const workExpSubmitted =
      Array.isArray(expData) &&
      expData.length > 0 &&
      expData.every((row) => row.company && row.title && row.duration);

    const skillsData = JSON.parse(localStorage.getItem("skills") || "{}");
    const skillsSubmitted = skillsData?.skill && skillsData?.certificate;

    const resumeData = localStorage.getItem("resume");
    const coverLetterData = localStorage.getItem("coverLetter");
    const addInfoSubmitted = !!resumeData && !!coverLetterData;

    const reviewSubmitSubmitted =
      personalInfoSubmitted &&
      educationSubmitted &&
      workExpSubmitted &&
      skillsSubmitted &&
      addInfoSubmitted &&
      formData.reviewSubmit;

    setSubmissionStatus({
      personalInfo: personalInfoSubmitted,
      education: educationSubmitted,
      workExp: workExpSubmitted,
      skillndqua: skillsSubmitted,
      addInfo: addInfoSubmitted,
      reviewSubmit: reviewSubmitSubmitted,
    });
  };

  useEffect(() => {
    checkSubmissionStatus();
  }, [stepcount]);

const handleNext = () => {
  if (isStepCompleted(stepcount)) {
    setStepCount(stepcount + 1);
  } else {
    toast.error("Please fill all the fields in this section before continuing.", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  }
};


  const handlePrevious = () => {
    if (stepcount > 0) {
      setStepCount(stepcount - 1);
      checkSubmissionStatus();
    }
  };

  const handleSubmit = () => {
    if (
      personalInfo?.name &&
      personalInfo?.email &&
      personalInfo?.phone &&
      personalInfo?.address &&
      education?.ssc?.university &&
      education?.ssc?.cgpa &&
      education?.ssc?.passingyear &&
      education?.hsc?.university &&
      education?.hsc?.cgpa &&
      education?.hsc?.passingyear &&
      education?.graduation?.university &&
      education?.graduation?.cgpa &&
      education?.graduation?.passingyear &&
      education?.postgraduation?.university &&
      education?.postgraduation?.cgpa &&
      education?.postgraduation?.passingyear &&
      skillndqua?.skill &&
      skillndqua?.certificate &&
      workExp?.length > 0 &&
      resume &&
      coverLetter
    ) {
      checkSubmissionStatus();
      navigate("/submited");
    } else {
      alert("Please fill all fields before submitting.");
    }
  };
  const isStepCompleted = (step: number) => {
    switch (step) {
      case 0:
        return submissionStatus.personalInfo;
      case 1:
        return submissionStatus.education;
      case 2:
        return submissionStatus.workExp;
      case 3:
        return submissionStatus.skillndqua;
      case 4:
        return submissionStatus.addInfo;
      default:
        return false;
    }
  };
  useEffect(() => {
    checkSubmissionStatus();
  }, [
    stepcount,
    personalInfo,
    education,
    workExp,
    skillndqua,
    resume,
    coverLetter,
  ]);

  const handlestepchangefromIndicator = (step: number) => {
    if (isStepCompleted(step)) {
      setStepCount(step);
    } else {
      toast.error(
        `Please complete the ${getStepName(
          step
        )} section before navigating to it.`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        }
      );
    }
  };

  const getStepName = (step: number) => {
    switch (step) {
      case 0:
        return "Personal Information";
      case 1:
        return "Education";
      case 2:
        return "Work Experience";
      case 3:
        return "Skills and Qualifications";
      case 4:
        return "Additional Information";
      case 5:
        return "Review and Submit";
      default:
        return "Unknown";
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <ToastContainer />

      <div className="flex justify-center items-center gap-6 mt-24">
        <div
          onClick={() => handlestepchangefromIndicator(0)}
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-semibold ${
            submissionStatus.personalInfo
              ? "bg-green-400 border-green-600 text-white"
              : "bg-red-400 border-red-600 text-white"
          }`}
          title={
            submissionStatus.personalInfo
              ? "Personal Info Submitted"
              : "Personal Info Not Submitted"
          }
        >
          1
        </div>
        <div
          onClick={() => handlestepchangefromIndicator(1)}
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-semibold ${
            submissionStatus.education
              ? "bg-green-400 border-green-600 text-white"
              : "bg-red-400 border-red-600 text-white"
          }`}
          title={
            submissionStatus.education
              ? "Education Submitted"
              : "Education Not Submitted"
          }
        >
          2
        </div>
        <div
          onClick={() => handlestepchangefromIndicator(2)}
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-semibold ${
            submissionStatus.workExp
              ? "bg-green-400 border-green-600 text-white"
              : "bg-red-400 border-red-600 text-white"
          }`}
          title={
            submissionStatus.workExp
              ? "Work Experience Submitted"
              : "Work Experience Not Submitted"
          }
        >
          3
        </div>
        <div
          onClick={() => handlestepchangefromIndicator(3)}
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-semibold ${
            submissionStatus.skillndqua
              ? "bg-green-400 border-green-600 text-white"
              : "bg-red-400 border-red-600 text-white"
          }`}
          title={
            submissionStatus.skillndqua
              ? "Skills Submitted"
              : "Skills Not Submitted"
          }
        >
          4
        </div>
        <div
          onClick={() => handlestepchangefromIndicator(4)}
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-semibold ${
            submissionStatus.addInfo
              ? "bg-green-400 border-green-600 text-white"
              : "bg-red-400 border-red-600 text-white"
          }`}
          title={
            submissionStatus.addInfo
              ? "Documents Submitted"
              : "Documents Not Submitted"
          }
        >
          5
        </div>

        <div
          onClick={() => handlestepchangefromIndicator(5)}
          className={`w-12 h-12 flex items-center justify-center rounded-full border-2 font-semibold ${
            submissionStatus.reviewSubmit
              ? "bg-green-400 border-green-600 text-white"
              : "bg-red-400 border-red-600 text-white"
          }`}
          title={
            submissionStatus.reviewSubmit
              ? "All Sections Submitted"
              : "Not All Sections Submitted"
          }
        >
          6
        </div>
      </div>
      <div className="mt-16 p-4 md:p-8 max-w-3xl mx-auto">
        {stepcount === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <PersonalInformation />
          </div>
        ) : stepcount === 1 ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <Education />
          </div>
        ) : stepcount === 2 ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <WorkExp />
          </div>
        ) : stepcount === 3 ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <SkillsQualifications />
          </div>
        ) : stepcount === 4 ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <AddInfo />
          </div>
        ) : stepcount === 5 ? (
          <div className="bg-white shadow-md rounded-lg p-6">
            <ReviewSubmit />
          </div>
        ) : (
          <div className="bg-white shadow-md rounded-lg p-6">
            <PersonalInformation />
          </div>
        )}
       <div className="flex justify-between mt-6 gap-4">
  {stepcount > 0 && (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <Button
        onClick={handlePrevious}
        className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md"
      >
        Previous
      </Button>
    </ClickSpark>
  )}

  {stepcount < 5 ? (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <Button
        onClick={handleNext}
        className={`px-6 py-2 rounded-md text-white ${
          isStepCompleted(stepcount)
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Next
      </Button>
    </ClickSpark>
  ) : (
    <ClickSpark
      sparkColor="#fff"
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <Button
        onClick={handleSubmit}
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-md font-semibold"
      >
        Submit
      </Button>
    </ClickSpark>
  )}
</div>

      </div>
    </div>
  );
};

export default Page1;
