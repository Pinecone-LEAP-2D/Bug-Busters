import { CreateProfileParams } from "@/type";
import axios from "axios"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const instance = axios.create({ baseURL: BASE_URL });

export const getProfile = async (userId: number) => {
    const { data } = await instance.get(`/profile?userId=${userId}`);
    return data
}

export const createProfile = async ({ name, about, avatarImage, socialMediaURL, backgroundImage, successMessage, userId }: CreateProfileParams) => {
    const { data } = await instance.post(`/profile`, { name, about, avatarImage, socialMediaURL, backgroundImage, successMessage, userId });
    return data
}

export const updateProfile = async (ProfileID: string) => {
    const { data } = await instance.put(`/profile`, ProfileID);
    return data
}

export const deleteProfile = async (ProfileID: string) => {
    const { data } = await instance.delete(`/profile`, {
        data: { ProfileID }
    })
    return data
}