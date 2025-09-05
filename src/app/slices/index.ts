import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
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

interface SkillndQua {
  skill: string,
  certificate: string

}

interface WorkExpRow {
  id: number;
  company: string;
  title: string;
  duration: string;
}
export interface ApplicationTypes {
  personalInfo: PersonalInfo;
  education: Education;
  resume: string | null;
  coverLetter: string | null;
  skillndqua: SkillndQua;
  workExp: WorkExpRow[];
}

const initialState: ApplicationTypes = {
  personalInfo: {
    name: "",
    email: "",
    phone: '',
    address: "",
  },
  education: {
    ssc: { university: "", cgpa: '', passingyear: '' },
    hsc: { university: "", cgpa: '', passingyear: '' },
    graduation: { university: "", cgpa: '', passingyear: '' },
    postgraduation: { university: "", cgpa: '', passingyear: '' },
  },

  resume: null,
  coverLetter: null,
  skillndqua: {
    skill: '',
    certificate: ""
  },
  workExp: [],


};
const applicationformSlice = createSlice({
  name: "applicationform",
  initialState,
  reducers: {
    updatePersnalInfo(state, action) {
      state.personalInfo = {
        ...state.personalInfo,
        ...action.payload
      }
    },

    updateEducation(
      state,
      action: PayloadAction<{ edu: keyof Education; data: Partial<EducationEntry> }>
    ) {
      const { edu, data } = action.payload;
      state.education[edu] = { ...state.education[edu], ...data };
    },
    setResume(state, action: PayloadAction<string | null>) {
      state.resume = action.payload;
    },
    setCoverLetter(state, action: PayloadAction<string | null>) {
      state.coverLetter = action.payload;
    },
    setSkilladQua(state, action: PayloadAction<SkillndQua>) {
      state.skillndqua = action.payload
    },
    setWorkExp(state, action: PayloadAction<WorkExpRow[]>) {
      state.workExp = action.payload;
    },
  },
});

export const { updatePersnalInfo, updateEducation, setCoverLetter, setResume, setSkilladQua, setWorkExp } = applicationformSlice.actions;

export default applicationformSlice.reducer;
