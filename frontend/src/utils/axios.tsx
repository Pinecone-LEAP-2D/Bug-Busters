import axios from "axios";

export const getBankCardById = async (userId: number) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/bankCard/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("error in getting bank card by user id", error);
  }
};

export const getAllProfiles = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/profile/allProfile`
    );
    return response.data;
  } catch (error) {
    console.log("error getting all profiles", error);
  }
};
