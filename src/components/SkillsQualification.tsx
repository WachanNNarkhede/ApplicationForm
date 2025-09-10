import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {  useAppSelector } from "@/app/hooks";
import { setSkilladQua } from "@/app/slices";
import { useDispatch } from "react-redux";

const SkillsQualifications = () => {
  const dispatch = useDispatch();
  const { skillndqua } = useAppSelector((state) => state.applicationForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setSkilladQua({ ...skillndqua, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[550px] bg-gray-100 p-2 md:p-4">
      <h2 className="text-3xl font-extrabold heading text-blue-600 mb-10 mt-8">
        Skills and Certificates
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
                  value={skillndqua.skill}
                  onChange={handleChange}
                  placeholder="Enter your technical skills"
                  className="w-full h-12 py-3 text-base"
                />
              </TableCell>
              <TableCell className="w-1/2">
                <Input
                  name="certificate"
                  value={skillndqua.certificate}
                  onChange={handleChange}
                  placeholder="Enter your certifications"
                  className="w-full h-12 py-3 text-base"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>
    </div>
  );
};

export default SkillsQualifications;