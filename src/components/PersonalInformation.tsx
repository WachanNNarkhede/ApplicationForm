import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks";
import { updatePersnalInfo } from "@/app/slices";

export default function ApplicationForm() {
  const dispatch = useDispatch();
  const { personalInfo } = useAppSelector((state) => state.applicationForm);

  const [formData, setFormData] = useState(personalInfo);
  const [isUploaded, setIsUploaded] = useState(false); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const Onsubmit = () => {
    if (formData.address && formData.email && formData.name && formData.phone) {
      // save only when submitted
      localStorage.setItem("formData", JSON.stringify(formData));

      dispatch(updatePersnalInfo(formData));
 
      alert("Submitted ✅");
              setIsUploaded(true); 

    } else {
      alert("Incomplete form ❌");
    }
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("formData") || "{}");
    if (saved && Object.keys(saved).length > 0) {
      setFormData(saved);        
      dispatch(updatePersnalInfo(saved)); 
              setIsUploaded(true); 

    }
  }, [dispatch]);

  return (
    <div className="justify-center items-center bg-gray-100 p-4">
      <form className="border border-gray-300 p-4">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>
                <Label>Name</Label>
              </TableCell>
              <TableCell>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Label>Email</Label>
              </TableCell>
              <TableCell>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Label>Phone</Label>
              </TableCell>
              <TableCell>
                <Input
                  id="phone"
                  type="number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <Label>Address</Label>
              </TableCell>
              <TableCell>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" onClick={Onsubmit}>
{isUploaded ? "Submit edited data" : "Submit"}             </Button>
        </div>
      </form>
    </div>
  );
}
