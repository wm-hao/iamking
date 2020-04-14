import CryptoJS from 'crypto-js'

export function md5(origin) {
    return CryptoJS.MD5(origin);
}