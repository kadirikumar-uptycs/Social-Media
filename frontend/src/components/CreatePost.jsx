import { useState, useRef, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
    Box, Button, IconButton, Typography, TextField, Dialog,
    DialogTitle, DialogContent, DialogActions, CircularProgress,
    Fab, Tooltip, Zoom, LinearProgress, Alert, Snackbar, useTheme
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Close, AddPhotoAlternate, VideoCall, MusicNote,
    PostAdd, ImageOutlined, Send, Cancel
} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { createPost } from '../features/postSlice';

const CreatePost = () => {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [progress, setProgress] = useState(0);
    const dispatch = useDispatch();
    const theme = useTheme();
    const fileInputRef = useRef(null);

    const onDrop = useCallback((acceptedFiles) => {
        const selectedFile = acceptedFiles[0];
        setFile(selectedFile);

        if (selectedFile) {
            const fileType = selectedFile.type;
            setPreview({
                url: URL.createObjectURL(selectedFile),
                type: fileType.startsWith('image/')
                    ? 'image'
                    : fileType.startsWith('video/')
                        ? 'video'
                        : 'audio'
            });
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
            'video/*': ['.mp4', '.webm', '.mov'],
            'audio/*': ['.mp3', '.wav', '.ogg']
        },
        maxFiles: 1,
        onDrop
    });

    const handleClose = () => {
        setOpen(false);
        setContent('');
        setFile(null);
        setPreview(null);
        setError(null);
        setProgress(0);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setProgress(0);

        const formData = new FormData();
        formData.append('text', content);
        if (file) formData.append('media', file);

        const progressInterval = setInterval(() => {
            setProgress(prev => {
                const newProgress = prev + Math.random() * 20;
                return newProgress >= 100 ? 99 : newProgress;
            });
        }, 500);

        try {
            await dispatch(createPost(formData)).unwrap();
            clearInterval(progressInterval);
            setProgress(100);
            setTimeout(() => {
                handleClose();
            }, 500);
        } catch (err) {
            clearInterval(progressInterval);
            setProgress(0);

            if (err.status === 422) {
                setError(err?.response?.data?.message || "⚠️ Content violates community guidelines");
            } else {
                setError("Failed to create post. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getPreviewComponent = () => {
        if (!preview) return null;

        switch (preview.type) {
            case 'image':
                return (
                    <Box sx={{
                        position: 'relative',
                        width: '100%',
                        overflow: 'hidden',
                        borderRadius: 2,
                        boxShadow: theme.palette.mode === 'dark'
                            ? '0 4px 20px rgba(255,255,255,0.1)'
                            : '0 4px 20px rgba(0,0,0,0.08)',
                        bgcolor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.02)',
                    }}>
                        <img
                            src={preview.url}
                            alt="Preview"
                            style={{
                                width: '100%',
                                maxHeight: '300px',
                                objectFit: 'contain',
                                display: 'block'
                            }}
                        />
                    </Box>
                );
            case 'video':
                return (
                    <Box sx={{
                        position: 'relative',
                        width: '100%',
                        borderRadius: 2,
                        overflow: 'hidden',
                        boxShadow: theme.palette.mode === 'dark'
                            ? '0 4px 20px rgba(255,255,255,0.1)'
                            : '0 4px 20px rgba(0,0,0,0.08)',
                    }}>
                        <video
                            src={preview.url}
                            controls
                            style={{
                                width: '100%',
                                maxHeight: '300px',
                                backgroundColor: 'black'
                            }}
                        />
                    </Box>
                );
            case 'audio':
                return (
                    <Box sx={{
                        position: 'relative',
                        width: '100%',
                        p: 3,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 2,
                        boxShadow: theme.palette.mode === 'dark'
                            ? '0 4px 20px rgba(255,255,255,0.1)'
                            : '0 4px 20px rgba(0,0,0,0.08)',
                    }}>
                        <MusicNote fontSize="large" color="primary" />
                        <Typography>{file?.name}</Typography>
                        <audio
                            src={preview.url}
                            controls
                            style={{ width: '100%' }}
                        />
                    </Box>
                );
            default:
                return null;
        }
    };

    const getMediaTypeIcon = (type) => {
        switch (type) {
            case 'image':
                return <ImageOutlined />;
            case 'video':
                return <VideoCall />;
            case 'audio':
                return <MusicNote />;
            default:
                return <AddPhotoAlternate />;
        }
    };

    return (
        <>
            <Box sx={{
                position: 'fixed',
                bottom: 24,
                right: 24,
                zIndex: 1000
            }}>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Tooltip title="Create a new post" arrow TransitionComponent={Zoom}>
                        <Fab
                            color="primary"
                            onClick={() => setOpen(true)}
                            sx={{
                                boxShadow: theme.palette.mode === 'dark'
                                    ? '0 0 15px rgba(255,255,255,0.2)'
                                    : '0 4px 15px rgba(0,0,0,0.2)',
                            }}
                        >
                            <PostAdd />
                        </Fab>
                    </Tooltip>
                </motion.div>
            </Box>

            <Dialog
                open={open}
                onClose={!isLoading ? handleClose : undefined}
                fullWidth
                maxWidth="sm"
                PaperProps={{
                    elevation: 5,
                    sx: {
                        borderRadius: 3,
                        overflow: 'hidden'
                    }
                }}
            >
                <DialogTitle sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    py: 1.5,
                    px: 3
                }}>
                    <Typography variant="h6" fontWeight={600}>Create a New Post</Typography>
                    {!isLoading && (
                        <IconButton onClick={handleClose} size="small">
                            <Close fontSize="small" />
                        </IconButton>
                    )}
                </DialogTitle>

                {isLoading && (
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            height: 4,
                            '& .MuiLinearProgress-bar': {
                                transition: 'transform 0.3s ease'
                            }
                        }}
                    />
                )}

                <DialogContent sx={{ py: 3, marginTop: 2.5 }}>
                    <AnimatePresence mode="wait">
                        {error ? (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <Alert
                                    severity="error"
                                    variant="filled"
                                    sx={{
                                        mb: 3,
                                        display: 'flex',
                                        alignItems: 'center'
                                    }}
                                    action={
                                        <Button
                                            color="inherit"
                                            size="small"
                                            onClick={() => setError(null)}
                                        >
                                            Try Again
                                        </Button>
                                    }
                                >
                                    {error}
                                </Alert>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    variant="outlined"
                                    placeholder="What's on your mind?"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    disabled={isLoading}
                                    InputProps={{
                                        sx: {
                                            borderRadius: 2,
                                            fontSize: '1rem',
                                            '&::placeholder': {
                                                fontSize: '1rem'
                                            }
                                        }
                                    }}
                                    sx={{ mb: 3 }}
                                />

                                {/* File Preview */}
                                {preview && (
                                    <Box position="relative" sx={{ mb: 3 }}>
                                        <IconButton
                                            sx={{
                                                position: 'absolute',
                                                right: 8,
                                                top: 8,
                                                bgcolor: 'rgba(0, 0, 0, 0.5)',
                                                color: 'white',
                                                '&:hover': {
                                                    bgcolor: 'rgba(0, 0, 0, 0.7)',
                                                }
                                            }}
                                            onClick={() => {
                                                setFile(null);
                                                setPreview(null);
                                            }}
                                            disabled={isLoading}
                                        >
                                            <Close />
                                        </IconButton>
                                        {getPreviewComponent()}
                                    </Box>
                                )}

                                {/* File Upload Dropzone */}
                                {!preview && (
                                    <Box {...getRootProps()} sx={{
                                        border: '2px dashed',
                                        borderColor: isDragActive ? 'primary.main' : 'divider',
                                        borderRadius: 3,
                                        p: 4,
                                        textAlign: 'center',
                                        cursor: isLoading ? 'not-allowed' : 'pointer',
                                        transition: 'all 0.3s ease',
                                        bgcolor: isDragActive
                                            ? theme.palette.mode === 'dark'
                                                ? 'rgba(255,255,255,0.05)'
                                                : 'rgba(0,0,0,0.02)'
                                            : 'transparent',
                                        position: 'relative',
                                        overflow: 'hidden'
                                    }}>
                                        <input {...getInputProps()} disabled={isLoading} />

                                        <motion.div
                                            animate={{ y: isDragActive ? -5 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    gap: 1.5
                                                }}
                                            >
                                                <motion.div
                                                    animate={{
                                                        scale: isDragActive ? 1.1 : 1,
                                                        rotate: isDragActive ? [0, -5, 5, -5, 0] : 0
                                                    }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <Box
                                                        sx={{
                                                            bgcolor: 'primary.main',
                                                            color: 'white',
                                                            width: 60,
                                                            height: 60,
                                                            borderRadius: '50%',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            mb: 1
                                                        }}
                                                    >
                                                        <AddPhotoAlternate sx={{ fontSize: 30 }} />
                                                    </Box>
                                                </motion.div>

                                                <Typography variant="subtitle1" fontWeight={500}>
                                                    {isDragActive
                                                        ? 'Drop your media here!'
                                                        : 'Drag and drop media here'}
                                                </Typography>

                                                <Typography variant="body2" color="text.secondary">
                                                    or
                                                    <Button
                                                        component="span"
                                                        size="small"
                                                        sx={{ mx: 0.5, fontWeight: 600 }}
                                                        disabled={isLoading}
                                                    >
                                                        browse files
                                                    </Button>
                                                    to upload
                                                </Typography>

                                                <Typography variant="caption" color="text.secondary">
                                                    Supports images, videos, and audio files
                                                </Typography>
                                            </Box>
                                        </motion.div>
                                    </Box>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </DialogContent>

                <DialogActions sx={{
                    px: 3,
                    py: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    justifyContent: error ? 'center' : 'flex-end'
                }}>
                    {error ? (
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => setError(null)}
                            startIcon={<Cancel />}
                        >
                            Try Again
                        </Button>
                    ) : (
                        <>
                            <Button
                                onClick={handleClose}
                                disabled={isLoading}
                                variant="outlined"
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                disabled={isLoading || (!content.trim() && !file)}
                                startIcon={isLoading ? <CircularProgress size={16} color="inherit" /> : <Send />}
                            >
                                {isLoading ? 'Posting...' : 'Post Now'}
                            </Button>
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CreatePost;