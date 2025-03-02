import { useEffect } from 'react';
import { Avatar, Box, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../features/postSlice';
import PostCard from '../components/PostCard';

const Profile = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { items: posts } = useSelector((state) => state.posts);

    useEffect(() => {
        dispatch(getPosts());
    }, [dispatch]);

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 3 }}>
                        <Avatar
                            src={user?.profilePic}
                            sx={{ width: 120, height: 120 }}
                        />
                        <div>
                            <Typography variant="h3" sx={{ fontWeight: 700 }}>
                                {user?.name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {user?.email}
                            </Typography>
                        </div>
                    </Box>

                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                        Your Posts
                    </Typography>

                    <Grid container spacing={3}>
                        {posts
                            .filter(post => post.user._id === user?._id)
                            .map(post => (
                                <Grid item xs={12} key={post._id}>
                                    <PostCard post={post} />
                                </Grid>
                            ))}
                    </Grid>
                </motion.div>
            </Box>
        </Container>
    );
};

export default Profile;