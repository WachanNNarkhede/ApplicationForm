import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PersonalInfo {
  name: string;
  email: string;
  phone: number;
  address: string;
}

interface EducationEntry {
  university: string;
  cgpa: string;
  passingyear: string;
}

interface Education {
  ssc: EducationEntry;
  hsc: EducationEntry;
  graduation: EducationEntry;
  postgraduation: EducationEntry;
}

interface ApplicationTypes {
  personalInfo: PersonalInfo;
  education: Education;
}

const initialState: ApplicationTypes = {
  personalInfo: {
    name: "",
    email: "",
    phone: 0,
    address: "",
  },
   education: {
    ssc: { university: "", cgpa: '', passingyear: '' },
    hsc: { university: "", cgpa: '', passingyear: ''},
    graduation: { university: "", cgpa: '', passingyear: '' },
    postgraduation: { university: "", cgpa: '', passingyear: '' },
  },
};
const applicationformSlice = createSlice({
  name: "applicationform",
  initialState,
  reducers: {

    updateEducation(
      state,
      action: PayloadAction<{ edu: keyof Education; data: Partial<EducationEntry> }>
    ) {
      const { edu, data } = action.payload;
      state.education[edu] = { ...state.education[edu], ...data };
    },
  },
});

export const { updateEducation } = applicationformSlice.actions;

export default applicationformSlice.reducer;
