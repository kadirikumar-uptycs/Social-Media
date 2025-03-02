import { useState } from 'react';
import { Avatar, Card, CardContent, CardMedia, IconButton, Typography, Box, TextField, InputAdornment, Collapse } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Favorite, Comment, Send, ExpandMore } from '@mui/icons-material';
import { red, grey } from '@mui/material/colors';
import TimeAgo from 'react-timeago';
import { useDispatch } from 'react-redux';
import { likePost, commentPost } from '../features/postSlice';

const PostCard = ({ post }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const dispatch = useDispatch();

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            dispatch(commentPost({ postId: post._id, comment: newComment }));
            setNewComment('');
        }
    };

    const handleLike = () => {
        dispatch(likePost(post._id));
        setIsLiked(true);
        setTimeout(() => setIsLiked(false), 1000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <Card
                elevation={3}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                sx={{ borderRadius: 2.5, overflow: 'visible' }}
            >
                <CardContent>
                    {/* Author Section */}
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar
                            src={post.user.profilePic}
                            slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
                            sx={{
                                mr: 2,
                                width: 48,
                                height: 48,
                                boxShadow: isHovered ? '0 0 12px rgba(255,255,255,0.4)' : 'none'
                            }}
                        />
                        <div>
                            <Typography variant="h6" fontWeight={600}>{post.user.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                <TimeAgo date={post.createdAt} />
                            </Typography>
                        </div>
                    </Box>

                    {/* Post Content */}
                    {post.text && (
                        <Typography variant="body1" sx={{
                            mb: 2,
                            px: 2,
                            py: 1,
                            borderRadius: 2,
                            bgcolor: 'background.paper'
                        }}>
                            {post.text}
                        </Typography>
                    )}

                    {/* Media */}
                    {post.mediaUrl && (
                        <CardMedia
                            component={post.mediaType === 'video' ? 'video' : 'img'}
                            image={post.mediaUrl}
                            alt="Post media"
                            sx={{
                                borderRadius: 4,
                                height: post.mediaType === 'image' ? 400 : 'auto',
                                objectFit: 'cover',
                                boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                            }}
                            controls={post.mediaType === 'video'}
                        />
                    )}

                    {/* Actions */}
                    <Box sx={{
                        display: 'flex',
                        mt: 2,
                        gap: 1,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        pt: 2
                    }}>
                        <IconButton onClick={handleLike}>
                            <motion.div
                                animate={{ scale: isLiked ? 1.3 : 1 }}
                                transition={{ type: 'spring', stiffness: 500 }}
                            >
                                <Favorite sx={{
                                    color: post.likes.length > 0 ? red[500] : grey[500],
                                    transition: 'color 0.3s ease'
                                }} />
                            </motion.div>
                            <Typography sx={{ ml: 1 }}>{post.likes.length}</Typography>
                        </IconButton>

                        <IconButton onClick={() => setShowComments(!showComments)}>
                            <motion.div
                                animate={{ rotate: showComments ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Comment sx={{ color: grey[500] }} />
                            </motion.div>
                            <Typography sx={{ ml: 1 }}>{post.comments.length}</Typography>
                        </IconButton>
                    </Box>

                    {/* Comments Section */}
                    <Collapse in={showComments}>
                        <Box sx={{
                            mt: 2,
                            bgcolor: 'background.default',
                            borderRadius: 3,
                            p: 2
                        }}>
                            {/* Comment Input */}
                            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                                <Avatar sx={{ width: 32, height: 32 }} />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Write a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    autoComplete='off'
                                    onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleCommentSubmit}
                                                    sx={{ color: 'primary.main' }}
                                                >
                                                    <Send />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        sx: { borderRadius: 4 }
                                    }}
                                />
                            </Box>

                            {/* Comments List */}
                            <AnimatePresence>
                                {post.comments.map((comment, index) => (
                                    <motion.div
                                        key={comment._id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Box sx={{
                                            display: 'flex',
                                            gap: 2,
                                            mb: 2,
                                            p: 1.5,
                                            borderRadius: 3,
                                            bgcolor: 'background.paper'
                                        }}>
                                            <Avatar
                                                src={comment.user?.profilePic}
                                                slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
                                                sx={{ width: 32, height: 32 }}
                                            />
                                            <div>
                                                <Typography variant="subtitle2" fontWeight={600}>
                                                    {comment.user?.name}{" "}
                                                    <Typography variant="caption" color="text.secondary" component="span" fontSize={11}>
                                                        <TimeAgo date={comment.createdAt} />
                                                    </Typography>
                                                </Typography>
                                                <Typography variant="body2">{comment.text}</Typography>
                                            </div>

                                        </Box>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </Box>
                    </Collapse>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default PostCard;