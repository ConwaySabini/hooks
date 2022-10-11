import { useState, useEffect } from "react";
import axios from 'axios';

// will only fetch data, not other operations such as post, put, delete, etc
const useAxios = (configObj: any) => {
    const {
        axiosInstance,
        method,
        url,
        requestConfig = {}
    } = configObj;

    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    // will reload the component using the hook on another fetch
    const [reload, setReload] = useState(0);

    const refetch = () => setReload(prev => prev + 1);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                const res = await axiosInstance[method.toLowerCase()](url, {
                    ...requestConfig,
                    signal: controller.signal
                });
                console.log(res);
                setResponse(res.data);
            } catch (err: any) {
                console.log(err.message);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        // call the function
        fetchData();

        // useEffect cleanup function
        return () => controller.abort();

        // eslint-disable-next-line
    }, [reload]);

    return [response, error, loading, refetch];
}

export default useAxios;






const BASE_URL = 'https://icanhazdadjoke.com';

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});


const Jokes = () => {

    const [joke, error, loading, refetch] = useAxios({
        axiosInstance: axiosConfig,
        method: 'GET',
        url: '/',
        requestConfig: {
            headers: {
                'Content-Language': 'en-US',
                //'Accept': 'text/html'
            }
        }
    });

    return (
        <article>

            <h2>Random Dad Joke</h2>

            {loading && <p>Loading...</p>}

            {!loading && error && <p className="errMsg">{error}</p>}

            {!loading && !error && joke && <p>{joke?.joke}</p>}

            {!loading && !error && !joke && <p>No dad joke to display</p>}

            <button onClick={() => refetch()}>Get Joke</button>
        </article>
    );
}
