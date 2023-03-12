import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ThumbNail from './ThumbNail'
import styles from './VideoGrid.module.css'

function VideoGrid() {
    const [videos, setVideos] = useState([])
    useEffect(() => {
        async function getVideos() {
            const _videos = await axios.get('http://localhost:3001/api/videos')
            setVideos(_videos.data)
        }
        getVideos()
    }, [])

    return (
        <div className={styles.grid} id="video grid">
            {videos.map(video => (
                <ThumbNail key={video._id} video = {video} />
            ))}
            {videos.map(video => (
                <ThumbNail key={video._id} video = {video} />
            ))}
            {videos.map(video => (
                <ThumbNail key={video._id} video = {video} />
            ))}
            {videos.map(video => (
                <ThumbNail key={video._id} video = {video} />
            ))}
        </div>
    )
}

export default VideoGrid