import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { updateEducation } from "@/app/slices";
import { useEffect } from "react";

export default function Education() {
  const dispatch = useAppDispatch();
  const { education } = useAppSelector((state) => state.applicationForm);

  const handleChange = (
    edu: keyof typeof education,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    dispatch(updateEducation({ edu, data: { [name]: value } }));
  };

  const handleSubmit = () => {
    if (education.graduation.cgpa) {
      localStorage.setItem("educationData", JSON.stringify(education));
      alert("Education data saved to localStorage!");
    } else {
      alert("incomplete");
    }
  };

  useEffect(()=>{
    const mydata = JSON.parse(localStorage.getItem('educationData')||"{}")

    if(mydata){
      dispatch(updateEducation(mydata))

    }
  },[dispatch])
  

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
                  value={education.ssc.university}
                  placeholder="Enter University"
                  onChange={(e) => handleChange("ssc", e)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="cgpa"
                  value={education.ssc.cgpa}
                  placeholder="Enter CGPA"
                  onChange={(e) => handleChange("ssc", e)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="passingyear"
                  value={education.ssc.passingyear}
                  placeholder="Enter Passing Year"
                  onChange={(e) => handleChange("ssc", e)}
                />
              </TableCell>
            </TableRow>

            {/* HSC Row */}
            <TableRow>
              <TableCell>
                <Label>
                  <strong>HSC</strong>
                </Label>
              </TableCell>
              <TableCell>
                <Input
                  name="university"
                  value={education.hsc.university}
                  placeholder="Enter University"
                  onChange={(e) => handleChange("hsc", e)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="cgpa"
                  value={education.hsc.cgpa}
                  placeholder="Enter CGPA"
                  onChange={(e) => handleChange("hsc", e)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="passingyear"
                  value={education.hsc.passingyear}
                  placeholder="Enter Passing Year"
                  onChange={(e) => handleChange("hsc", e)}
                />
              </TableCell>
            </TableRow>

            {/* Graduation Row */}
            <TableRow>
              <TableCell>
                <Label>
                  <strong>Graduation</strong>
                </Label>
              </TableCell>
              <TableCell>
                <Input
                  name="university"
                  value={education.graduation.university}
                  placeholder="Enter University"
                  onChange={(e) => handleChange("graduation", e)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="cgpa"
                  value={education.graduation.cgpa}
                  placeholder="Enter CGPA"
                  onChange={(e) => handleChange("graduation", e)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="passingyear"
                  value={education.graduation.passingyear}
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
                  value={education.postgraduation.university}
                  placeholder="Enter University"
                  onChange={(e) => handleChange("postgraduation", e)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="cgpa"
                  value={education.postgraduation.cgpa}
                  placeholder="Enter CGPA"
                  onChange={(e) => handleChange("postgraduation", e)}
                />
              </TableCell>
              <TableCell>
                <Input
                  name="passingyear"
                  value={education.postgraduation.passingyear}
                  placeholder="Enter Passing Year"
                  onChange={(e) => handleChange("postgraduation", e)}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="outline" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}
