import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { setCoverLetter, setResume } from "@/app/slices";

const AddInfo: React.FC = () => {
  const dispatch = useDispatch();
  const [localResume, setLocalResume] = useState<File | null>(null);
  const [localCoverLetter, setLocalCoverLetter] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState<string>("");
  const [coverLetterName, setCoverLetterName] = useState<string>("");

  useEffect(() => {
    if (localResume) {
      const readerResume = new FileReader();
      readerResume.onload = () => {
        const resumeData = readerResume.result as string;
        dispatch(setResume(resumeData));
        localStorage.setItem("resume", resumeData);
        localStorage.setItem("resumeName", localResume.name);
        setResumeName(localResume.name);
      };
      readerResume.readAsDataURL(localResume);
    }
    if (localCoverLetter) {
      const readerCoverLetter = new FileReader();
      readerCoverLetter.onload = () => {
        const coverLetterData = readerCoverLetter.result as string;
        dispatch(setCoverLetter(coverLetterData));
        localStorage.setItem("coverLetter", coverLetterData);
        localStorage.setItem("coverLetterName", localCoverLetter.name);
        setCoverLetterName(localCoverLetter.name);
      };
      readerCoverLetter.readAsDataURL(localCoverLetter);
    }
  }, [dispatch, localCoverLetter, localResume]);

  useEffect(() => {
    const myoldResume = localStorage.getItem("resume");
    const myoldResumeName = localStorage.getItem("resumeName");
    const myoldCoverLetter = localStorage.getItem("coverLetter");
    const myoldCoverLetterName = localStorage.getItem("coverLetterName");

    if (myoldResume) {
      dispatch(setResume(myoldResume));
    }
    if (myoldResumeName) {
      setResumeName(myoldResumeName);
    }
    if (myoldCoverLetter) {
      dispatch(setCoverLetter(myoldCoverLetter));
    }
    if (myoldCoverLetterName) {
      setCoverLetterName(myoldCoverLetterName);
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center h-[550px] bg-gray-100 p-6 md:p-8">
      <h2 className="text-3xl transform -translate-y-1 font-extrabold heading text-blue-600 mb-1">
        Documents Upload
      </h2>
      <form className="space-y-6 p-8 border border-gray-300 rounded-lg bg-white max-w-4xl w-full shadow-md">
        <div className="space-y-3">
          <Label htmlFor="resume" className="text-xl font-bold text-blue-400">
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
          <Label htmlFor="coverLetter" className="text-xl font-bold text-blue-400">
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
          <Label className="text-xl font-bold text-blue-600">Uploaded Resume</Label>
          <p className="text-base">{resumeName || "No resume uploaded"}</p>
          <Label className="text-xl font-bold text-blue-600">Uploaded Cover Letter</Label>
          <p className="text-base">{coverLetterName || "No cover letter uploaded"}</p>
        </div>
      </form>
    </div>
  );
};

export default AddInfo;