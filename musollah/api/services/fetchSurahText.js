const BASE_URL = 'http://api.alquran.cloud/v1/surah';

export const fetchSurahText = async (surahNumber, offset = 0, limit = 10) => {
    try {
        const response = await fetch(`${BASE_URL}/${surahNumber}?offset=${offset}&limit=${limit}`)

        if (!response.ok) {
            throw new Error('Failed to fetch surah text');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch surah: ', error);
        throw error;
    }
}