import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define interfaces to match the data structures
interface PersonalInfo {
  name: string;
  email: string;
  phone: string; // Stored as string in localStorage
  address: string;
}

interface EducationEntry {
  university: string;
  cgpa: string;
  passingyear: string;
}

interface Education {
  ssc: EducationEntry;
  hsc: EducationEntry;
  graduation: EducationEntry;
  postgraduation: EducationEntry;
}

interface Skills {
  skill: string;
  certf: string;
}

interface WorkExpRow {
  id: number;
  company: string;
  title: string;
  duration: string;
}

const ReviewSubmit = () => {
  const [personal, setPersonal] = useState<PersonalInfo | null>(null);
  const [education, setEducation] = useState<Education | null>(null);
  const [skills, setSkills] = useState<Skills | null>(null);
  const [workExp, setWorkExp] = useState<WorkExpRow[]>([]);
  const [resume, setResume] = useState<string | null>(null);
  const [coverLetter, setCoverLetter] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from localStorage
    setPersonal(JSON.parse(localStorage.getItem("formData") || "null"));
    setEducation(JSON.parse(localStorage.getItem("educationData") || "null"));
    setSkills(JSON.parse(localStorage.getItem("skills") || "null"));
    setWorkExp(JSON.parse(localStorage.getItem("exp") || "[]"));
    setResume(localStorage.getItem("resume") || null); // Stored as base64 string
    setCoverLetter(localStorage.getItem("coverLetter") || null); // Stored as base64 string
  }, []);

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          {personal ? (
            <div className="space-y-1 text-sm">
              <p>
                <b>Name:</b> {personal.name}
              </p>
              <p>
                <b>Email:</b> {personal.email}
              </p>
              <p>
                <b>Phone:</b> {personal.phone}
              </p>
              <p>
                <b>Address:</b> {personal.address}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No personal information saved.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Education</CardTitle>
        </CardHeader>
        <CardContent>
          {education ? (
            <div className="space-y-4 text-sm">
              <div>
                <p>
                  <b>SSC</b>
                </p>
                <p>
                  University: {education.ssc.university || "Not provided"}
                </p>
                <p>CGPA: {education.ssc.cgpa || "Not provided"}</p>
                <p>
                  Passing Year: {education.ssc.passingyear || "Not provided"}
                </p>
              </div>
              <div>
                <p>
                  <b>HSC</b>
                </p>
                <p>
                  University: {education.hsc.university || "Not provided"}
                </p>
                <p>CGPA: {education.hsc.cgpa || "Not provided"}</p>
                <p>
                  Passing Year: {education.hsc.passingyear || "Not provided"}
                </p>
              </div>
              <div>
                <p>
                  <b>Graduation</b>
                </p>
                <p>
                  University: {education.graduation.university || "Not provided"}
                </p>
                <p>CGPA: {education.graduation.cgpa || "Not provided"}</p>
                <p>
                  Passing Year: {education.graduation.passingyear || "Not provided"}
                </p>
              </div>
              <div>
                <p>
                  <b>Post Graduation</b>
                </p>
                <p>
                  University: {education.postgraduation.university || "Not provided"}
                </p>
                <p>
                  CGPA: {education.postgraduation.cgpa || "Not provided"}
                </p>
                <p>
                  Passing Year: {education.postgraduation.passingyear || "Not provided"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No education data saved.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills & Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          {skills ? (
            <div className="space-y-1 text-sm">
              <p>
                <b>Skills:</b> {skills.skill || "Not provided"}
              </p>
              <p>
                <b>Certifications:</b> {skills.certf || "Not provided"}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No skills or certifications saved.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Work Experience</CardTitle>
        </CardHeader>
        <CardContent>
          {workExp.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {workExp.map((row) => (
                <li key={row.id} className="border p-2 rounded">
                  <p>
                    <b>Company:</b> {row.company}
                  </p>
                  <p>
                    <b>Title:</b> {row.title}
                  </p>
                  <p>
                    <b>Duration:</b> {row.duration}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No work experience saved.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploads</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {resume ? (
            <a
              href={resume}
              download="resume.pdf"
              className="text-blue-600 underline text-sm"
            >
              Download Resume
            </a>
          ) : (
            <p className="text-gray-500 text-sm">No resume uploaded.</p>
          )}
          {coverLetter ? (
            <a
              href={coverLetter}
              download="coverLetter.pdf"
              className="text-blue-600 underline text-sm"
            >
              Download Cover Letter
            </a>
          ) : (
            <p className="text-gray-500 text-sm">No cover letter uploaded.</p>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-green-600 text-white">Final Submit</Button>
      </div>
    </div>
  );
};

export default ReviewSubmit;