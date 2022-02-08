import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { connect } from 'react-redux';
import * as authActionCreators from '../../actions/authCreators'
import CONSTANTS from '../../constant'
import style from './style.module.sass'


import * as userActionCreators from '../../actions/userCreators'

function Nav(props) {
    const { logOut, getUser, auth: { data }, user: { user } } = props
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);


    useEffect(() => {
        getUser()
    }, [])



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    }
    return (
        <AppBar color="secondary" position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <NavLink to="/" className={style.link}>
                            <HomeIcon className={style.homeIcon} />
                        </NavLink>
                    </Typography>

                    {!user.id && <Button color="inherit">
                        <NavLink className={style.link} to="/sign-in">LOGIN</NavLink>
                    </Button>}
                    {!user.id && <Button color="inherit" >

                        <NavLink className={style.link} to="/sign-up">SignUp</NavLink>
                    </Button>}

                    {user.id && <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar className={style.avatar}>{String(user.nickname).slice(0, 1)}</Avatar>
                            </IconButton>
                        </Tooltip>
                    </Box>}
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 15,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem className={style.menuProfile}>
                            <NavLink className={style.link} to="/profile" >
                                My account
                            </NavLink>
                        </MenuItem>
                        <Divider />
                        <MenuItem onClick={logOut}>
                            <ListItemIcon >
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </Container>
        </AppBar >
    )
}


const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.user,
})

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(authActionCreators.authLogOut()),
    getUser: () => dispatch(userActionCreators.getUserRequest())
})


export default connect(mapStateToProps, mapDispatchToProps)(Nav)

