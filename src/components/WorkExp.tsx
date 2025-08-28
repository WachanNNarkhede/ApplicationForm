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

interface WorkExpRow {
  id: number;
  company: string;
  title: string;
  duration: string;
}

const WorkExp = () => {
  const [rows, setRows] = useState<WorkExpRow[]>([]);
  const [formData, setFormData] = useState<Omit<WorkExpRow, "id">>({
    company: "",
    title: "",
    duration: "",
  });

  const handleaddChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const handleAddRow = () => {
  if (formData.company && formData.title && formData.duration) {
    setRows((prev) => [...prev, { id: Date.now(), ...formData }]);
    setFormData({ company: "", title: "", duration: "" });
  }
};



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Submitted Data: " );
    localStorage.setItem('exp',JSON.stringify(rows))

  };

const handleEditRow = () => {

};


  const handleDeleteRow = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };


   useEffect(() => {
    const saved = localStorage.getItem("exp");
    if (saved) {
      setRows(JSON.parse(saved));
    }
  }, []);
  return (
    <div className="bg-gray-100 min-h-96 p-4">
      <form
        onSubmit={handleSubmit}
        className="border border-gray-300 p-4 flex flex-col"
      >
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Job Title</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleaddChange}
                  placeholder="Enter company name"
                />
              </TableCell>
              <TableCell>
                <Input
                  name="title"
                  value={formData.title}
                  onChange={handleaddChange}
                  placeholder="Enter job title"
                />
              </TableCell>
              <TableCell>
                <Input
                  name="duration"
                  value={formData.duration}
                  onChange={handleaddChange}
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

      
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <Input
                  
                    value={row.company}
                    onChange={() => handleEditRow()}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={row.title}
                    onChange={() => handleEditRow()}
                  />
                </TableCell>
                <TableCell>
                  <Input
                  
                    value={row.duration}
                    onChange={() => handleEditRow()}
                  />
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
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default WorkExp;
