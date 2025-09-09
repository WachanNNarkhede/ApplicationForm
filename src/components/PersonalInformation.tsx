import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/app/hooks";
import { updatePersnalInfo } from "@/app/slices";
import { toast } from "react-toastify";
import ClickSpark from "./ui/page.tsx/ClickSpark/ClickSpark";

export default function ApplicationForm() {
  const dispatch = useDispatch();
  const { personalInfo } = useAppSelector((state) => state.applicationForm);

  const [formData, setFormData] = useState(personalInfo);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === "phone") {
      value = value.replace(/\D/g, "");
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const Onsubmit = () => {
    if (formData.address && formData.email && formData.name && formData.phone) {
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/;

      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return;
      }

      const phone = /^\d{10}$/;

      if (!phone.test(formData.phone)) {
        toast.error("Please enter a valid Phone Number", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return;
      }

      const re = /^[a-zA-Z0-9_ ]+$/;
      if (!re.test(formData.name && formData.address)) {
        toast.error("Please dont use Symboles in Name and Adress", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });
        return;
      }

      localStorage.setItem("formData", JSON.stringify(formData));

      dispatch(updatePersnalInfo(formData));

      toast.success("Submitted ");
      setIsUploaded(true);
    } else {
      toast.error("Incomplete ");
    }
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("formData") || "{}");
    if (saved) {
      setFormData(saved);
      dispatch(updatePersnalInfo(saved));
      setIsUploaded(true);
    }
  }, [dispatch]);

  return (
    <div className="flex flex-col  items-center justify-start min-h-[550px] bg-gray-100 md:p-8">
      <h2 className="text-3xl font-extrabold heading text-blue-600 mb-6">
        Personal Information
      </h2>
      
      <form className="border  bg-white p-16 max-w-4xl w-full rounded-lg shadow-lg">
        <Table className="w-full ">
          <TableBody>
            <TableRow>
              <TableCell className="w-1/4">
                <Label className="text-xl font-bold text-blue-400">Name</Label>
              </TableCell>
              <TableCell className="w-3/4">
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="heading w-full text-base py-3 h-12"
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="w-1/4">
                <Label className="text-xl font-bold text-blue-400" >Email</Label>
              </TableCell>
              <TableCell className="w-3/4">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="heading w-full text-base py-3 h-12"
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="w-1/4">
                <Label className="text-xl font-bold text-blue-400">Phone</Label>
              </TableCell>
              <TableCell className="w-3/4">
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="heading w-full text-base py-3 h-12"
                  inputMode="numeric"
                  pattern="\d{10}"
                  maxLength={10}
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell className="w-1/4">
                <Label className="text-xl font-bold text-blue-400">Address</Label>
              </TableCell>
              <TableCell className="w-3/4">
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="heading w-full text-base py-3 h-12"
                />
              </TableCell>
            </TableRow>
            <TableRow></TableRow>
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
              onClick={Onsubmit}
              className="text-base px-8 py-3"
            >
              {isUploaded ? "Submit edited data" : "Submit"}
            </Button>
          </div>
        </ClickSpark>
      </form>
    </div>
  );
}
