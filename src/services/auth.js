import axios from "axios";

const BASE_URL = "https://api.carident.live";

export const login = async (email, password) => {
  return axios.post(`${BASE_URL}/Account/Login`, {
    email: email,
    password: password,
  });
};

export const register = async (email, password) => {
  return axios.post(`${BASE_URL}/Account/Register`, {
    email: email,
    password: password,
  });
};

export const getMe = async () => {
  return axios.get(`${BASE_URL}/Account/GetSelf`);
};

export const resetPassword = async () => {
  return axios.post(`${BASE_URL}/Account/ResetPassword`);
};

export const addDentist = async (token, email, name, phoneNumber) => {
  return axios.post(
    `${BASE_URL}/Clinic/AddDentist`,
    { email: email, name: name, phoneNumber: phoneNumber },
    {
      headers: {
        Accept: "text/plain",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
};

export const getSharedReports = async (token) => {
  return axios.get(`${BASE_URL}/Clinic/GetSharedReports`, {
    headers: {
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteSharedReport = async (token, reportId) => {
  return axios.delete(
    `${BASE_URL}/Clinic/DeleteSharedReport/${reportId}`,
    {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const addUserToClinicAdminByEmail = async (token, userEmail) => {
  return axios.post(
    `${BASE_URL}/Clinic/AddUserToClinicAdminByEmail?userEmail=${userEmail}`,
    null,
    {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getAppointments = async (token) => {
  return axios.get(`${BASE_URL}/Appointment/GetAppointments`, {
    headers: {
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getClinic = async (clinicId, token) => {
  return axios.get(`${BASE_URL}/Clinic/GetClinic?clinicId=${clinicId}`, {
    headers: {
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getDentists = async (token) => {
  return axios.get(`${BASE_URL}/Clinic/GetDentists`, {
    headers: {
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addUserToClinicAdmin = async (token, userId, clinicId) => {
  return axios.post(
    `${BASE_URL}/Clinic/AddUserToClinicAdmin?userId=${userId}&clinicId=${clinicId}`,
    null,
    {
      headers: {
        Accept: "*/*",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const deleteClinic = async (token, clinicId) => {
  return axios.delete(`${BASE_URL}/Clinic/DeleteClinic/${clinicId}`, {
    headers: {
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const findNearbyClinics = async (token, latitude, longitude, radiusKm) => {
  return axios.get(
    `${BASE_URL}/Clinic/FindNearbyClinics?latitude=${latitude}&longitude=${longitude}&radiusKm=${radiusKm}`,
    {
      headers: {
        Accept: "text/plain",
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

export const getClinicAdmins = async (token, clinicId) => {
  return axios.get(`${BASE_URL}/Clinic/GetClinicAdmins?clinicId=${clinicId}`, {
    headers: {
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getClinics = async (token, searchParams) => {
  const params = new URLSearchParams(searchParams).toString();
  return axios.get(`${BASE_URL}/Clinic/GetClinics?${params}`, {
    headers: {
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateDentist = async (token, dentistId, updateRequest) => {
  return axios.patch(
    `${BASE_URL}/Clinic/UpdateDentist/${dentistId}`,
    updateRequest,
    {
      headers: {
        Accept: "text/plain",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );
};
