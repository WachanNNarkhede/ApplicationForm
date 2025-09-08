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
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks";
import { setWorkExp } from "@/app/slices";
import { toast } from "react-toastify";
import ClickSpark from "./ui/page.tsx/ClickSpark/ClickSpark";

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

  const [isUploaded, setIsUploaded] = useState(false);

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
          "Duration must be a number between 0 and 50 with up to 4 decimal places"
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
      setIsUploaded(true);
      toast.success("Work experience added!");
    } else {
      alert("Please fill all fields before adding a row");
    }
    if (onSubmit) onSubmit();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      workExp.length > 0 &&
      workExp.every((row) => row.company && row.title && row.duration)
    ) {
      localStorage.setItem("exp", JSON.stringify(workExp));
      dispatch(setWorkExp(workExp));
      toast.success(
        isUploaded ? " Work experience updated!" : "Work experience submitted!"
      );
      setIsUploaded(true);
      if (onSubmit) onSubmit();
    } else {
      toast.error(
        "Please add at least one complete work experience entry before submitting."
      );
    }
  };

  const handleDeleteRow = (id: number) => {
    const updatedRows = workExp.filter((row) => row.id !== id);
    dispatch(setWorkExp(updatedRows));
    localStorage.setItem("exp", JSON.stringify(updatedRows));

    if (updatedRows.length === 0) {
      setIsUploaded(false);
    }
    if (onSubmit) onSubmit();
  };

  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("exp") || "[]");
  //   if (Array.isArray(storedData) && storedData.length > 0) {
  //     dispatch(setWorkExp(storedData));
  //     setIsUploaded(true);
  //   }
  // }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-start min-h-[550px] bg-gray-100 p-2 md:p-4">
      <h2 className="text-3xl font-extrabold heading text-blue-600 mb-8 mt-4">
        Work Experience
      </h2>
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 p-8 max-w-4xl w-full rounded-lg shadow-md flex flex-col bg-white max-h-[550px] overflow-auto"
      >
        <Table className="w-full max-h-[400px] overflow-auto">
          <TableHeader>
            <TableRow>
              <TableHead className="w-2/5 text-xl font-medium">
                Company Name
              </TableHead>
              <TableHead className="w-2/5 text-xl font-medium">
                Job Title
              </TableHead>
              <TableHead className="w-1/5 text-xl font-medium">
                Duration (Years)
              </TableHead>
              <TableHead className="w-1/5 text-xl font-medium">
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
                  type="number"
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
        <ClickSpark
          sparkColor="#fff"
          sparkSize={20}
          sparkRadius={35}
          sparkCount={12}
          duration={400}
        >
          <div className="flex justify-end items-center mt-8">
            <Button
              type="submit"
              variant="outline"
              className="text-base bg-black text-white px-8 py-3"
            >
              {isUploaded ? "Update" : "Submit"}
            </Button>
          </div>
        </ClickSpark>
      </form>
    </div>
  );
};

export default WorkExp;
