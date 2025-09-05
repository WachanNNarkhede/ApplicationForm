import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { updateEducation } from "@/app/slices";
import { useEffect, useState } from "react";

export default function Education() {
 const dispatch = useAppDispatch();
  const { education } = useAppSelector((state) => state.applicationForm);
  const [isUploaded, setIsUploaded] = useState(false); // ✅ Track upload status

  const [formData, setFormData] = useState(education);

  const handleChange = (
    edu: keyof typeof education,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [edu]: {
        ...formData[edu],
        [name]: value,
      },
    });
  };

  const handleSubmit = () => {
    if (formData.graduation.cgpa) {
      localStorage.setItem("educationData", JSON.stringify(formData));

      (Object.keys(formData) as (keyof typeof education)[]).forEach((eduKey) => {
        dispatch(updateEducation({ edu: eduKey, data: formData[eduKey] }));
      });

      alert("Education data saved ");
         setIsUploaded(true); 
    } else {
      alert("Incomplete ");
    }
  };
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("educationData") || "{}");
    if (saved && Object.keys(saved).length > 0) {
      setFormData(saved);

        setIsUploaded(true); 

      (Object.keys(saved) as (keyof typeof education)[]).forEach((eduKey) => {
        dispatch(updateEducation({ edu: eduKey, data: saved[eduKey] }));
      });
    }
  }, [dispatch]);

  return (
    <div className="bg-gray-100 p-4">
      <form className="border border-gray-300 p-4">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Label>
                  <strong>School</strong>
                </Label>
              </TableCell>
              <TableCell>
                <Label>
                  <strong>Board/University</strong>
                </Label>
              </TableCell>
              <TableCell>
                <Label>
                  <strong>CGPA</strong>
                </Label>
              </TableCell>
              <TableCell>
                <Label>
                  <strong>Passing Year</strong>
                </Label>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Label>
                  <strong>SSC</strong>
                </Label>
              </TableCell>
              <TableCell>
                <Input
                  name="university"
                  value={formData.ssc.university}
                  placeholder="Enter University"
                                    onChange={(e) => handleChange("ssc", e)}

                />
              </TableCell>
              <TableCell>
                <Input
                  name="cgpa"
                  value={formData.ssc.cgpa}
                  placeholder="Enter CGPA"
                  type="number"
                  onChange={(e) => handleChange("ssc", e)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="passingyear"
                  type="number"
                  value={formData.ssc.passingyear}
                  placeholder="Enter Passing Year"
                  onChange={(e) => handleChange("ssc", e)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Label>
                  <strong>HSC</strong>
                </Label>
              </TableCell>
              <TableCell>
                <Input
                  name="university"
                  value={formData.hsc.university}
                  placeholder="Enter University"
                  onChange={(e) => handleChange("hsc", e)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="cgpa"
                  type="number"
                  value={
                    formData.hsc.cgpa}
                  placeholder="Enter CGPA"
                  onChange={(e) => handleChange("hsc", e)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="passingyear"
                  type="number"
                  value={
                    formData.hsc.passingyear}
                  placeholder="Enter Passing Year"
                  onChange={(e) => handleChange("hsc", e)}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Label>
                  <strong>Graduation</strong>
                </Label>
              </TableCell>
              <TableCell>
                <Input
                  name="university"
                  value={formData.graduation.university}
                  placeholder="Enter University"
                  onChange={(e) => handleChange("graduation", e)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="cgpa"
                  type="number"
                  value={formData.graduation.cgpa}
                  placeholder="Enter CGPA"
                  onChange={(e) => handleChange("graduation", e)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="passingyear"
                  type="number"
                  value={formData.graduation.passingyear}
                  placeholder="Enter Passing Year"
                  onChange={(e) => handleChange("graduation", e)}
                />
              </TableCell>
            </TableRow>

            {/* Post Graduation Row */}
            <TableRow>
              <TableCell>
                <Label>
                  <strong>Post Graduation</strong>
                </Label>
              </TableCell>
              <TableCell>
                <Input
                  name="university"
                  value={formData.postgraduation.university}
                  placeholder="Enter University"
                  onChange={(e) => handleChange("postgraduation", e)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="cgpa"
                  type="number"
                  value={formData.postgraduation.cgpa}
                  placeholder="Enter CGPA"
                  onChange={(e) => handleChange("postgraduation", e)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="passingyear"
                  type="number"
                  value={formData.postgraduation.passingyear}
                  placeholder="Enter Passing Year"
                  onChange={(e) => handleChange("postgraduation", e)}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="outline" onClick={handleSubmit}>
{isUploaded ? "Submit edited data" : "Submit"}          </Button>
        </div>
      </form>
    </div>
  );
}
