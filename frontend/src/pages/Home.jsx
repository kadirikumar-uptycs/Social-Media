import React, { useEffect, useState, useRef } from "react";
import {
  Container, Grid, Box, Typography, IconButton, Dialog,
  Slide, CircularProgress, Tabs, Tab, Fab, useMediaQuery,
  Skeleton, useTheme, Tooltip, Zoom
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { getPosts } from "../features/postSlice";
import PostCard from "../components/PostCard";
import CreatePost from "../components/CreatePost";
import CloseIcon from '@mui/icons-material/Close';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewStreamIcon from '@mui/icons-material/ViewStream';
import { Masonry } from '@mui/lab';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Home = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [currentTab, setCurrentTab] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const { posts, loading, error } = useSelector((state) => state.posts);
  const loadingRef = useRef(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && posts.length >= 10) {
          loadMorePosts();
        }
      },
      { threshold: 0.5 }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [loading, posts]);

  const loadMorePosts = () => {
    if (loading || loadingMore) return;

    setLoadingMore(true);
    setTimeout(() => {
      setLoadingMore(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    dispatch(getPosts()).finally(() => {
      setTimeout(() => setRefreshing(false), 800);
    });
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleOpenPost = (post) => {
    setSelectedPost(post);
  };

  const handleClosePost = () => {
    setSelectedPost(null);
  };

  const getColumnCount = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  const renderSkeletons = () => {
    return Array(6).fill().map((_, index) => (
      <motion.div
        key={`skeleton-${index}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
      >
        <Box sx={{ mb: 3 }}>
          <Skeleton variant="rectangular" height={60} sx={{ borderRadius: '12px 12px 0 0' }} />
          <Skeleton variant="rectangular" height={200} />
          <Skeleton variant="rectangular" height={80} sx={{ borderRadius: '0 0 12px 12px' }} />
        </Box>
      </motion.div>
    ));
  };

  return (
    <Box sx={{
      bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.50',
      minHeight: '100vh',
      py: 3,
      px: { xs: 1, sm: 2 }
    }}>
      <Container maxWidth="lg">
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
          position: 'sticky',
          top: 0,
          zIndex: 10,
          bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'grey.50',
          py: 2,
          px: { xs: 1, sm: 2 },
          borderRadius: '7px',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 4px 20px rgba(0,0,0,0.2)'
            : '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <Typography
            variant="h5"
            component="h1"
            fontWeight="bold"
            sx={{
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)'
                : 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: theme.palette.mode === 'dark' ? '0 0 10px rgba(255,255,255,0.1)' : 'none'
            }}
          >
            Social Feed
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                onClick={handleRefresh}
                color="primary"
                disabled={refreshing}
                sx={{
                  bgcolor: theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0,0,0,0.03)',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.06)',
                  }
                }}
              >
                <motion.div
                  animate={{ rotate: refreshing ? 360 : 0 }}
                  transition={{ duration: 1, ease: "linear", repeat: refreshing ? Infinity : 0 }}
                >
                  <RefreshIcon />
                </motion.div>
              </IconButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                color="primary"
                sx={{
                  bgcolor: theme.palette.mode === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0,0,0,0.03)',
                  '&:hover': {
                    bgcolor: theme.palette.mode === 'dark'
                      ? 'rgba(255,255,255,0.1)'
                      : 'rgba(0,0,0,0.06)',
                  }
                }}
              >
                {viewMode === 'grid' ? <ViewStreamIcon /> : <GridViewIcon />}
              </IconButton>
            </motion.div>
          </Box>
        </Box>

        <Box sx={{ mb: 3 }}>
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.95rem',
                py: 1.5
              },
              bgcolor: theme.palette.mode === 'dark'
                ? 'background.paper'
                : 'white',
              borderRadius: 2,
              mb: 3,
              boxShadow: theme.palette.mode === 'dark'
                ? '0 4px 20px rgba(0,0,0,0.2)'
                : '0 4px 20px rgba(0,0,0,0.07)'
            }}
          >
            <Tab label="All Posts" />
            <Tab label="Following" />
            <Tab label="Popular" />
          </Tabs>
        </Box>

        <AnimatePresence mode="wait">
          {loading && !refreshing && posts.length === 0 ? (
            <Box sx={{ mb: 4 }}>
              {viewMode === 'grid' ? (
                <Masonry columns={getColumnCount()} spacing={2}>
                  {renderSkeletons()}
                </Masonry>
              ) : (
                <Grid container spacing={3}>
                  {Array(3).fill().map((_, index) => (
                    <Grid item xs={12} key={`list-skeleton-${index}`}>
                      {renderSkeletons()[index]}
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  p: 5,
                  bgcolor: theme.palette.mode === 'dark'
                    ? 'rgba(255,0,0,0.1)'
                    : 'rgba(255,0,0,0.05)',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'error.light'
                }}
              >
                <Typography variant="h6" color="error" gutterBottom>
                  {error}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  There was a problem loading posts. Please try again later.
                </Typography>
                <Box mt={2}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Fab
                      variant="extended"
                      size="medium"
                      color="primary"
                      onClick={handleRefresh}
                    >
                      <RefreshIcon sx={{ mr: 1 }} />
                      Retry
                    </Fab>
                  </motion.div>
                </Box>
              </Box>
            </motion.div>
          ) : posts?.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Box
                sx={{
                  textAlign: 'center',
                  p: 5,
                  bgcolor: theme.palette.mode === 'dark'
                    ? 'rgba(0,0,0,0.2)'
                    : 'rgba(0,0,0,0.02)',
                  borderRadius: 3
                }}
              >
                <Typography variant="h6" gutterBottom>
                  No posts yet
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Be the first to share something with the community
                </Typography>
              </Box>
            </motion.div>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Masonry columns={getColumnCount()} spacing={3}>
                    {posts.map((post) => (
                      <Box key={post._id} sx={{ mb: 3 }}>
                        <PostCard post={post} onClick={() => handleOpenPost(post)} />
                      </Box>
                    ))}
                  </Masonry>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Grid container spacing={3}>
                    {posts.map((post) => (
                      <Grid item xs={12} key={post._id}>
                        <PostCard post={post} onClick={() => handleOpenPost(post)} />
                      </Grid>
                    ))}
                  </Grid>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>

        {posts.length > 0 && (
          <Box
            ref={loadingRef}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 4
            }}
          >
            {loadingMore && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <CircularProgress size={32} />
              </motion.div>
            )}
          </Box>
        )}
      </Container>

      <Dialog
        fullScreen={isMobile}
        maxWidth="md"
        open={Boolean(selectedPost)}
        onClose={handleClosePost}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 3,
            overflow: 'hidden',
            bgcolor: theme.palette.mode === 'dark' ? 'background.paper' : 'background.default',
            boxShadow: theme.palette.mode === 'dark'
              ? '0 8px 32px rgba(255,255,255,0.1)'
              : '0 8px 32px rgba(0,0,0,0.1)'
          }
        }}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}>
          <Typography variant="h6">Post Details</Typography>
          <IconButton onClick={handleClosePost} edge="end">
            <CloseIcon />
          </IconButton>
        </Box>

        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PostCard post={selectedPost} />
            </motion.div>
          )}
        </Box>
      </Dialog>

      <CreatePost />
      <Box sx={{
        position: 'fixed',
        bottom: 24,
        left: 24,
        zIndex: 1000
      }}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="/guidelines" target="_blank" rel="noreferrer">
            <Tooltip title="Read Guidelines" arrow TransitionComponent={Zoom}>
              <Fab
                color="primary"
                onClick={() => setOpen(true)}
                sx={{
                  boxShadow: theme.palette.mode === 'dark'
                    ? '0 0 15px rgba(255,255,255,0.2)'
                    : '0 4px 15px rgba(0,0,0,0.2)',
                }}
              >
                <HelpOutlineIcon />
              </Fab>
            </Tooltip>
          </a>
        </motion.div>
      </Box>
    </Box>
  );
};

export default Home;