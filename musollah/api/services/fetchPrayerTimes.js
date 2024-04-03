export const fetchPrayerTimes = async (city, date) => {
    try {
        const response = await fetch(`http://api.aladhan.com/v1/timingsByCity?city=Singapore&country=Singapore&method=8`)

        if (!response.ok) {
            throw new Error('Failed to fetch prayer times');
        }

        const data = await response.json();
        //console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching prayer times: ', error);
        throw error;
    }
}