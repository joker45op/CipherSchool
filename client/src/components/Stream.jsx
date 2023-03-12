import React from 'react'
import { useParams, useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';
import styles from './Stream.module.css'
import VideoGrid from './VideoGrid'
import { useEffect, useState } from 'react';
import axios from 'axios';


function Stream(props) {
  const location = useLocation()
  const { video } = location.state

  const [comments, setComments] = useState([])
  useEffect(() => {
    async function getComments() {
      const _videos = await axios.post(`http://localhost:3001/api/videos/${video._id}/comments`)
      setComments(_videos.data)
      console.log(comments)
    }
    getComments()
  }, [])

  async function handlePlay() {
    await axios.post(`http://localhost:3001/api/videos/${video._id}/views`)
  }

  return (
    <div>
      <ReactPlayer
        url={`http://localhost:3001/videos/${video.videoUrl}`}
        width="100%"
        height="100%"
        controls
        onPlay={handlePlay}
      />
      <div className={styles.under}>
        <div className={styles.left}>
          <span>
            {video.title}
          </span>
          <div className={styles.vls}>
            <div>
              <span>Views {video.views}</span>
              <span>
                {video.likes + " "}
                <img src={like ? "/liked.png" : "/like.png"} alt="" />
              </span>
            </div>
            <button onClick={shareLink("test", "http://localhost:3001")}>Share</button>
          </div>
          <div className={styles.comment}>
            Comments
          </div>
          {comments.length > 0 ?
            <ul>
              {comments.map((comment) => (
                <li key={comment._id}>{comment.text}</li>
              ))}
            </ul>
            : "No Comments"
          }
        </div>
        <div className={styles.hr} />
        <div className={styles.right}>
          <div>Other Videos</div>
          <VideoGrid />
        </div>
      </div>
    </div>
  )
}

function shareLink(title, url) {
  navigator.clipboard.writeText(url);
}

export default Stream