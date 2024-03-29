export const isProfileCompleted = (profileData) => {
  const requiredFields = ["name", "bio", "home_country", "gender", "birthdate"];

  return requiredFields.every((field) => {
    const value = profileData[field];
    return value !== null && value !== "" && value !== "Select gender";
  });
};
