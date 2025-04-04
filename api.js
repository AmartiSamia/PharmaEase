import axios from 'axios';

export const fetchPharmacies = async () => {
    try {
        let currentDate = new Date().toISOString().slice(0, 10);
        const data = {
            "dateGarde": `${currentDate} 00:00:00`,
            latitude: 0, // Replace with actual latitude if available
            longitude: 0, // Replace with actual longitude if available
        };

        let response = await axios.post("https://admin.tangergarde.ma:7007/api/v1/tour-garde/getGardes", data, {
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
                "Connection": "keep-alive",
                "Content-Type": "application/json",
                "Origin": "https://www.tangergarde.ma",
                "Referer": "https://www.tangergarde.ma/",
                "Sec-Fetch-Dest": "empty",
                "Sec-Fetch-Mode": "cors",
                "Sec-Fetch-Site": "same-site",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
                "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "\"Windows\""
            }
        });

        // If response is empty, try with yesterday's date
        if (!response.data.length) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            currentDate = yesterday.toISOString().slice(0, 10);
            data.dateGarde = `${currentDate} 00:00:00`;
            response = await axios.post("https://admin.tangergarde.ma:7007/api/v1/tour-garde/getGardes", data, {
                headers: {
                    "Accept": "application/json, text/plain, */*",
                    "Accept-Language": "fr-FR,fr;q=0.9,en;q=0.8",
                    "Connection": "keep-alive",
                    "Content-Type": "application/json",
                    "Origin": "https://www.tangergarde.ma",
                    "Referer": "https://www.tangergarde.ma/",
                    "Sec-Fetch-Dest": "empty",
                    "Sec-Fetch-Mode": "cors",
                    "Sec-Fetch-Site": "same-site",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
                    "sec-ch-ua": "\"Google Chrome\";v=\"123\", \"Not:A-Brand\";v=\"8\", \"Chromium\";v=\"123\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-ch-ua-platform": "\"Windows\""
                }
            });
        }

        return response.data;
    } catch (error) {
        console.error(error);
        throw error; // Re-throw the error for handling in the component
    }
};
