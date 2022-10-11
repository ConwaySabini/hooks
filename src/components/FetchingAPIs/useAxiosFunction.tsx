import { useState, useEffect } from "react";
import axios from 'axios';

const useAxiosFunction = () => {
    const [response, setResponse] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); //different!
    const [controller, setController] = useState();

    // this will allow you to not only fetch data, but post, put, delete, etc
    const axiosFetch = async (configObj: any) => {
        const {
            axiosInstance,
            method,
            url,
            requestConfig = {}
        } = configObj;

        try {
            setLoading(true);
            const ctrl = new AbortController();
            setController(ctrl);
            const res = await axiosInstance(url, {
                method: method.toLowerCase(),
                ...requestConfig,
                signal: ctrl.signal
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

    useEffect(() => {
        console.log(controller)

        // useEffect cleanup function
        return () => controller && controller.abort();

    }, [controller]);

    return [response, error, loading, axiosFetch];
}

export default useAxiosFunction;









const BASE_URL = 'https://jsonplaceholder.typicode.com';

const axiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' }
});

const Posts = () => {
    const [posts, error, loading, axiosFetch] = useAxiosFunction();

    const getData = () => {
        axiosFetch({
            axiosInstance: axiosConfig,
            method: 'get',
            url: '/posts'
        });
    }

    useEffect(() => {
        getData();
        // eslint-disable-next-line 
    }, [])

    const handleSubmit = () => {
        axiosFetch({
            axiosInstance: axiosConfig,
            method: 'post',
            url: '/posts',
            requestConfig: {
                data: {
                    userId: 10,
                    title: 'Axios Stuff',
                    body: 'Axios hook stuff'
                }
            }
        });
    }

    return (
        <article>

            <h2>Posts</h2>

            <div className="row">
                <button onClick={handleSubmit}>Submit</button>
                <button onClick={getData}>Refetch</button>
            </div>

            {loading && <p>Loading...</p>}

            {!loading && error && <p className="errMsg">{error}</p>}

            {!loading && !error && posts?.length &&
                <ul>
                    {posts.map((post, i) => <li key={i}>{`${post.id}. ${post.title}`}</li>)}
                </ul>
            }

            {!loading && !error && !posts?.length && posts?.data &&
                <p>{`userId: ${posts.data?.userId}, 
                title: ${posts.data?.title}, body: ${posts.data?.body}`}</p>}

            {!loading && !error && !posts && <p>No posts to display</p>}
        </article>
    );
}
