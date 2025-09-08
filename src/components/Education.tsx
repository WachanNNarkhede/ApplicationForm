import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { updateEducation } from "@/app/slices";
import {  useState } from "react";
import { toast } from "react-toastify";
import ClickSpark from "./ui/page.tsx/ClickSpark/ClickSpark";
import { initialState } from "@/app/slices";

export default function Education() {
  const dispatch = useAppDispatch();
  const { education } = useAppSelector((state) => state.applicationForm);
  const [isUploaded, setIsUploaded] = useState(false);
  const [formData, setFormData] = useState(education);

const handleChange = (
  edu: keyof typeof education,
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const { name, value } = e.target;

  let newValue = value;

  if (name === "cgpa") {
    if (value === "") {
      newValue = "";
    } else {
      const regx = /^\d{0,2}(\.\d{0,4})?$/;
      const numValue = parseFloat(value);
      if (!(regx.test(value) && numValue <= 10)) {
        return; 
      }
    }
  }

  if (name === "passingyear") {
    newValue = value.replace(/\D/g, "").slice(0, 4);
  }

  setFormData((prev) => ({
    ...prev,
    [edu]: { ...prev[edu], [name]: newValue },
  }));
};


  const handleSubmit = () => {
    const isComplete =
      formData.graduation.cgpa &&
      formData.graduation.passingyear &&
      formData.graduation.university &&
      formData.hsc.cgpa &&
      formData.hsc.passingyear &&
      formData.hsc.university &&
      formData.postgraduation.cgpa &&
      formData.postgraduation.passingyear &&
      formData.postgraduation.university &&
      formData.ssc.cgpa &&
      formData.ssc.passingyear &&
      formData.ssc.university;

    const isValidYear = [
      formData.ssc.passingyear,
      formData.hsc.passingyear,
      formData.graduation.passingyear,
      formData.postgraduation.passingyear,
    ].every((year) => /^\d{4}$/.test(year));

    if (isComplete && isValidYear) {
      localStorage.setItem("educationData", JSON.stringify(formData));
      (Object.keys(formData) as (keyof typeof education)[]).forEach(
        (eduKey) => {
          dispatch(updateEducation({ edu: eduKey, data: formData[eduKey] }));
        }
      );
      toast.success("Submitted", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      setIsUploaded(true);
    } else {
      const errorMessage = isComplete
        ? "All passing years must be exactly 4 digits (e.g., 2023)"
        : "Please complete all fields and ensure passing years are 4 digits";
      toast.error(errorMessage, {
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

  // useEffect(() => {
  //   const saved = JSON.parse(localStorage.getItem("educationData") || "{}");
  //   if (saved && Object.keys(saved).length > 0) {
  //     setFormData(saved);
  //     setIsUploaded(true);
  //     (Object.keys(saved) as (keyof typeof education)[]).forEach((eduKey) => {
  //       dispatch(updateEducation({ edu: eduKey, data: saved[eduKey] }));
  //     });
  //   }
  // }, [dispatch]);

  const handledelete = () => {
    localStorage.removeItem("educationData");
    setIsUploaded(false);

    setFormData(initialState.education);
    (Object.keys(initialState.education) as (keyof typeof education)[]).forEach(
      (val) => {
        dispatch(
          updateEducation({ edu: val, data: initialState.education[val] })
        );
      }
    );

    setFormData(education);
    setIsUploaded(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[550px] bg-gray-100 p-6 md:p-8">
      <h2 className="text-3xl font-extrabold heading text-blue-600 mb-6">
        Education Details
      </h2>
      <form className="border bg-white border-gray-300 p-8 max-w-4xl w-full rounded-lg shadow-md">
        <Table className="w-full">
          <TableBody>
            <TableRow>
              <TableCell className="w-1/4">
                <Label className="text-xl font-medium">School</Label>
              </TableCell>
              <TableCell className="w-1/4">
                <Label className="text-xl font-medium">Board/University</Label>
              </TableCell>
              <TableCell className="w-1/4">
                <Label className="text-xl font-medium">CGPA</Label>
              </TableCell>
              <TableCell className="w-1/4">
                <Label className="text-xl font-medium">Passing Year</Label>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-1/4">
                <Label className="text-xl font-medium">SSC</Label>
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="university"
                  value={formData.ssc.university}
                  placeholder="Enter University"
                  onChange={(e) => handleChange("ssc", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="cgpa"
                  value={formData.ssc.cgpa}
                  placeholder="Enter CGPA"
                  type="text"
                  maxLength={7}
                  onChange={(e) => handleChange("ssc", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="passingyear"
                  type="number"
                  value={formData.ssc.passingyear}
                  placeholder="Enter Passing Year"
                  maxLength={4}
                  minLength={4}
                  onChange={(e) => handleChange("ssc", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-1/4">
                <Label className="text-xl font-medium">HSC</Label>
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="university"
                  value={formData.hsc.university}
                  placeholder="Enter University"
                  onChange={(e) => handleChange("hsc", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="cgpa"
                  type="text"
                  value={formData.hsc.cgpa}
                  placeholder="Enter CGPA"
                  maxLength={7}
                  onChange={(e) => handleChange("hsc", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="passingyear"
                  type="number"
                  value={formData.hsc.passingyear}
                  placeholder="Enter Passing Year"
                  maxLength={4}
                  onChange={(e) => handleChange("hsc", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-1/4">
                <Label className="text-xl font-medium">Graduation</Label>
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="university"
                  value={formData.graduation.university}
                  placeholder="Enter University"
                  onChange={(e) => handleChange("graduation", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="cgpa"
                  type="text"
                  value={formData.graduation.cgpa}
                  placeholder="Enter CGPA"
                  maxLength={7}
                  onChange={(e) => handleChange("graduation", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="passingyear"
                  type="number"
                  value={formData.graduation.passingyear}
                  placeholder="Enter Passing Year"
                  maxLength={4}
                  onChange={(e) => handleChange("graduation", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-1/4">
                <Label className="text-xl font-medium">Post Graduation</Label>
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="university"
                  value={formData.postgraduation.university}
                  placeholder="Enter University"
                  onChange={(e) => handleChange("postgraduation", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="cgpa"
                  type="text"
                  value={formData.postgraduation.cgpa}
                  placeholder="Enter CGPA"
                  maxLength={7}
                  onChange={(e) => handleChange("postgraduation", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="passingyear"
                  type="number"
                  value={formData.postgraduation.passingyear}
                  placeholder="Enter Passing Year"
                  maxLength={4}
                  onChange={(e) => handleChange("postgraduation", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <ClickSpark
          sparkColor="#fff"
          sparkSize={20}
          sparkRadius={35}
          sparkCount={12}
          duration={400}
        >
          <div className="flex text-white justify-end gap-4 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleSubmit}
              className="text-base bg-black px-8 py-3"
            >
              {isUploaded ? "Submit edited data" : "Submit"}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="text-base bg-black px-8 py-3"
              onClick={handledelete}
            >
              Delete data
            </Button>
          </div>
        </ClickSpark>
      </form>
    </div>
  );
}
