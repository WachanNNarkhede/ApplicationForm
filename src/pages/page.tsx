import AddInfo from "@/components/AddInfo";
import Education from "@/components/Education";
import PersonalInformation from "@/components/PersonalInformation";
import ReviewSubmit from "@/components/ReviewSubmit";
import SkillsQualifications from "@/components/SkillsQualification";
import { Button } from "@/components/ui/button";
import WorkExp from "@/components/WorkExp";
import { useState } from "react";

const Page1 = () => {
  const [stepcount, setStepCount] = useState(0);

  const handleNext = () => {
    if (stepcount < 5) {
      setStepCount(stepcount + 1);
    }
  };

  const handlePrevious = () => {
    if (stepcount > 0) {
      setStepCount(stepcount - 1);
    }
  };
  const handleSubmit = () => {
    alert("Resume and cover letter uploaded successfully!");
  };
  return (
    <div className="mt-36 p-20 items-center justify-center ">
      {stepcount === 0 ? (
        <div>
          <PersonalInformation />
        </div>
      ) : stepcount === 1 ? (
        <div>
          <Education />
        </div>
      ) : stepcount === 2 ? (
        <div>
          <WorkExp />
        </div>
      ) : stepcount === 3 ? (
        <div>
          <SkillsQualifications />
        </div>
      ) : stepcount === 4 ? (
        <div>
          <AddInfo />
        </div>
      ) : stepcount === 5 ? (
        <div>
          <ReviewSubmit />
        </div>
      ) : (
        <div>Personal Information</div>
      )}
      <div className="flex justify-between mt-4">
        <Button onClick={handlePrevious} disabled={stepcount === 0}>
          Previous
        </Button>

        {stepcount < 5 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700"
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};

export default Page1;
