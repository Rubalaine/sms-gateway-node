import {randomBytes, scryptSync} from 'crypto';

const encryptPassword = (password, salt) => {
    return scryptSync(password, salt, 32).toString('hex');   
}

const hashPassword = (password) => {
    const salt = randomBytes(16).toString('hex');
    return encryptPassword(password, salt) + salt;

}
const comparePassword = (password, hash) => {
    const salt = hash.slice(64);
    const originalPasswordHash = hash.slice(0, 64);
    const currentPasswordHash = encryptPassword(password, salt);
    return originalPasswordHash === currentPasswordHash;
}

const myCrypto = {
    hashPassword,
    comparePassword
}
export default myCrypto;