import { Box, Button, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { Google } from '@mui/icons-material';
import { useDispatch } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center'
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography variant="h2" sx={{ mb: 3, fontWeight: 700 }}>
                        Welcome to SocialHub
                    </Typography>

                    <Typography variant="body1" sx={{ mb: 4, color: 'text.secondary' }}>
                        Connect with friends and share your moments
                    </Typography>

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={<Google />}
                        onClick={() => window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`}
                        sx={{
                            px: 6,
                            py: 1.5,
                            borderRadius: 50,
                            textTransform: 'none',
                            fontSize: '1.1rem'
                        }}
                    >
                        Continue with Google
                    </Button>
                </motion.div>
            </Box>
        </Container>
    );
};

export default Login;