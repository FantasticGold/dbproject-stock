import bcrypt from 'bcryptjs';

export function passwdSha(password) {
    return bcrypt.hashSync(password, 8);
}

export function compareSha(passwd, shapasswd) {
    return bcrypt.compareSync(passwd, shapasswd);
}