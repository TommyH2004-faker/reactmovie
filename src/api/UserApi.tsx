import { endpointBe } from "../utils/contant";

export const getAllUserCount = async () => {
  try {
    const response = await fetch(`${endpointBe}/users/count`);
    if (!response.ok) throw new Error("Failed to fetch users");
    return await response.json(); // trả về số lượng user
  } catch (error) {
    console.error(error);
    return 0; // trả về 0 nếu lỗi
  }
};