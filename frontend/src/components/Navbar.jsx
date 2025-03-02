import React, { useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Switch,
    Box,
    Avatar,
    Badge,
    Menu,
    MenuItem,
    Tooltip,
    useTheme,
    alpha
} from '@mui/material';
import {
    AccountCircle,
    Brightness4,
    Brightness7,
    Notifications,
    Home,
    Explore,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/themeSlice';
import { logout } from '../features/authSlice';

const Navbar = () => {
    const { darkMode } = useSelector((state) => state.theme);
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const theme = useTheme();

    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

    const handleProfileMenu = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleNotificationMenu = (event) => {
        setNotificationAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setProfileAnchorEl(null);
        setNotificationAnchorEl(null);
    };

    const handleLogout = async () => {
        handleClose();
        try {
            await dispatch(logout())?.unwrap();
            window.location.href = '/login';
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 15
            }}
        >
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    background: darkMode
                        ? 'linear-gradient(90deg, #1a1a2e 0%, #16213e 100%)'
                        : 'linear-gradient(90deg, #ffffff 0%, #f8f9fa 100%)',
                    borderBottom: `1px solid ${darkMode ? alpha(theme.palette.common.white, 0.1) : alpha(theme.palette.common.black, 0.1)}`,
                    backdropFilter: 'blur(10px)',
                }}
            >
                <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                background: darkMode
                                    ? 'linear-gradient(45deg, #0ea5e9, #7c3aed)'
                                    : 'linear-gradient(45deg, #4f46e5, #06b6d4)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                letterSpacing: '0.5px'
                            }}
                        >
                            SocialHub
                        </Typography>
                    </motion.div>

                    <Box
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            alignItems: 'center',
                            gap: 1
                        }}
                    >
                        <Tooltip title="Home">
                            <IconButton color="inherit">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                    <Home sx={{ color: darkMode ? 'white' : 'primary.main' }} />
                                </motion.div>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Explore">
                            <IconButton color="inherit">
                                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                                    <Explore sx={{ color: darkMode ? 'white' : 'primary.main' }} />
                                </motion.div>
                            </IconButton>
                        </Tooltip>

                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Switch
                                checked={darkMode}
                                onChange={() => dispatch(toggleTheme())}
                                icon={
                                    <Brightness7
                                        sx={{
                                            color: '#FFD700',
                                            filter: 'drop-shadow(0 0 2px rgba(255, 215, 0, 0.5))'
                                        }}
                                    />
                                }
                                checkedIcon={
                                    <Brightness4
                                        sx={{
                                            color: '#F0F8FF',
                                            filter: 'drop-shadow(0 0 2px rgba(240, 248, 255, 0.5))'
                                        }}
                                    />
                                }
                                sx={{
                                    '& .MuiSwitch-switchBase': {
                                        '&.Mui-checked': {
                                            '& + .MuiSwitch-track': {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.5)
                                            }
                                        }
                                    },
                                    '& .MuiSwitch-track': {
                                        backgroundColor: alpha(theme.palette.grey[500], 0.5)
                                    }
                                }}
                            />
                        </motion.div>

                        {user && (
                            <>
                                <Tooltip title="Notifications">
                                    <IconButton
                                        color="inherit"
                                        onClick={handleNotificationMenu}
                                        sx={{
                                            color: darkMode ? 'white' : 'primary.main',
                                        }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Badge badgeContent={3} color="error">
                                                <Notifications />
                                            </Badge>
                                        </motion.div>
                                    </IconButton>
                                </Tooltip>

                                <Tooltip title="Profile">
                                    <IconButton
                                        color="inherit"
                                        onClick={handleProfileMenu}
                                        sx={{ ml: 1 }}
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {user.profilePic ? (
                                                <Avatar
                                                    src={user.profilePic}
                                                    alt={user.name}
                                                    sx={{
                                                        width: 40,
                                                        height: 40,
                                                        border: `2px solid ${darkMode ? '#0ea5e9' : '#4f46e5'}`
                                                    }}
                                                />
                                            ) : (
                                                <AccountCircle
                                                    sx={{
                                                        fontSize: 40,
                                                        color: darkMode ? 'white' : 'primary.main'
                                                    }}
                                                />
                                            )}
                                        </motion.div>
                                    </IconButton>
                                </Tooltip>

                                <AnimatePresence>
                                    <Menu
                                        key="profile-menu"
                                        anchorEl={profileAnchorEl}
                                        open={Boolean(profileAnchorEl)}
                                        onClose={handleClose}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        PaperProps={{
                                            sx: {
                                                mt: 1.5,
                                                borderRadius: 2,
                                                background: darkMode
                                                    ? 'linear-gradient(145deg, #1a1a2e, #16213e)'
                                                    : 'white',
                                                boxShadow: darkMode
                                                    ? '0 10px 30px -5px rgba(0, 0, 0, 0.5)'
                                                    : '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
                                            }
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>Settings</MenuItem>
                                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                                    </Menu>

                                    <Menu
                                        key="notification-menu"
                                        anchorEl={notificationAnchorEl}
                                        open={Boolean(notificationAnchorEl)}
                                        onClose={handleClose}
                                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                        PaperProps={{
                                            sx: {
                                                mt: 1.5,
                                                borderRadius: 2,
                                                width: 320,
                                                background: darkMode
                                                    ? 'linear-gradient(145deg, #1a1a2e, #16213e)'
                                                    : 'white',
                                                boxShadow: darkMode
                                                    ? '0 10px 30px -5px rgba(0, 0, 0, 0.5)'
                                                    : '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
                                            }
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Avatar sx={{ width: 32, height: 32 }} />
                                                <Box>
                                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                        @user123 liked your post
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        5 minutes ago
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Avatar sx={{ width: 32, height: 32 }} />
                                                <Box>
                                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                        @user456 commented on your post
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        20 minutes ago
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </MenuItem>
                                        <MenuItem onClick={handleClose}>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <Avatar sx={{ width: 32, height: 32 }} />
                                                <Box>
                                                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                                                        @user789 started following you
                                                    </Typography>
                                                    <Typography variant="caption" color="text.secondary">
                                                        1 hour ago
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </MenuItem>
                                    </Menu>
                                </AnimatePresence>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </motion.div>
    );
};

export default Navbar;