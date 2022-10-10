import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
//If you are using different URLs, consider removing this line and adding a baseURL in the Axios Config parameter. 

const useAxios = (axiosParams: AxiosRequestConfig) => {
    const [response, setResponse] = useState<AxiosResponse>();
    const [error, setError] = useState<AxiosError>();
    const [loading, setLoading] = useState(axiosParams.method === "GET" || axiosParams.method === "get");

    const fetchData = async (params: AxiosRequestConfig) => {
        try {
            const result = await axios.request(params);
            setResponse(result);
        } catch (err: any) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const sendData = () => {
        fetchData(axiosParams);
    }

    useEffect(() => {
        if (axiosParams.method === "GET" || axiosParams.method === "get") {
            fetchData(axiosParams);
        }
    }, []);

    return { response, error, loading, sendData };
}

export default useAxios;


// usage


function App() {
    const [postId, setPostId] = useState(1);
    const { response, loading, error, sendData } = useAxios({
        method: "get",
        url: `/posts/${postId}`,
        headers: {
            accept: '*/*'
        }
    });

    const getNextPost = () => {
        setPostId(postId + 1);
        sendData();
    }
    return (
        <div className="App">
            <h1 className="page-title">Posts</h1>
            {loading && (
                <p>Loading...</p>
            )}
            {error && (
                <p>{error.message}</p>
            )}
            {!loading && !error && (
                <article className="post">
                    <h3 className="post-title">{response?.data.title}</h3>
                    <p className="post-body">
                        {response?.data.body}
                    </p>
                </article>
            )}
            <button onClick={() => getNextPost()}>
                Next Article Please!
            </button>
        </div>
    );
}
