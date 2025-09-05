// src/components/ReviewSubmit.tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/app/hooks";

const ReviewSubmit: React.FC = () => {
  const { personalInfo } = useAppSelector((state) => state.applicationForm);
  const { education } = useAppSelector((state) => state.applicationForm);
  const { skillndqua } = useAppSelector((state) => state.applicationForm);
  const { workExp } = useAppSelector((state) => state.applicationForm);
  const { resume } = useAppSelector((state) => state.applicationForm);
  const { coverLetter } = useAppSelector((state) => state.applicationForm);

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardContent className="p-4">
          <h2 className=" font-bold mb-2">Personal Information</h2>
          {personalInfo.address && personalInfo.email&& personalInfo.name&& personalInfo.phone ? (
            <div>
              <p>
                <b>Name:</b> {personalInfo.name}
              </p>
              <p>
                <b>Email:</b> {personalInfo.email}
              </p>
              <p>
                <b>Phone:</b> {personalInfo.phone}
              </p>
              <p>
                <b>Address:</b> {personalInfo.address}
              </p>
            </div>
          ) : (
            <p className="text-red-500 text-sm">No personal info saved.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="font-bold mb-2">Education</h2>
          {
          education.ssc?.university &&
            education.hsc?.university &&
            education.graduation?.university &&
            education.postgraduation?.university ? (
            <div>
              <div>
                <div>
                  <b>SSC:</b> {education.ssc.university} | CGPA:
                  {education.ssc.cgpa} | Passing Year:
                  {education.ssc.passingyear}
                </div>
                <div>
                  <b>HSC:</b> {education.hsc.university} | CGPA:
                  {education.hsc.cgpa} | Passing Year:
                  {education.hsc.passingyear}
                </div>
                <div>
                  <b>Graduation:</b> {education.graduation.university}| CGPA:{" "}
                  {education.graduation.cgpa} | Passing Year:
                  {education.graduation.passingyear}
                </div>
                <div>
                  <b>Post Graduation:</b>
                  {education.postgraduation.university} | CGPA:
                  {education.postgraduation.cgpa} | Passing Year:
                  {education.postgraduation.passingyear}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-red-500 text-sm">No education info saved.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="font-bold mb-2">skills and Certifications</h2>
          {skillndqua.certificate && skillndqua.skill ? (
            <div>
              <p>
                <b>Skill:</b> {skillndqua.skill}
              </p>
              <p>
                <b>Certification:</b> {skillndqua.certificate}
              </p>
            </div>
          ) : (
            <p className="text-red-500 text-sm">No skillndqua saved.</p>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-bold mb-2">Work Experience</h2>
          {workExp && workExp.length  > 0 ? (
            <ul className=" text-sm ">
              {workExp.map((exp) => (
                <li key={exp.id}>
                  {exp.company} : {exp.title} , {exp.duration}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-500 text-sm">No work experience saved.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h2 className="text-lg font-bold mb-2">Documents</h2>
          <div className="text-sm space-y-1">
            <p typeof="link">
              <span className={resume ? "text-green-600"  : "text-red-600"}>
                <b>Resume:</b> {resume ? "Uploaded " : "Not uploaded"}
              </span>
            </p>
            <span className={coverLetter ? "text-green-600" : "text-red-600"}>
              <b>coverLetter</b> {coverLetter ? "Uploaded " : "Not uploaded"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewSubmit;
