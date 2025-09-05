import { useEffect, useState } from "react";
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

interface WorkExpRow {
  id: number;
  company: string;
  title: string;
  duration: string;
}

const WorkExp = () => {
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddRow = () => {
    if (formData.company && formData.title && formData.duration) {
      const newRow = { id: Date.now(), ...formData };
      dispatch(setWorkExp([...workExp, newRow]));
      setFormData({ company: "", title: "", duration: "" });
      setIsUploaded(true); 
    } else {
      alert("Please fill all fields before adding a row");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("exp", JSON.stringify(workExp));
    alert(isUploaded ? " Work experience updated!" : "Work experience submitted!");
    setIsUploaded(true);
  };

  const handleDeleteRow = (id: number) => {
    const updatedRows = workExp.filter((row) => row.id !== id);
    dispatch(setWorkExp(updatedRows));
    localStorage.setItem("exp", JSON.stringify(updatedRows));

    if (updatedRows.length === 0) {
      setIsUploaded(false);
    }
  };

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("exp") || "[]");
    if (Array.isArray(storedData) && storedData.length > 0) {
      dispatch(setWorkExp(storedData));
      setIsUploaded(true); 
    }
  }, [dispatch]);

  return (
    <div className="bg-gray-100 min-h-96 p-4">
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 p-4 flex flex-col rounded-md bg-white"
      >
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Duration (Years)</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Row for adding new experience */}
            <TableRow>
              <TableCell>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleAddChange}
                  placeholder="Enter company name"
                />
              </TableCell>
              <TableCell>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleAddChange}
                  placeholder="Enter job title"
                />
              </TableCell>
              <TableCell>
                <Input
                  name="duration"
                  type="number"
                  value={formData.duration}
                  onChange={handleAddChange}
                  placeholder="Enter duration"
                />
              </TableCell>
              <TableCell>
                <Button
                  type="button"
                  onClick={handleAddRow}
                  className="bg-blue-500 text-white"
                >
                  Add
                </Button>
              </TableCell>
            </TableRow>

            {/* Existing work experience rows */}
            {workExp.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Input value={row.company} readOnly />
                </TableCell>
                <TableCell>
                  <Input value={row.title} readOnly />
                </TableCell>
                <TableCell>
                  <Input value={row.duration} readOnly />
                </TableCell>
                <TableCell>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => handleDeleteRow(row.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex justify-end items-center mt-6">
          <Button type="submit" variant="outline">
            {isUploaded ? "Update" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WorkExp;
