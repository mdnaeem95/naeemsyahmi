export const fetchSurahs = async () => {
    try {
        const response = await fetch(`http://api.alquran.cloud/v1/surah`)

        if (!response.ok) {
            throw new Error('Failed to fetch surahs');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch surahs: ', error);
        throw error;
    }
}