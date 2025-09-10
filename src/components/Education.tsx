import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useAppSelector, useAppDispatch } from "@/app/hooks";
import { updateEducation } from "@/app/slices";
import { toast } from "react-toastify";

export default function Education() {
  const dispatch = useAppDispatch();
  const { education } = useAppSelector((state) => state.applicationForm);

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
          toast.error("CGPA must be a number between 0 and 10 with up to 4 decimal places", {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
          return;
        }
      }
    }

    if (name === "passingyear") {
      const year = value.replace(/\D/g, "").slice(0, 4);
      if (Number(year) > 2031) {
        toast.error("Passing year must be 2031 or earlier", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        return;
      }
      newValue = year && Number(year) <= 2031 ? year : "";
    }

    dispatch(updateEducation({ edu, data: { ...education[edu], [name]: newValue } }));
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
                <Label className="text-xl font-bold text-blue-400">Level</Label>
              </TableCell>
              <TableCell className="w-1/4">
                <Label className="text-xl font-bold text-blue-400">Board/University</Label>
              </TableCell>
              <TableCell className="w-1/4">
                <Label className="text-xl font-bold text-blue-400">CGPA</Label>
              </TableCell>
              <TableCell className="w-1/4">
                <Label className="text-xl font-bold text-blue-400">Passing Year</Label>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-1/4">
                <Label className="text-xl font-bold text-blue-400">SSC</Label>
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="university"
                  value={education.ssc.university}
                  placeholder="Enter University"
                  onChange={(e) => handleChange("ssc", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="cgpa"
                  value={education.ssc.cgpa}
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
                  type="text"
                  value={education.ssc.passingyear}
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
                <Label className="text-xl font-bold text-blue-400">HSC</Label>
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="university"
                  value={education.hsc.university}
                  placeholder="Enter University"
                  onChange={(e) => handleChange("hsc", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="cgpa"
                  type="text"
                  value={education.hsc.cgpa}
                  placeholder="Enter CGPA"
                  maxLength={7}
                  onChange={(e) => handleChange("hsc", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="passingyear"
                  type="text"
                  value={education.hsc.passingyear}
                  placeholder="Enter Passing Year"
                  maxLength={4}
                  onChange={(e) => handleChange("hsc", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-1/4">
                <Label className="text-xl font-bold text-blue-400">Graduation</Label>
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="university"
                  value={education.graduation.university}
                  placeholder="Enter University"
                  onChange={(e) => handleChange("graduation", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="cgpa"
                  type="text"
                  value={education.graduation.cgpa}
                  placeholder="Enter CGPA"
                  maxLength={7}
                  onChange={(e) => handleChange("graduation", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="passingyear"
                  type="text"
                  value={education.graduation.passingyear}
                  placeholder="Enter Passing Year"
                  maxLength={4}
                  onChange={(e) => handleChange("graduation", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-1/4">
                <Label className="text-xl font-bold text-blue-400">Post Graduation</Label>
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="university"
                  value={education.postgraduation.university}
                  placeholder="Enter University"
                  onChange={(e) => handleChange("postgraduation", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="cgpa"
                  type="text"
                  value={education.postgraduation.cgpa}
                  placeholder="Enter CGPA"
                  maxLength={7}
                  onChange={(e) => handleChange("postgraduation", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
              <TableCell className="w-1/4">
                <Input
                  name="passingyear"
                  type="text"
                  value={education.postgraduation.passingyear}
                  placeholder="Enter Passing Year"
                  maxLength={4}
                  onChange={(e) => handleChange("postgraduation", e)}
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>
    </div>
  );
}