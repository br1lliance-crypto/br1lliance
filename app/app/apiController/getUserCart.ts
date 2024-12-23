import axios from "axios";


  
const API_BASE_URL = 'http://localhost:1337/api'; // Базовый URL API
async function getUserCart(token: string) {

    const response = await axios.get(
        `${API_BASE_URL}/users/me?populate=*`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        }
      );
  
    if (!response) {
        console.log(response);
        return null;
    }
  
    return response.data;
}

export default getUserCart;