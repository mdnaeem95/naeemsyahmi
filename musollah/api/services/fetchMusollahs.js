import axios from 'axios';

const fetchMusollahs = async () => {
    const data = JSON.stringify({
        "collection": "musollahs",
        "database": "musollahs",
        "dataSource": "Cluster0",
    });
    
    const config = {
        method: 'post',
        url: 'https://ap-southeast-1.aws.data.mongodb-api.com/app/data-pimhd/endpoint/data/v1/action/find',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Request-Headers': '*',
          'api-key': process.env.MONGODB_API_KEY,
        },
        data: data
    };
    
    try {
        const response = await axios(config);
        return response.data;
    } catch (error) {
        console.error('Error fetching musollahs:', error);
        throw error;
    }
}

export default fetchMusollahs;
