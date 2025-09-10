import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useAppSelector } from "@/app/hooks";

const ReviewSubmit: React.FC = () => {
  const { personalInfo, education, skillndqua, workExp, resume, coverLetter } =
    useAppSelector((state) => state.applicationForm);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl heading font-extrabold md:text-4xl text-blue-600 mb-8">
        Review Your Submission
      </h2>
      <div className="max-w-4xl w-full space-y-6">
        <Card className="border-gray-200 shadow-md">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h3>
            {personalInfo.address && personalInfo.email && personalInfo.name && personalInfo.phone ? (
              <div className="grid grid-cols-1 gap-3 text-lg text-gray-700 bg-gray-50 p-6 rounded-xl shadow-sm">
                <p><span className="font-medium text-blue-600">Name:</span> {personalInfo.name}</p>
                <p><span className="font-medium text-blue-600">Email:</span> {personalInfo.email}</p>
                <p><span className="font-medium text-blue-600">Phone:</span> {personalInfo.phone}</p>
                <p><span className="font-medium text-blue-600">Address:</span> {personalInfo.address}</p>
              </div>
            ) : (
              <p className="text-red-500 text-sm">No personal information saved.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-md">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Education</h3>
            {education.ssc?.university &&
            education.hsc?.university &&
            education.graduation?.university &&
            education.postgraduation?.university ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                  <p className="text-lg font-medium text-blue-600">SSC</p>
                  <p className="text-lg text-gray-700"><span className="font-medium text-blue-600">University:</span> {education.ssc.university}</p>
                  <p className="text-lg text-gray-700"><span className="font-medium text-blue-600">CGPA:</span> {education.ssc.cgpa}</p>
                  <p className="text-lg text-gray-700"><span className="font-medium text-blue-600">Passing Year:</span> {education.ssc.passingyear}</p>
                </div>
                <div className="grid grid-cols-1 gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                  <p className="text-lg font-medium text-blue-600">HSC</p>
                  <p className="text-lg text-gray-700"><span className="font-medium text-blue-600">University:</span> {education.hsc.university}</p>
                  <p className="text-lg text-gray-700"><span className="font-medium text-blue-600">CGPA:</span> {education.hsc.cgpa}</p>
                  <p className="text-lg text-gray-700"><span className="font-medium text-blue-600">Passing Year:</span> {education.hsc.passingyear}</p>
                </div>
                <div className="grid grid-cols-1 gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                  <p className="text-lg font-medium text-blue-600">Graduation</p>
                  <p className="text-lg text-gray-700"><span className="font-medium text-blue-600">University:</span> {education.graduation.university}</p>
                  <p className="text-lg text-gray-700"><span className="font-medium text-blue-600">CGPA:</span> {education.graduation.cgpa}</p>
                  <p className="text-lg text-gray-700"><span className="font-medium text-blue-600">Passing Year:</span> {education.graduation.passingyear}</p>
                </div>
                <div className="grid grid-cols-1 gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                  <p className="text-lg font-medium text-blue-600">Post Graduation</p>
                  <p className="text-lg text-gray-700"><span className="font-medium text-blue-600">University:</span> {education.postgraduation.university}</p>
                  <p className="text-lg text-gray-700"><span className="font-medium text-blue-600">CGPA:</span> {education.postgraduation.cgpa}</p>
                  <p className="text-lg text-gray-700"><span className="font-medium text-blue-600">Passing Year:</span> {education.postgraduation.passingyear}</p>
                </div>
              </div>
            ) : (
              <p className="text-red-500 text-sm">No education information saved.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-md">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Skills and Certifications</h3>
            {skillndqua.certificate && skillndqua.skill ? (
              <div className="grid bg-gray-50 p-6 rounded-xl shadow-sm grid-cols-1 gap-3 text-lg text-gray-700">
                <p><span className="font-medium text-blue-600">Skills:</span> {skillndqua.skill}</p>
                <p><span className="font-medium text-blue-600">Certifications:</span> {skillndqua.certificate}</p>
              </div>
            ) : (
              <p className="text-red-500 text-sm">No skills or certifications saved.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-md">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Work Experience</h3>
            {workExp && workExp.length > 0 ? (
              <div className="space-y-4">
                {workExp.map((exp) => (
                  <div key={exp.id} className="grid grid-cols-1 gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                    <p className="text-lg font-medium text-blue-600">Company</p>
                    <p className="text-lg text-gray-700">{exp.company}</p>
                    <p className="text-lg font-medium text-blue-600">Role</p>
                    <p className="text-lg text-gray-700">{exp.title}</p>
                    <p className="text-lg font-medium text-blue-600">Duration</p>
                    <p className="text-lg text-gray-700">{exp.duration} years</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-red-500 text-sm">No work experience saved.</p>
            )}
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-md">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Documents</h3>
            <div className="grid grid-cols-1 gap-3 text-lg text-gray-700 bg-gray-50 p-6 rounded-xl shadow-sm">
              <p>
                <span className="font-medium text-blue-600">Resume:</span>{" "}
                <span className={resume ? "text-green-600" : "text-red-600"}>{resume ? "Uploaded" : "Not uploaded"}</span>
              </p>
              <p>
                <span className="font-medium text-blue-600">Cover Letter:</span>{" "}
                <span className={coverLetter ? "text-green-600" : "text-red-600"}>{coverLetter ? "Uploaded" : "Not uploaded"}</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReviewSubmit;