import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";

const SkillsQualifications = () => {
  const [skill, setSkills] = useState("");
  const [certf, setcertf] = useState("");

  const handlesaveskills = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkills(e.target.value);
  };
  const handlesavecertf = (e: React.ChangeEvent<HTMLInputElement>) => {
    setcertf(e.target.value);
  };

  const hnadleSubmit = () => {
    if (!skill && !certf) {
      alert("Please enter at least one skill or certification");
      return;
    }

    const mydata = { skill, certf };
    localStorage.setItem("skills", JSON.stringify(mydata));

    alert("Fields Updated ");
  };

 useEffect(() => {
  const storedData = JSON.parse(localStorage.getItem("skills") || "{}");
  if (storedData) {
    setSkills(storedData.skill || "");
    setcertf(storedData.certf || "");
  }
}, []);


  return (
    <div className="bg-gray-100 h-80 p-4">
      <form className="border border-gray-300 p-4">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Label>
                  <strong>Technical Skills</strong>
                </Label>
              </TableCell>
              <TableCell>
                <Label>
                  <strong>Certifications</strong>
                </Label>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Input
                  value={skill}
                  onChange={handlesaveskills}
                  placeholder="Enter your technical skills"
                />
              </TableCell>
              <TableCell>
                <Input
                  value={certf}
                  onChange={handlesavecertf}
                  placeholder="Enter your certifications"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="outline" onClick={hnadleSubmit}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SkillsQualifications;
