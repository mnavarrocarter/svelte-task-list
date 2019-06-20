import Noty from 'noty';

import 'noty/src/noty.scss';
import 'noty/src/themes/nest.scss';

const layout = 'topRight';
const timeout = 3000;

function error(message) {
    new Noty({
        type: 'error',
        theme: 'nest',
        text: message,
        layout,
        timeout
    }).show()
}

function success(message) {
    new Noty({
        type: 'success',
        theme: 'nest',
        text: message,
        layout,
        timeout
    }).show()
}

function warning(message) {
    new Noty({
        type: 'warning',
        theme: 'nest',
        text: message,
        layout,
        timeout
    }).show()
}

function info(message) {
    new Noty({
        type: 'info',
        theme: 'nest',
        text: message,
        layout,
        timeout
    }).show()
}

export {
    error,
    success,
    warning,
    info
}