import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks";
import { setSkilladQua } from "@/app/slices";
import { toast } from "react-toastify";
import ClickSpark from "./ui/page.tsx/ClickSpark/ClickSpark";

const SkillsQualifications = () => {
  const dispatch = useDispatch();
  const { skillndqua } = useAppSelector((state) => state.applicationForm);

  const [localSkills, setLocalSkills] = useState<{
    skill: string;
    certificate: string;
  }>({
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
    if (!localSkills.skill || !localSkills.certificate) {
      toast.error("Please enter at least one skill or certification");
      return;
    }

    localStorage.setItem("skills", JSON.stringify(localSkills));
    dispatch(setSkilladQua(localSkills));
    toast.success("Submitted ");
    setIsUploaded(true);
  };

  // useEffect(() => {
  //   const storedData = localStorage.getItem("skills");
  //   if (storedData) {
  //     const parsedData = JSON.parse(storedData);
  //     setLocalSkills({
  //       skill: parsedData.skill || "",
  //       certificate: parsedData.certificate || "",
  //     });
  //     dispatch(setSkilladQua(parsedData));
  //     setIsUploaded(true);
  //   }
  // }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-start min-h-[550px] bg-gray-100 p-2 md:p-4">
      <h2 className="text-3xl font-extrabold heading text-blue-600 mb-10 mt-8">
        Work Experience
      </h2>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="border border-gray-300 p-8 max-w-4xl max-h-[250px] w-full rounded-lg shadow-md bg-white overflow-auto"
      >
        <Table className="w-full">
          <TableBody>
            <TableRow>
              <TableCell className="w-1/2">
                <Label className="text-xl font-bold text-blue-400">
                  Technical Skills
                </Label>
              </TableCell>
              <TableCell className="w-1/2">
                <Label className="text-xl font-bold text-blue-400">
                  Certifications
                </Label>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-1/2">
                <Input
                  name="skill"
                  value={localSkills.skill}
                  onChange={handleChange}
                  placeholder="Enter your technical skills"
                  className="w-full h-12 py-3 text-base"
                />
              </TableCell>
              <TableCell className="w-1/2">
                <Input
                  name="certificate"
                  value={localSkills.certificate}
                  onChange={handleChange}
                  placeholder="Enter your certifications"
                  className="w-full h-12 py-3 text-base"
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
          <div className="flex justify-end gap-4 mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleSubmit}
              className="px-8 py-3 text-white bg-black text-base"
            >
              {isUploaded ? "Update" : "Submit"}
            </Button>
          </div>
        </ClickSpark>
      </form>
    </div>
  );
};

export default SkillsQualifications;
