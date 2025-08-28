import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function ApplicationForm() {
  const [formData, setFormData] = useState<PersonalInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

const Onsubmint = () => {
 
  if(formData.address && formData.email && formData.name && formData.phone){

localStorage.setItem("formData", JSON.stringify(formData));
  console.log(formData);

  alert("Submited")

  }else{
    alert('incomplete form ')
  }
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("formData")|| '{}');
    if (saved) {
      setFormData(saved);
    }
  }, []);
  
};


useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("formData") || '{}');
  if (saved) {
    setFormData(saved);
  }
}, []);

  return (
    <div className=" justify-center items-center  bg-gray-100 p-4">
      
        
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
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter your full name"
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Label >Email</Label>
                  </TableCell>
                  <TableCell>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter your email"
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Label >Phone</Label>
                  </TableCell>
                  <TableCell>
                    <Input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="Enter your phone number"
                    />
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <Label >Address</Label>
                  </TableCell>
                  <TableCell>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      placeholder="Enter your address"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <div className="flex justify-end gap-2 mt-4">
              <Button type="button" onClick={Onsubmint}>Submit</Button>
            </div>
          </form>
       </div>

  );
}
