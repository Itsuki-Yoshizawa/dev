import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// 新しいユーザーを登録
export const registerUser = async (username, email, password) => {
    await axios
    .post(`${API_URL}/auth/local/register`, {
        username,
        email,
        password,
    })
    .then((res) => {
        console.log(res.data.jwt);
    });
};