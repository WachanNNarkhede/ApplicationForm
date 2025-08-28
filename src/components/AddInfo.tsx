import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const AddInfo: React.FC = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState<File | null>(null);
  const [error, setError] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume || !coverLetter) {
      setError("Please upload both resume and cover letter");
      return;
    }
    setError("");
    const readerResume = new FileReader();
    const readerCoverLetter = new FileReader();

    readerResume.onload = () => {
      localStorage.setItem("resume", readerResume.result as string);
    };
    readerCoverLetter.onload = () => {
      localStorage.setItem("coverLetter", readerCoverLetter.result as string);
    };

    readerResume.readAsDataURL(resume);
    readerCoverLetter.readAsDataURL(coverLetter);

 alert("Resume and cover letter uploaded successfully!");
  };

  return (
    <div className="flex items-center justify-center">
      <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-lg  bg-white w-96"
    >
      <div className="space-y-2">
        <Label htmlFor="resume">Upload Resume</Label>
        <Input
          id="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setResume(e.target.files?.[0] || null)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="coverLetter">Upload Cover Letter</Label>
        <Input
          id="coverLetter"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setCoverLetter(e.target.files?.[0] || null)}
        />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Button type="submit" className="w-full">
        Upload
      </Button>
    </form>
    </div>
    
  );
};

export default AddInfo;
