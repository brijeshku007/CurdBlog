const Post = require('../models/Post');

exports.createPost = async (req, res) => {
  try {
    const post = new Post({ ...req.body, user: req.user.id });
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    Object.assign(post, req.body);
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.user.toString() !== req.user.id)
      return res.status(403).json({ message: 'Unauthorized' });

    await Post.findByIdAndDelete(post);
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
