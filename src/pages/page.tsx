import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import AddInfo from "@/components/AddInfo";
import Education from "@/components/Education";
import PersonalInformation from "@/components/PersonalInformation";
import ReviewSubmit from "@/components/ReviewSubmit";
import SkillsQualifications from "@/components/SkillsQualification";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/ui/Navbar";
import ClickSpark from "@/components/ui/page.tsx/ClickSpark/ClickSpark";
import WorkExp from "@/components/WorkExp";
// import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import {
  updatePersnalInfo,
  updateEducation,
  setSkilladQua,
  setWorkExp,
  setResume,
  setCoverLetter,
  resetApplicationForm,
} from "@/app/slices";

const Page1 = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [countend, setCountEnd] = useState(0);
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

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem("formData") || "{}");
    if (formData && Object.keys(formData).length > 0) {
      dispatch(updatePersnalInfo(formData));
    }
    const educationData = JSON.parse(
      localStorage.getItem("educationData") || "{}"
    );
    if (educationData && Object.keys(educationData).length > 0) {
      (Object.keys(educationData) as (keyof typeof education)[]).forEach(
        (eduKey) => {
          dispatch(
            updateEducation({ edu: eduKey, data: educationData[eduKey] })
          );
        }
      );
    }

    const skillsData = JSON.parse(localStorage.getItem("skills") || "{}");
    if (skillsData && Object.keys(skillsData).length > 0) {
      dispatch(setSkilladQua(skillsData));
    }

    const expData = JSON.parse(localStorage.getItem("exp") || "[]");
    if (expData && expData.length > 0) {
      dispatch(setWorkExp(expData));
    }

    const resumeData = localStorage.getItem("resume");
    if (resumeData) {
      dispatch(setResume(resumeData));
    }
    const coverLetterData = localStorage.getItem("coverLetter");
    if (coverLetterData) {
      dispatch(setCoverLetter(coverLetterData));
    }
  }, [dispatch]);

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
      educationData.graduation?.passingyear &&
      educationData.ssc?.university &&
      educationData.ssc?.cgpa &&
      educationData.ssc?.passingyear &&
      educationData.hsc?.university &&
      educationData.hsc?.cgpa &&
      educationData.hsc?.passingyear &&
      educationData.postgraduation?.university &&
      educationData.postgraduation?.cgpa &&
      educationData.postgraduation?.passingyear;

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
      addInfoSubmitted;

    setSubmissionStatus({
      personalInfo: personalInfoSubmitted,
      education: educationSubmitted,
      workExp: workExpSubmitted,
      skillndqua: skillsSubmitted,
      addInfo: addInfoSubmitted,
      reviewSubmit: reviewSubmitSubmitted && countend != 0,
    });
  };

  useEffect(() => {
    checkSubmissionStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    stepcount,
    personalInfo,
    education,
    workExp,
    skillndqua,
    resume,
    coverLetter,
  ]);

  const handleNext = () => {
    if (isStepCompleted(stepcount)) {
      setStepCount(stepcount + 1);
    } else {
      toast.error(
        "Please fill all the fields in this section before continuing.",
        {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        }
      );
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
      setCountEnd(1);

      localStorage.setItem("formSubmitted", "true");
window.location.href='/submited';
      dispatch(resetApplicationForm());

    } else {
      toast.error("Please fill all fields before submitting.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
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
  

  const handlestepchangefromIndicator = (step: number) => {
    if (step === stepcount) {
      toast.info(`Already on ${getStepName(step)}.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      return;
    }

    let canNavigate = true;
    for (let i = 0; i < step; i++) {
      if (!isStepCompleted(i)) {
        canNavigate = false;
        break;
      }
    }

    if (canNavigate || (step === stepcount + 1 && isStepCompleted(stepcount))) {
      setStepCount(step);
    } else {
      toast.error(`Complete ${getStepName(step - 1)} first.`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
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
        return "";
    }
  };

  return (
    <div className="bg-gray-50 h-screen">
      <Navbar />
      <ToastContainer />
      <div className="mt-16 ">
        <div className="flex justify-center items-center gap-18 transform translate-y-24 relative ">
          <div
            onClick={() => handlestepchangefromIndicator(0)}
            className={`relative w-16 h-16 flex items-center justify-center rounded-full border-2 font-medium text-sm cursor-pointer transition-all duration-200 hover:border-blue-500 z-10 ${
              submissionStatus.personalInfo
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-gray-100 border-gray-400 text-gray-600"
            } ${stepcount === 0 ? "ring-6 ring-blue-300 ring-opacity-50" : ""}`}
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
            className={`relative w-16 h-16  flex items-center justify-center rounded-full border-2 font-medium text-sm cursor-pointer transition-all duration-200 hover:border-blue-500 z-10 ${
              submissionStatus.education
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-gray-100 border-gray-400 text-gray-600"
            } ${stepcount === 1 ? "ring-6 ring-blue-300 ring-opacity-50" : ""}`}
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
            className={`relative w-16 h-16  flex items-center justify-center rounded-full border-2 font-medium text-sm cursor-pointer transition-all duration-200 hover:border-blue-500 z-10 ${
              submissionStatus.workExp
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-gray-100 border-gray-400 text-gray-600"
            } ${stepcount === 2 ? "ring-6 ring-blue-300 ring-opacity-50" : ""}`}
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
            className={`relative w-16 h-16  flex items-center justify-center rounded-full border-2 font-medium text-sm cursor-pointer transition-all duration-200 hover:border-blue-500 z-10 ${
              submissionStatus.skillndqua
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-gray-100 border-gray-400 text-gray-600"
            } ${stepcount === 3 ? "ring-6 ring-blue-300 ring-opacity-50" : ""}`}
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
            className={`relative w-16 h-16  flex items-center justify-center rounded-full border-2 font-medium text-sm cursor-pointer transition-all duration-200 hover:border-blue-500 z-10 ${
              submissionStatus.addInfo
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-gray-100 border-gray-400 text-gray-600"
            } ${stepcount === 4 ? "ring-6 ring-blue-300 ring-opacity-50" : ""}`}
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
            className={`relative w-16 h-16  flex items-center justify-center rounded-full border-2 font-medium text-sm cursor-pointer transition-all duration-200 hover:border-blue-500 z-10 ${
              submissionStatus.reviewSubmit
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-gray-100 border-gray-400 text-gray-600"
            } ${stepcount === 5 ? "ring-6 ring-blue-300 ring-opacity-50" : ""}`}
            title={
              submissionStatus.reviewSubmit
                ? "All Sections Submitted"
                : "Not Submitted"
            }
          >
            6
          </div>
        </div>
      </div>
      <div className="mt-26 p-4 md:p-8 max-w-7xl mx-auto">
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
            <WorkExp onSubmit={checkSubmissionStatus} />
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
        <ClickSpark
          sparkColor="#fff"
          sparkSize={20}
          sparkRadius={35}
          sparkCount={12}
          duration={400}
        >
          <div className="mt-12">
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
                  disabled={stepcount === 5 && !submissionStatus.addInfo}
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
                  className={`px-6 transform translate-x-255 -translate-y-8 py-2 rounded-md text-white ${
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
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-md font-semibold transform translate-x-255 -translate-y-8"
                >
                  Submit
                </Button>
              </ClickSpark>
            )}
          </div>
        </ClickSpark>
      </div>
    </div>
  );
};

export default Page1;
