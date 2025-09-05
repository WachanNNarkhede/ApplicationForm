import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks";
import { setSkilladQua } from "@/app/slices";

const SkillsQualifications = () => {
  const dispatch = useDispatch();
  const { skillndqua } = useAppSelector((state) => state.applicationForm);

  const [localSkills, setLocalSkills] = useState<{ skill: string; certificate: string }>({
    skill: skillndqua?.skill || "",
    certificate: skillndqua?.certificate || "",
  });

  const [isUploaded, setIsUploaded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalSkills((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!localSkills.skill && !localSkills.certificate) {
      alert(" Please enter at least one skill or certification");
      return;
    }

    localStorage.setItem("skills", JSON.stringify(localSkills));
    dispatch(setSkilladQua(localSkills));

    alert("Fields Updated");
    setIsUploaded(true);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("skills");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setLocalSkills({
        skill: parsedData.skill || "",
        certificate: parsedData.certificate || "",
      });
      dispatch(setSkilladQua(parsedData));
      setIsUploaded(true);
    }
  }, [dispatch]);

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="border border-gray-300 p-4 rounded-md bg-white"
      >
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Label className="font-semibold">Technical Skills</Label>
              </TableCell>
              <TableCell>
                <Label className="font-semibold">Certifications</Label>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Input
                  name="skill"
                  value={localSkills.skill}
                  onChange={handleChange}
                  placeholder="Enter your technical skills"
                />
              </TableCell>
              <TableCell>
                <Input
                  name="certificate"
                  value={localSkills.certificate}
                  onChange={handleChange}
                  placeholder="Enter your certifications"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="outline" onClick={handleSubmit}>
            {isUploaded ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SkillsQualifications;
