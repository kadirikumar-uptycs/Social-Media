import { useState, useRef } from 'react';
import {
    Avatar, Card, CardContent, CardMedia, IconButton, Typography, Box,
    TextField, InputAdornment, Collapse, Chip, Tooltip, Zoom, useTheme
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Favorite, FavoriteBorder, ChatBubbleOutline, Send,
    MoreVert, Bookmark, BookmarkBorder, Share
} from '@mui/icons-material';
import TimeAgo from 'react-timeago';
import { useDispatch } from 'react-redux';
import { likePost, commentPost } from '../features/postSlice';

const PostCard = ({ post, onClick }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [isLiked, setIsLiked] = useState(post.likes.includes(post.user._id));
    const [isSaved, setIsSaved] = useState(false);
    const commentInputRef = useRef(null);
    const dispatch = useDispatch();
    const theme = useTheme();

    const handleCommentSubmit = () => {
        if (newComment.trim()) {
            dispatch(commentPost({ postId: post._id, comment: newComment }));
            setNewComment('');
        }
    };

    const handleLike = () => {
        dispatch(likePost(post._id));
        setIsLiked(!isLiked);
    };

    const handleCommentClick = () => {
        setShowComments((value) => !value);
        setTimeout(() => {
            commentInputRef.current?.focus();
        }, 300);
    };

    const formatMediaType = (type) => {
        switch (type) {
            case 'video':
                return 'video';
            case 'audio':
                return 'audio';
            default:
                return 'img';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            layoutId={`post-${post._id}`}
        >
            <Card
                elevation={3}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                sx={{
                    borderRadius: 3,
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    border: `1px solid ${theme.palette.divider}`,
                    '&:hover': {
                        boxShadow: theme.palette.mode === 'dark'
                            ? '0 8px 24px rgba(255,255,255,0.1)'
                            : '0 8px 24px rgba(0,0,0,0.12)'
                    }
                }}
            >
                <CardContent sx={{ p: 0 }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        px: 2.5,
                        py: 1.5,
                        borderBottom: '1px solid',
                        borderColor: 'divider'
                    }}>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Avatar
                                src={post.user.profilePic}
                                alt={post.user.name}
                                slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
                                sx={{
                                    mr: 2,
                                    width: 42,
                                    height: 42,
                                    transition: 'all 0.3s ease',
                                    borderRadius: '50%',
                                }}
                            />
                        </motion.div>
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="subtitle1" fontWeight={600}>{post.user.name}</Typography>
                            <Typography variant="caption" color="text.secondary">
                                <TimeAgo date={post.createdAt} />
                            </Typography>
                        </Box>
                        <IconButton size="small">
                            <MoreVert fontSize="small" />
                        </IconButton>
                    </Box>

                    {post.mediaUrl && (
                        <Box sx={{ position: 'relative' }}>
                            <Box
                                sx={{
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    maxHeight: 450,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.03)'
                                }}
                                onClick={onClick || (() => { })}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    transition={{ duration: 0.4 }}
                                    style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}
                                >
                                    <CardMedia
                                        component={formatMediaType(post.mediaType)}
                                        src={post.mediaUrl}
                                        alt="Post media"
                                        controls={post.mediaType === 'video' || post.mediaType === 'audio'}
                                        sx={{
                                            maxWidth: '100%',
                                            height: post.mediaType === 'image' ? 'auto' : undefined,
                                            maxHeight: 450,
                                            objectFit: 'contain'
                                        }}
                                    />
                                </motion.div>
                            </Box>

                            {post.mediaType && (
                                <Chip
                                    label={post.mediaType.charAt(0).toUpperCase() + post.mediaType.slice(1)}
                                    size="small"
                                    color="primary"
                                    variant="filled"
                                    sx={{
                                        position: 'absolute',
                                        top: 3,
                                        right: 5,
                                        opacity: 0.8,
                                        fontSize: '0.7rem'
                                    }}
                                />
                            )}
                        </Box>
                    )}

                    {/* Post Text Content */}
                    {post.text && (
                        <Typography
                            variant="body1"
                            sx={{
                                px: 3,
                                py: 2,
                                whiteSpace: 'pre-wrap',
                                wordBreak: 'break-word',
                                fontSize: '0.95rem',
                                lineHeight: 1.5
                            }}
                        >
                            {post.text}
                        </Typography>
                    )}

                    {/* Actions */}
                    <Box sx={{
                        display: 'flex',
                        px: 2,
                        py: 1,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        alignItems: 'center'
                    }}>
                        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <motion.div whileTap={{ scale: 1.4 }}>
                                <Tooltip title={isLiked ? "Unlike" : "Like"} arrow TransitionComponent={Zoom}>
                                    <IconButton onClick={handleLike} size="small">
                                        {isLiked ? (
                                            <Favorite sx={{ color: 'error.main' }} />
                                        ) : (
                                            <FavoriteBorder />
                                        )}
                                    </IconButton>
                                </Tooltip>
                            </motion.div>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {post.likes.length}
                                <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                    {post.likes.length === 1 ? 'like' : 'likes'}
                                </Typography>
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1, ml: 3, alignItems: 'center' }}>
                            <Tooltip title="Comment" arrow TransitionComponent={Zoom}>
                                <IconButton onClick={handleCommentClick} size="small">
                                    <ChatBubbleOutline />
                                </IconButton>
                            </Tooltip>
                            <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                {post.comments.length}
                                <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
                                    {post.comments.length === 1 ? 'comment' : 'comments'}
                                </Typography>
                            </Typography>
                        </Box>

                        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
                            <Tooltip title="Share" arrow TransitionComponent={Zoom}>
                                <IconButton size="small">
                                    <Share fontSize="small" />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={isSaved ? "Unsave" : "Save"} arrow TransitionComponent={Zoom}>
                                <IconButton size="small" onClick={() => setIsSaved(!isSaved)}>
                                    {isSaved ? <Bookmark /> : <BookmarkBorder />}
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Box>

                    {/* Comments Section */}
                    <Collapse in={showComments}>
                        <Box sx={{
                            px: 2,
                            py: 2,
                            borderTop: '1px solid',
                            borderColor: 'divider'
                        }}>
                            {/* Comment Input */}
                            <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
                                <Avatar sx={{ width: 32, height: 32 }} slotProps={{ img: { referrerPolicy: 'no-referrer' } }} />
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    inputRef={commentInputRef}
                                    autoComplete='off'
                                    onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleCommentSubmit}
                                                    disabled={!newComment.trim()}
                                                    color="primary"
                                                    size="small"
                                                >
                                                    <Send fontSize="small" />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        sx: {
                                            borderRadius: 6,
                                            fontSize: '0.9rem',
                                            py: 0.5
                                        }
                                    }}
                                    size="small"
                                />
                            </Box>

                            {/* Comments List */}
                            <AnimatePresence>
                                {post.comments.map((comment, index) => (
                                    <motion.div
                                        key={comment._id || index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                    >
                                        <Box sx={{
                                            display: 'flex',
                                            gap: 1.5,
                                            mb: 1.5,
                                            py: 1,
                                            borderRadius: 2,
                                        }}>
                                            <Avatar
                                                src={comment.user?.profilePic}
                                                alt={comment.user?.name}
                                                slotProps={{ img: { referrerPolicy: 'no-referrer' } }}
                                                sx={{ width: 32, height: 32 }}
                                            />
                                            <Box sx={{
                                                bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                                                borderRadius: 3,
                                                px: 2,
                                                py: 1,
                                                flexGrow: 1
                                            }}>
                                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Typography variant="subtitle2" fontWeight={600} fontSize="0.85rem">
                                                        {comment.user?.name}
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary" fontSize="0.7rem">
                                                        <TimeAgo date={comment.createdAt} />
                                                    </Typography>
                                                </Box>
                                                <Typography variant="body2" fontSize="0.85rem" sx={{ mt: 0.5 }}>
                                                    {comment.text}
                                                </Typography>
                                            </Box>
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