import { Box, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}
        >
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
                <CircularProgress size={60} thickness={4} />
            </motion.div>
        </Box>
    );
};

export default Loading;