import React, { useState, useEffect } from 'react'
import axios from "axios"
import SingleContent from '../../components/SingleContent/SingleContent'
import './Trending.css'
import CustomePagination from '../../components/Pagination/CustomePagination'

const Trending = () => {
    const [content, setContent] = useState([])
    const [page, setPage] = useState(1)

    const fetechTrending = async () => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
        // console.log(data);
        setContent(data.results);
    }
    useEffect(() => {
        fetechTrending();
        //eslint-disable-next-line
    }, [page])

    return (
        <div >
            <span className='pageTitle'>Trending</span>
            <div className="trending">
                {
                    content && content.map((c) =>
                        // console.log(c);
                        <SingleContent key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type={c.media_type}
                            vote_average={c.vote_average}
                        />
                    )
                }
            </div>
            <CustomePagination setPage={setPage} />
        </div>
    )
}

export default Trending;