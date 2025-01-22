const baseURL = import.meta.env.VITE_BASE_URL;

export const urlAddSkills = `${baseURL}/addUserSkills`;
export const urlGetSkillsForUser = `${baseURL}/getSkillsForUser`;
export const urlModifyUserSkills = `${baseURL}/modifyUserSkills`;
export const urlGetOverallUserSkills = `${baseURL}/GetOverallUserSkills`;
export const urlGetTopTenSkills = `${baseURL}/GetTopTenSkills`;

export const urlgetAllUsers = `${baseURL}/getAllUsers`;
export const urlAddUser = `${baseURL}/addUser`;
export const urlGetUsersByDepartment = `${baseURL}/getUsersByDepartment`;

export const urlGetAllSkills = `${baseURL}/getAllSkills`;
export const urlAddSkill = `${baseURL}/addSkill`;

export const urlGetAllDepartments = `${baseURL}/getAllDepartments`;
export const urlAddDepartment = `${baseURL}/addDepartment`;

export const urlLogin = `${baseURL}/auth/login`;
