export const fetchSurahText = async (surahNumber) => {
    try {
        const response = await fetch(`http://api.alquran.cloud/v1/surah/${surahNumber}`)

        if (!response.ok) {
            throw new Error('Failed to fetch surah');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch surah: ', error);
        throw error;
    }
}