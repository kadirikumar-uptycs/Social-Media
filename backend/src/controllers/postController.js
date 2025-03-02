const Post = require("../models/Post");
const cloudinary = require("cloudinary").v2;
const axios = require("axios");
const FormData = require("form-data");
const sendEmail = require("../utils/email");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const analyzeContent = async (content) => {
  let form = new FormData();

  if (content.text) form = { text: content.text };
  else if (content.file)
    form.append("file", content.file.buffer, {
      filename: content.file.originalname,
    });

  return axios.post(process.env.AI_API_URL, form);
};

const createPost = async (req, res) => {
  try {
    const analysis = await analyzeContent({
      text: req.body.text,
      file: req.file,
    });

    console.log(analysis.data);

    if (analysis.data.predicted_label === "cyberbullying") {
      sendEmail(req?.user?.email);
      return res
        .status(400)
        .json({ message: "Content violates community guidelines" });
    }

    let mediaUrl;
    if (req.file) {
      const uploadFromBuffer = (buffer) => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          stream.end(buffer);
        });
      };

      const result = await uploadFromBuffer(req.file.buffer);
      mediaUrl = result.secure_url;
    }

    const post = await Post.create({
      user: req.user._id, // Ensure correct reference
      text: req.body.text,
      mediaUrl,
      mediaType: req.file ? req.file.mimetype.split("/")[0] : "text",
    });

    const populatedPost = await Post.findById(post._id)
      .populate("user", "name profilePic")
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name profilePic",
        },
      });

    return res.status(201).json(populatedPost);
  } catch (err) {
    res
      .status(500)
      .json({ message: err.response?.data?.message || err?.message });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name profilePic",
        },
      })
      .populate("user", "name profilePic")
      .sort("-createdAt");
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user._id;

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      post.likes.push(userId);
    }

    await post.save();
    const updatedPost = await Post.findById(req.params.id).populate(
      "user",
      "name profilePic"
    );
    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.comments.push({
      user: req.user._id,
      text: req.body.text,
    });

    await post.save();

    const updatedPost = await Post.findById(req.params.id)
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name profilePic",
        },
      })
      .populate("user", "name profilePic");

    return res.status(201).json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createPost, getPosts, likePost, addComment };
