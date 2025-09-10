import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import {  useAppSelector } from "@/app/hooks";
import { updatePersnalInfo } from "@/app/slices";
import { useDispatch } from "react-redux";

export default function PersonalInformation() {
  const dispatch = useDispatch();
  const { personalInfo } = useAppSelector((state) => state.applicationForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let newValue = value;

    if (name === "phone") {
      newValue = value.replace(/\D/g, "").slice(0, 10);
    }
    dispatch(updatePersnalInfo({ ...personalInfo, [name]: newValue }));
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("formData") || "{}");
    const updatedpersonalInfo = {
      name: saved.name ?? "",
      email: saved.email ?? "",
      phone: saved.phone ?? "",
      address: saved.address ?? "",
    };
    dispatch(updatePersnalInfo(updatedpersonalInfo));
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-start min-h-[550px] bg-gray-100 md:p-8">
      <h2 className="text-3xl font-extrabold heading text-blue-600 mb-6">
        Personal Information
      </h2>
      <form className="border bg-white p-16 max-w-4xl w-full rounded-lg shadow-lg">
        <Table className="w-full">
          <TableBody>
            <TableRow>
              <TableCell className="w-1/4">
                <Label className="text-xl font-bold text-blue-400">Name</Label>
              </TableCell>
              <TableCell className="w-3/4">
                <Input
                  id="name"
                  name="name"
                  value={personalInfo.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="heading w-full text-base py-3 h-12"
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-1/4">
                <Label className="text-xl font-bold text-blue-400">Email</Label>
              </TableCell>
              <TableCell className="w-3/4">
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={personalInfo.email}
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
                  value={personalInfo.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="heading w-full text-base py-3 h-12"
                  inputMode="numeric"
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
                  value={personalInfo.address}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="heading w-full text-base py-3 h-12"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </form>
    </div>
  );
}