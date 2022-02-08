import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import * as NotificationCreators from '../../actions/notificationCreators'

function Notification(props) {
    const { task: { notifications, error }, user, visibleNotifications, auth } = props

    useEffect(() => {
        if (auth.error || user.error || error) {
            toast.error(`⛔️ ${auth.error || user.error || error} !`, {
                position: "top-center",
                autoClose: 3000,
                closeOnClick: true,
            });
        }

    }, [user.error, error, auth.error])




    useEffect(() => {
        if (notifications || user.notifications === true) {
            toast.success('✅ Successfully completed!', {
                position: "top-center",
                autoClose: 3000,
                closeOnClick: true,
            });
        }
        const timerId = setTimeout(() => {
            clearInterval(timerId);
            visibleNotifications()
        }, 2000);
    }, [notifications, user.notifications])
    return <ToastContainer />;
}


const mapStateToProps = (state) => ({
    task: state.task,
    user: state.user,
    auth: state.auth
})
const mapDispatchToProps = dispatch => {
    return {
        visibleNotifications: () => dispatch(NotificationCreators.notificationMSG())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Notification)
