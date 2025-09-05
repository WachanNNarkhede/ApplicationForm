import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { setCoverLetter, setResume } from "@/app/slices";

const AddInfo: React.FC = () => {
  const dispatch = useDispatch();

  const [localResume, setLocalResume] = useState<File | null>(null);
  const [localCoverLetter, setLocalCoverLetter] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!localResume || !localCoverLetter) {
      alert("Please upload both resume and cover letter");
      return;
    }

    const readerResume = new FileReader();
    readerResume.onload = () => {
      const resumeData = readerResume.result as string;
      localStorage.setItem("resume", resumeData);
      dispatch(setResume(resumeData));
      setIsUploaded(true); 
    };
    readerResume.readAsDataURL(localResume);

    const readerCoverLetter = new FileReader();
    readerCoverLetter.onload = () => {
      const coverLetterData = readerCoverLetter.result as string;
      localStorage.setItem("coverLetter", coverLetterData);
      dispatch(setCoverLetter(coverLetterData));
      setIsUploaded(true); // ✅ Mark as uploaded
    };
    readerCoverLetter.readAsDataURL(localCoverLetter);

    alert("Resume and cover letter uploaded successfully!");
    setLocalResume(null);
    setLocalCoverLetter(null);
  };

  useEffect(() => {
    const myoldResume = localStorage.getItem("resume");
    const myoldCoverLetter = localStorage.getItem("coverLetter");
    if (myoldResume) {
      dispatch(setResume(myoldResume));
      setIsUploaded(true); 
    }
    if (myoldCoverLetter) {
      dispatch(setCoverLetter(myoldCoverLetter));
      setIsUploaded(true); 
    }
  }, [dispatch]);

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="space-y-4 p-4 border rounded-lg bg-white w-96"
      >
        <div className="space-y-2">
          <Label htmlFor="resume">Upload Resume</Label>
          <Input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setLocalResume(e.target.files?.[0] || null)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="coverLetter">Upload Cover Letter</Label>
          <Input
            id="coverLetter"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setLocalCoverLetter(e.target.files?.[0] || null)}
          />
        </div>
        <Button type="submit" className="w-full">
          {isUploaded ? "Edit your upload" : "Upload"}
        </Button>
      </form>
    </div>
  );
};

export default AddInfo;
