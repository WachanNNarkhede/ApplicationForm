import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { setCoverLetter, setResume } from "@/app/slices";
import { toast } from "react-toastify";
import ClickSpark from "./ui/page.tsx/ClickSpark/ClickSpark";

const AddInfo: React.FC = () => {
  const dispatch = useDispatch();

  const [localResume, setLocalResume] = useState<File | null>(null);
  const [localCoverLetter, setLocalCoverLetter] = useState<File | null>(null);
  const [isUploaded, setIsUploaded] = useState(false);
  const [resumeName, setResumeName] = useState<string>("");
  const [coverLetterName, setCoverLetterName] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUploaded && (!localResume || !localCoverLetter)) {
      toast.error(
        "Please upload both resume and cover letter for first submission"
      );
      return;
    }
    if (isUploaded && !localResume && !localCoverLetter) {
      toast.error("Please upload at least one file to edit");
      return;
    }

    if (localResume) {
      const readerResume = new FileReader();
      readerResume.onload = () => {
        const resumeData = readerResume.result as string;
        localStorage.setItem("resume", resumeData);
        localStorage.setItem("resumeName", localResume.name);
        dispatch(setResume(resumeData));
        setResumeName(localResume.name);
        setIsUploaded(true);
      };
      readerResume.readAsDataURL(localResume);
    }
    if (localCoverLetter) {
      const readerCoverLetter = new FileReader();
      readerCoverLetter.onload = () => {
        const coverLetterData = readerCoverLetter.result as string;
        localStorage.setItem("coverLetter", coverLetterData);
        localStorage.setItem("coverLetterName", localCoverLetter.name);
        dispatch(setCoverLetter(coverLetterData));
        setCoverLetterName(localCoverLetter.name);
        setIsUploaded(true);
      };
      readerCoverLetter.readAsDataURL(localCoverLetter);
    }

    toast.success("File uploaded successfully!");
    if (localResume) setLocalResume(null);
    if (localCoverLetter) setLocalCoverLetter(null);
  };

  useEffect(() => {
    const myoldResume = localStorage.getItem("resume");
    const myoldResumeName = localStorage.getItem("resumeName");
    const myoldCoverLetter = localStorage.getItem("coverLetter");
    const myoldCoverLetterName = localStorage.getItem("coverLetterName");
    if (myoldResume) {
      dispatch(setResume(myoldResume));
      setIsUploaded(true);
    }
    if (myoldResumeName) {
      setResumeName(myoldResumeName);
    }
    if (myoldCoverLetter) {
      dispatch(setCoverLetter(myoldCoverLetter));
      setIsUploaded(true);
    }
    if (myoldCoverLetterName) {
      setCoverLetterName(myoldCoverLetterName);
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-[550px] bg-gray-100 p-6 md:p-8">
      <h2 className="text-3xl transform -translate-y-8 font-extrabold heading text-blue-600 mb-1">
        Education Details
      </h2>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-8 border border-gray-300 rounded-lg bg-white max-w-4xl w-full shadow-md"
      >
        <div className="space-y-3">
          <Label htmlFor="resume" className="text-xl font-medium">
            Upload Resume
          </Label>
          <Input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setLocalResume(e.target.files?.[0] || null)}
            className="text-base py-3 h-12"
          />
        </div>
        <div className="space-y-3">
          <Label htmlFor="coverLetter" className="text-xl font-medium">
            Upload Cover Letter
          </Label>
          <Input
            id="coverLetter"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => setLocalCoverLetter(e.target.files?.[0] || null)}
            className="text-base py-3 h-12"
          />
        </div>
        <div className="space-y-3">
          <Label className="text-xl font-medium">Uploaded Resume</Label>
          <p className="text-base">{resumeName || "No resume uploaded"}</p>
          <Label className="text-xl font-medium">Uploaded Cover Letter</Label>
          <p className="text-base">
            {coverLetterName || "No cover letter uploaded"}
          </p>
        </div>
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <Button type="submit" className="w-full text-base px-8 py-3">
            {isUploaded ? "Edit your upload" : "Upload"}
          </Button>
        </ClickSpark>
      </form>
    </div>
  );
};

export default AddInfo;
