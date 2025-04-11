import axios from "axios";

export const getBankCardById = async (userId: number) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/bankCard/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("error in getting bank card by user id", error);
  }
};
