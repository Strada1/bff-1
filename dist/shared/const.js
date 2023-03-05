"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WS_STATUSES = exports.ERROR_TEXT = exports.ROLES = exports.SORT_ORDER_VALUES = void 0;
exports.SORT_ORDER_VALUES = [
    '',
    -1,
    1,
    'asc',
    'ascending',
    'desc',
    'descending',
];
exports.ROLES = {
    ADMIN: 'admin',
    USER: 'user',
};
exports.ERROR_TEXT = {
    SERVER: {
        INTERNAL_ERROR: 'Internal server error',
        TOO_MANY_REQUESTS: 'Too many requests from this IP, please try again later',
    },
    AUTH: {
        NOT_ENOUGH_RIGHTS: 'Not enough rights',
    },
    CHATS: {
        CHAT_EXIST: 'Chat with this title already exists',
        CHAT_NOT_FOUND: 'Chat not found',
    },
    MESSAGES: {
        NOT_VALID_CHAT_ID: 'Not valid chatId',
    },
    USERS: {
        NOT_VALID_ROLE: 'Not valid role',
        USER_EXIST: 'User with this email already exists',
        USER_NOT_FOUND: 'User not found',
        WRONG_USER_OR_PASSWORD: 'User not found or incorrect password',
    },
};
exports.WS_STATUSES = {
    1000: 'Normal closure',
    1001: 'Going away',
    1002: 'Protocol error',
    1003: 'Unsupported data',
    1004: '---Reserved---',
    1005: 'No status received',
    1006: 'Abnormal Closure',
    1007: 'Invalid frame payload data',
    1008: 'Policy violation',
    1009: 'Message too big',
    1010: 'Mandatory ext.',
    1011: 'Internal server error',
    1015: 'TLS handshake',
    3000: 'UNAUTHORIZED',
    NORMAL_CLOSURE: 1000,
    GOING_AWAY: 1001,
    PROTOCOL_ERROR: 1002,
    UNSUPPORTED_DATA: 1003,
    RESERVED: 1004,
    NO_STATUS_RECEIVED: 1005,
    ABNORMAL_CLOSURE: 1006,
    INVALID_FRAME_PAYLOAD_DATA: 1007,
    POLICY_VIOLATION: 1008,
    MESSAGE_TOO_BIG: 1009,
    MANDATORY_EXT: 1010,
    INTERNAL_SERVER_ERROR: 1011,
    TLS_HANDSHAKE: 1015,
    UNAUTHORIZED: 3000,
};
