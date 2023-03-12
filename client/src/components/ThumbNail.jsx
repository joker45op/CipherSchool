import React, { useState } from 'react'
import styles from './ThumbNail.module.css'
import { Link,useParams } from 'react-router-dom';

function ThumbNail(props) {

    const [like, setLike] = useState(false)
    
    const serverUrl = 'http://localhost:3001';
    const thumbnailUrl = `${serverUrl}/videos/thumb/${props.video.thumb}`;

    return (
        <div className={styles.cont}>
            <Link to={`/videos/${props.video._id}`} style={{ width: "100%", display: 'flex', justifyContent: 'center', margin: 0 }} state={{ video: props.video,like: like }}>
                <img src={thumbnailUrl} alt="" />
            </Link>
            <span >{props.video.title}</span>
            <div>
                <span>{props.video.views} views</span>
                <span>{props.video.likes}
                    <img src={like ? "/liked.png" : "/like.png"} alt="" />
                </span>
                <button onClick={shareLink("test", "http://localhost:3001")}>Share</button>
            </div>
        </div>
    )
}

function shareLink(title, url) {
    navigator.clipboard.writeText(url);
}

export default ThumbNail