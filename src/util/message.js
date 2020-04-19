import Message from "element-ui/packages/message/src/main";

const MyMessage = {
    info: function (msg) {
        Message({
            message: msg,
            center: true,
            type: 'info'
        })
    },
    warning: function (msg) {
        Message({
            message: msg,
            center: true,
            type: 'warning'
        })
    },
    success: function (msg) {
        Message({
            message: msg,
            center: true,
            type: 'success'
        })
    },
    error: function (msg) {
        Message({
            message: msg,
            center: true,
            type: 'error'
        })
    }
};

export default MyMessage;