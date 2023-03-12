const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected db");
  })
  .catch(() => {
    console.error();
  });

// const video = sch.Video;
const { Video, Comment } = require("./models/Schemas");

app.use('/videos', express.static('public/videos'));

app.get("/api/videos", async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
});
app.post("/api/videos/add", (req, res) => {
  try {
    const { title, url, thumb } = req.body;
    const _video = new Video({
      title: title,
      videoUrl: url,
      thumb: thumb
    })
    _video.save()
    res.status(200).json({ message: "Video added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});
app.delete('/api/videos/:vid', async (req, res) => {
  try {
    const video = await Video.findById(req.params.vid);
    if (!video) {
      return res.status(404).send('Video not found');
    }
    await Video.deleteOne({ _id: video._id });
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});
app.post('/api/videos/:id/like', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404);
    }
    video.likes += 1;
    await video.save();
    res.status(200).json(video);
  } catch (err) {
    console.error(err);
    res.status(500);
  }
});
app.post('/api/videos/:id/views', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404);
    }
    video.views += 1;
    await video.save();
    return res.json(video);
  } catch (err) {
    console.error(err);
    return res.status(500).send();
  }
});
app.post('/api/videos/:id/comments/add', async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);
    const _comment = new Comment({
      text: req.body.comment
    })
    if (!video) {
      return res.status(404).send();
    }
    _comment.save()
    // comments is an array so using push
    video.comments.push(_comment);
    await video.save()
    res.status(200).send();

  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});
app.post("/api/videos/:id/comments", async (req, res) => {
  try {
    const videoId = req.params.id;
    // const video = await Video.findById(videoId).populate('comments');
    const video = await Video.findById(videoId).populate({
      path: 'comments',
      populate: {
        path: 'replies',
        populate: {
          path: 'replies',
          populate: {
            path: 'replies'
          }
        }
      }
    });
    const comments = video.comments;
    // const comments = await Comment.find()
    res.status(200).json(comments)

  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})
app.delete('/api/videos/:vid/comments/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.vid);
    const comment = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).send('Video not found');
    }
    if (!comment) {
      return res.status(404).send('Comment not found');
    }
    const video2 = await Video.findByIdAndUpdate(req.params.vid, { $pull: { comments: req.params.id } });
    await Comment.deleteOne({ _id: req.params.id });
    res.status(200).send();
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});
app.post('/api/videos/:vid/comments/:id/reply/add', async (req, res) => {
  try {
    const video = await Video.findById(req.params.vid);
    const comment = await Comment.findById(req.params.id);
    const reply = new Comment({
      text: req.body.reply
    })
    if (!video) {
      return res.status(404).send();
    }
    if (!comment) {
      return res.status(404).send();
    }
    console.log(video)
    console.log(comment)
    console.log(reply)
    await reply.save()
    comment.replies.push(reply);
    await comment.save()
    res.status(200).json(comment)
  } catch (err) {
    console.error(err)
    res.status(500).send()
  }
})


app.listen(3001, () => {
  console.log("server started");
});
