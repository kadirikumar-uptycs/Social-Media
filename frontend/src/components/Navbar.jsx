import { AppBar, Toolbar, IconButton, Typography, Switch } from '@mui/material';
import { AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/themeSlice';

const Navbar = () => {
    const { darkMode } = useSelector((state) => state.theme);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    return (
        <motion.div initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.5 }}>
            <AppBar position="sticky" elevation={1}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        SocialHub
                    </Typography>

                    <Switch
                        checked={darkMode}
                        onChange={() => dispatch(toggleTheme())}
                        icon={<Brightness7 sx={{ color: '#fff' }} />}
                        checkedIcon={<Brightness4 />}
                    />

                    {user && (
                        <IconButton color="inherit">
                            <AccountCircle fontSize="large" />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>
        </motion.div>
    );
};

export default Navbar;