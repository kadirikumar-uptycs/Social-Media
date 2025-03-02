import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../components/PostCard';

const PostDetails = () => {
    const { id } = useParams();
    const { items: posts } = useSelector((state) => state.posts);
    const post = posts.find(post => post._id === id);

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    {post ? (
                        <>
                            <PostCard post={post} />

                            <Box sx={{ mt: 4 }}>
                                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                                    Comments ({post.comments.length})
                                </Typography>

                                {post.comments.map((comment) => (
                                    <Box
                                        key={comment._id}
                                        sx={{
                                            display: 'flex',
                                            gap: 2,
                                            mb: 3,
                                            p: 2,
                                            borderRadius: 2,
                                            bgcolor: 'background.default'
                                        }}
                                    >
                                        <Avatar src={comment.user.profilePic} />
                                        <div>
                                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                                {comment.user.name}
                                            </Typography>
                                            <Typography variant="body1">{comment.text}</Typography>
                                        </div>
                                    </Box>
                                ))}
                            </Box>
                        </>
                    ) : (
                        <Typography variant="h6">Post not found</Typography>
                    )}
                </motion.div>
            </Box>
        </Container>
    );
};

export default PostDetails;