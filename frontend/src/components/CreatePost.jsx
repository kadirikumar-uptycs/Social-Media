import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, IconButton, Paper, TextField, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Close, AddPhotoAlternate } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { createPost } from '../features/postSlice';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg'],
            'video/*': ['.mp4'],
            'audio/*': ['.mp3']
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => setFile(acceptedFiles[0])
    });

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('text', content);
        if (file) formData.append('media', file);
        dispatch(createPost(formData));
        setContent('');
        setFile(null);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    placeholder="What's on your mind?"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    sx={{ mb: 2 }}
                />

                {file && (
                    <Box position="relative" sx={{ mb: 2 }}>
                        <IconButton
                            sx={{ position: 'absolute', right: 8, top: 8, bgcolor: 'background.paper' }}
                            onClick={() => setFile(null)}
                        >
                            <Close />
                        </IconButton>
                        {file.type.startsWith('image/') && (
                            <img
                                src={URL.createObjectURL(file)}
                                alt="Preview"
                                style={{ width: '100%', borderRadius: 12 }}
                            />
                        )}
                    </Box>
                )}

                <Box {...getRootProps()} sx={{
                    border: '2px dashed',
                    borderColor: isDragActive ? 'primary.main' : 'divider',
                    borderRadius: 2,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    mb: 2
                }}>
                    <input {...getInputProps()} />
                    <AddPhotoAlternate sx={{ fontSize: 40, mb: 1 }} />
                    <Typography>
                        {isDragActive ? 'Drop here!' : 'Drag media or click to upload'}
                    </Typography>
                </Box>

                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={!content && !file}
                    fullWidth
                    size="large"
                >
                    Post
                </Button>
            </Paper>
        </motion.div>
    );
};

export default CreatePost;