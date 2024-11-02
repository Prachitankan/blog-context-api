import { createContext, useState } from "react";
import {baseUrl} from "../baseUrl"


export const AppContext = createContext();


export default function AppContextProvider({children}){
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(null);


    //data filling
    async function fetchBlogPost(page=1, tag=null, catogory) {
        setLoading(true);
        let url = `${baseUrl}?page=${page}`;
        if(tag)
            url += `&tag=${tag}`;
        if(catogory)
            url += `&category=${catogory}`

        try{
            const result = await fetch(url);
            const data = await result.json();
            if(!data.posts || data.posts.length === 0)
                throw new Error("Something went wrong");
            console.log("API Responce", data);
            setPage(data.page);
            setPosts(data.posts);
            setTotalPages(data.totalPages)
        }
        catch(error){
            console.error("error in featching BlogPosts", error);
            setPage(1);
            setPosts([]);
            setTotalPages(null);
        }
        setLoading(false);
    }

    function handlePageChange(page){
        setPage(page);
        fetchBlogPost(page);
    }

    const value = {
        posts,
        setPosts,
        page,
        setPage,
        loading,
        setLoading,
        totalPages,
        setTotalPages,
        fetchBlogPost,
        handlePageChange
    }


    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
};