import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {  useAppSelector } from "@/app/hooks";
import { setWorkExp } from "@/app/slices";
import { toast } from "react-toastify";
import ClickSpark from "./ui/page.tsx/ClickSpark/ClickSpark";
import { useDispatch } from "react-redux";

interface WorkExpRow {
  id: number;
  company: string;
  title: string;
  duration: string;
}
interface WorkExpProps {
  onSubmit?: () => void;
}

const WorkExp: React.FC<WorkExpProps> = ({ onSubmit }) => {
  const dispatch = useDispatch();
  const workExp = useAppSelector((state) => state.applicationForm.workExp);

  const [formData, setFormData] = useState<Omit<WorkExpRow, "id">>({
    company: "",
    title: "",
    duration: "",
  });

  const handleAddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "duration") {
      const regex = /^\d{0,2}(\.\d{0,4})?$/;
      const numValue = parseFloat(value);
      if (
        value === "" ||
        (regex.test(value) && numValue >= 0 && numValue <= 50)
      ) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      } else {
        toast.error(
          "Duration must be a number between 0 and 50 with up to 4 decimal places",
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          }
        );
        return;
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddRow = () => {
    if (formData.company && formData.title && formData.duration) {
      const newRow = { id: Date.now(), ...formData };
      dispatch(setWorkExp([...workExp, newRow]));
      setFormData({ company: "", title: "", duration: "" });
      localStorage.setItem("exp", JSON.stringify([...workExp, newRow]));
      toast.success("Work experience added!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      if (onSubmit) onSubmit();
    } else {
      toast.error("Please fill all fields before adding a row", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const handleDeleteRow = (id: number) => {
    const updatedRows = workExp.filter((row) => row.id !== id);
    dispatch(setWorkExp(updatedRows));
    localStorage.setItem("exp", JSON.stringify(updatedRows));
    toast.success("Work experience deleted!", {
      position: "top-right",
      autoClose: 3000,
      theme: "colored",
    });
    if (onSubmit) onSubmit();
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-[550px] bg-gray-100 p-2 md:p-4">
      <h2 className="text-3xl font-extrabold heading text-blue-600 mb-8 mt-4">
        Work Experience
      </h2>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="border border-gray-300 p-8 max-w-4xl w-full rounded-lg shadow-md flex flex-col bg-white max-h-[550px] overflow-auto"
      >
        <Table className="w-full max-h-[400px] overflow-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="w-2/5 text-xl font-bold text-blue-400">
                Company Name
              </TableHead>
              <TableHead className="w-2/5 text-xl font-bold text-blue-400">
                Job Title
              </TableHead>
              <TableHead className="w-1/5 text-xl font-bold text-blue-400">
                Duration (Years)
              </TableHead>
              <TableHead className="w-1/5 text-xl font-bold text-blue-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="w-2/5">
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleAddChange}
                  placeholder="Enter company name"
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
              <TableCell className="w-2/5">
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleAddChange}
                  placeholder="Enter job title"
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
              <TableCell className="w-1/5">
                <Input
                  name="duration"
                  type="text"
                  value={formData.duration}
                  onChange={handleAddChange}
                  placeholder="Enter duration"
                  className="w-full text-base py-3 h-12"
                />
              </TableCell>
              <TableCell className="w-1/5">
                <ClickSpark
                  sparkColor="#fff"
                  sparkSize={20}
                  sparkRadius={35}
                  sparkCount={12}
                  duration={400}
                >
                  <Button
                    type="button"
                    onClick={handleAddRow}
                    className="bg-blue-500 text-white text-base px-6 py-3"
                  >
                    Add
                  </Button>
                </ClickSpark>
              </TableCell>
            </TableRow>
            {workExp.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="w-2/5">
                  <Input
                    value={row.company}
                    readOnly
                    className="w-full text-base py-3 h-12"
                  />
                </TableCell>
                <TableCell className="w-2/5">
                  <Input
                    value={row.title}
                    readOnly
                    className="w-full text-base py-3 h-12"
                  />
                </TableCell>
                <TableCell className="w-1/5">
                  <Input
                    value={row.duration}
                    readOnly
                    className="w-full text-base py-3 h-12"
                  />
                </TableCell>
                <TableCell className="w-1/5">
                  <ClickSpark
                    sparkColor="#fff"
                    sparkSize={20}
                    sparkRadius={35}
                    sparkCount={12}
                    duration={400}
                  >
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => handleDeleteRow(row.id)}
                      className="text-base px-6 py-3"
                    >
                      Delete
                    </Button>
                  </ClickSpark>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </form>
    </div>
  );
};

export default WorkExp;