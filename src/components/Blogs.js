import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function Header() {

    const { posts, loading } = useContext(AppContext);

    return (
        <div className='w-11/12 max-w-2xl mx-auto flex flex-col gap-y-10 my-4'>
            {
                loading ? (<div className='min-h-[80vh] flex justify-center items-center text-3xl font-semibold'>Loading...</div>) : (
                    posts.length === 0 ? (<div className='min-h-[80vh] w-full flex justify-center items-center'>
                        <p className='text-center font-bold text-3xl'>No Post Found!</p>
                    </div>) :
                        (posts.map((post) => (
                            <div key={post.id}>
                                <p className='text-xl font-bold'>{post.title}</p>
                                <p className='text-sm my-1'>
                                    By <span className='italic'>{post.author}</span> on <span className='underline font-semibold cursor-pointer'>{post.category}</span>
                                </p>
                                <p className='text-sm'>Posted on {post.date}</p>
                                <p className='mt-4 mb-2'>{post.content}</p>
                                <div className='flex flex-wrap gap-x-2 items-center'>
                                    {post.tags.map((tag, index) => {
                                        return <span key={index} className='text-xs flont-semibold underline text-blue-700 cursor-pointer'>{`#${tag}`}</span>
                                    })}
                                </div>
                            </div>
                        )))
                )
            }
        </div>
    )
}