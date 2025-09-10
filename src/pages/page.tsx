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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

  const stepKeys: (keyof typeof submissionStatus)[] = [
    "personalInfo",
    "education",
    "workExp",
    "skillndqua",
    "addInfo",
    "reviewSubmit",
  ];

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem("formData") || "{}");
    if (formData && Object.keys(formData).length > 0) {
      dispatch(updatePersnalInfo(formData));
    }

    const educationData = JSON.parse(localStorage.getItem("educationData") || "{}");
    if (educationData && Object.keys(educationData).length > 0) {
      (Object.keys(educationData) as (keyof typeof education)[]).forEach((eduKey) => {
        dispatch(updateEducation({ edu: eduKey, data: educationData[eduKey] }));
      });
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

    const educationData = JSON.parse(localStorage.getItem("educationData") || "{}");
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
      reviewSubmit: reviewSubmitSubmitted && countend !== 0,
    });
  };

  useEffect(() => {
    checkSubmissionStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepcount, personalInfo, education, workExp, skillndqua, resume, coverLetter]);

  const handlePersonalInfoSubmit = () => {
    if (personalInfo.address && personalInfo.email && personalInfo.name && personalInfo.phone) {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;
      if (!emailRegex.test(personalInfo.email)) {
        toast.error("Please enter a valid email address", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        return false;
      }

      const phone = /^\d{10}$/;
      if (!phone.test(personalInfo.phone)) {
        toast.error("Please enter a valid 10-digit phone number", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        return false;
      }

      const re = /^[a-zA-Z0-9_ ]+$/;
      if (!re.test(personalInfo.name) || !re.test(personalInfo.address)) {
        toast.error("Name and Address should not contain special symbols", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        return false;
      }

      localStorage.setItem("formData", JSON.stringify(personalInfo));
      dispatch(updatePersnalInfo(personalInfo));
      toast.success("Personal Information submitted!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return true;
    } else {
      toast.error("Please complete all personal information fields", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return false;
    }
  };

  const handleEducationSubmit = () => {
    const isComplete =
      education.graduation.cgpa &&
      education.graduation.passingyear &&
      education.graduation.university &&
      education.hsc.cgpa &&
      education.hsc.passingyear &&
      education.hsc.university &&
      education.postgraduation.cgpa &&
      education.postgraduation.passingyear &&
      education.postgraduation.university &&
      education.ssc.cgpa &&
      education.ssc.passingyear &&
      education.ssc.university;

    const isValidYear = [
      education.ssc.passingyear,
      education.hsc.passingyear,
      education.graduation.passingyear,
      education.postgraduation.passingyear,
    ].every((year) => /^\d{4}$/.test(year) && Number(year) > 1970 && Number(year) <= 2031);

    if (isComplete && isValidYear) {
      localStorage.setItem("educationData", JSON.stringify(education));
      (Object.keys(education) as (keyof typeof education)[]).forEach((eduKey) => {
        dispatch(updateEducation({ edu: eduKey, data: education[eduKey] }));
      });
      toast.success("Education details submitted!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return true;
    } else {
      const errorMessage = isComplete
        ? "All passing years must be between 1970 and 2031 (e.g., 2023)"
        : "Please complete all education fields";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return false;
    }
  };

  const handleSkillsSubmit = () => {
    if (skillndqua.skill && skillndqua.certificate) {
      localStorage.setItem("skills", JSON.stringify(skillndqua));
      dispatch(setSkilladQua(skillndqua));
      toast.success("Skills and Qualifications submitted!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return true;
    } else {
      toast.error("Please enter at least one skill and one certification", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return false;
    }
  };

  const handleWorkExpSubmit = () => {
    if (workExp.length > 0 && workExp.every((row) => row.company && row.title && row.duration)) {
      localStorage.setItem("exp", JSON.stringify(workExp));
      dispatch(setWorkExp(workExp));
      toast.success("Work Experience submitted!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return true;
    } else {
      toast.error("Please add at least one complete work experience entry", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return false;
    }
  };

  const handleAddInfoSubmit = () => {
    const resumeData = localStorage.getItem("resume");
    const coverLetterData = localStorage.getItem("coverLetter");
    if (resumeData && coverLetterData) {
      dispatch(setResume(resumeData));
      dispatch(setCoverLetter(coverLetterData));
      toast.success("Documents submitted!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return true;
    } else {
      toast.error("Please upload both resume and cover letter", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      return false;
    }
  };

  const handleNext = () => {
    let canProceed = false;

    switch (stepcount) {
      case 0:
        canProceed = handlePersonalInfoSubmit();
        break;
      case 1:
        canProceed = handleEducationSubmit();
        break;
      case 2:
        canProceed = handleWorkExpSubmit();
        break;
      case 3:
        canProceed = handleSkillsSubmit();
        break;
      case 4:
        canProceed = handleAddInfoSubmit();
        break;
      case 5:
        canProceed = handleSubmit();
        break;
      default:
        canProceed = true;
    }

    if (canProceed && stepcount < 5) {
      setStepCount(stepcount + 1);
      checkSubmissionStatus();
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
      submissionStatus.personalInfo &&
      submissionStatus.education &&
      submissionStatus.workExp &&
      submissionStatus.skillndqua &&
      submissionStatus.addInfo
    ) {
      setCountEnd(1);
      localStorage.setItem("formSubmitted", "true");
      window.location.href = "/submited";
      dispatch(resetApplicationForm());
      return true;
    } else {
      toast.error("Please complete all sections before submitting.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
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
    setStepCount(step);
    checkSubmissionStatus();
    toast.success(`Navigated to ${getStepName(step)}.`, {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
  };

  const getStepName = (step: number) => {
    switch (step) {
      case 0: return "Personal Information";
      case 1: return "Education";
      case 2: return "Work Experience";
      case 3: return "Skills and Qualifications";
      case 4: return "Additional Information";
      case 5: return "Review and Submit";
      default: return "";
    }
  };

  return (
    <div className="bg-gray-50 h-screen">
      <Navbar />
      <ToastContainer />
      <div className="mt-16">
        <div className="flex justify-center items-center gap-18 transform translate-y-24 relative">
          {stepKeys.map((key, index) => (
            <div
              key={index}
              onClick={() => handlestepchangefromIndicator(index)}
              className={`relative w-16 h-16 flex items-center justify-center rounded-full border-2 font-medium text-sm cursor-pointer transition-all duration-200 hover:border-blue-500 z-10 ${
                submissionStatus[key]
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-gray-100 border-gray-400 text-gray-600"
              } ${stepcount === index ? "ring-6 ring-blue-300 ring-opacity-50" : ""}`}
              title={submissionStatus[key] ? `${getStepName(index)} Submitted` : `${getStepName(index)} Not Submitted`}
            >
              {index + 1}
            </div>
          ))}
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
        <ClickSpark sparkColor="#fff" sparkSize={20} sparkRadius={35} sparkCount={12} duration={400}>
          <div className="mt-12 flex justify-between">
            {stepcount > 0 && (
              <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
                <Button
                  onClick={handlePrevious}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md"
                  disabled={stepcount === 5 && !submissionStatus.addInfo}
                >
                  Previous
                </Button>
              </ClickSpark>
            )}
            <ClickSpark sparkColor="#fff" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
              <Button
                onClick={handleNext}
                className={`px-6 py-2 rounded-md text-white ${
                  stepcount === 5 ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {stepcount === 5 ? "Submit" : "Next"}
              </Button>
            </ClickSpark>
          </div>
        </ClickSpark>
      </div>
    </div>
  );
};

export default Page1;