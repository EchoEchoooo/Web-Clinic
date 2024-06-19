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

export const getMe = async (token) => {
  return axios.get(`${BASE_URL}/Account/GetSelf`, {
    headers: {
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const resetPassword = async (token) => {
  return axios.post(`${BASE_URL}/Account/ResetPassword`, null, {
    headers: {
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addDentist = async (token, email, name, phoneNumber) => {
  return axios.post(
    `${BASE_URL}/Clinic/AddDentist`,
    { email, name, phoneNumber },
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
    `${BASE_URL}/Clinic/DeleteSharedReport?reportId=${reportId}`,
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

export const getDentists = async (token, clinicId = null) => {
  const url = clinicId
    ? `${BASE_URL}/Clinic/GetDentists?clinicId=${clinicId}`
    : `${BASE_URL}/Clinic/GetDentists`;
  return axios.get(url, {
    headers: {
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addUserToClinicAdmin = async (token, userId, clinicId) => {
  const url = clinicId
    ? `${BASE_URL}/Clinic/AddUserToClinicAdmin?userId=${userId}&clinicId=${clinicId}`
    : `${BASE_URL}/Clinic/AddUserToClinicAdmin?userId=${userId}`;
  return axios.post(url, null, {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteClinic = async (token, clinicId) => {
  return axios.delete(`${BASE_URL}/Clinic/DeleteClinic/${clinicId}`, {
    headers: {
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const findNearbyClinics = async (
  token,
  latitude,
  longitude,
  radiusKm = 50,
) => {
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

export const getClinicAdmins = async (token, clinicId = null) => {
  const url = clinicId
    ? `${BASE_URL}/Clinic/GetClinicAdmins?clinicId=${clinicId}`
    : `${BASE_URL}/Clinic/GetClinicAdmins`;
  return axios.get(url, {
    headers: {
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getClinics = async (token, searchParams = {}) => {
  const params = new URLSearchParams(searchParams).toString();
  return axios.get(`${BASE_URL}/Clinic/GetClinics?${params}`, {
    headers: {
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeDentist = async (token, dentistId, clinicId = null) => {
  const url = clinicId
    ? `${BASE_URL}/Clinic/RemoveDentist?dentistId=${dentistId}&clinicId=${clinicId}`
    : `${BASE_URL}/Clinic/RemoveDentist?dentistId=${dentistId}`;
  return axios.delete(url, {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeUserFromClinicAdmin = async (
  token,
  userId,
  clinicId = null,
) => {
  const url = clinicId
    ? `${BASE_URL}/Clinic/RemoveUserFromClinicAdmin?userId=${userId}&clinicId=${clinicId}`
    : `${BASE_URL}/Clinic/RemoveUserFromClinicAdmin?userId=${userId}`;
  return axios.post(url, null, {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeUserFromClinicAdminByEmail = async (
  token,
  userEmail,
  clinicId = null,
) => {
  const url = clinicId
    ? `${BASE_URL}/Clinic/RemoveUserFromClinicAdminByEmail?userEmail=${userEmail}&clinicId=${clinicId}`
    : `${BASE_URL}/Clinic/RemoveUserFromClinicAdminByEmail?userEmail=${userEmail}`;
  return axios.post(url, null, {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateClinic = async (token, clinicId, updateRequest) => {
  return axios.patch(
    `${BASE_URL}/Clinic/UpdateClinic/${clinicId}`,
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

export const updateAppointment = async (
  token,
  appointmentId,
  updateRequest,
) => {
  return axios.patch(
    `${BASE_URL}/Appointment/UpdateAppointment/${appointmentId}`,
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

export const updateUser = async (token, userId, updateRequest) => {
  return axios.patch(`${BASE_URL}/Admin/UpdateUser/${userId}`, updateRequest, {
    headers: {
      Accept: "text/plain",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};
