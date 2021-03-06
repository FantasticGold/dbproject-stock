export const regExp_validate = {
    usernameReg : /[a-zA-Z]\w{1,11}/,
    //高强度密码
    passwordReg : /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/,
    //中
    middlepw : /^(?=.{6,})(?![a-zA-z]+$)(?!\d+$)(?![!@#$%^&*]+$)[a-zA-Z\d!@#$%^&*]+$/,
    //低
    lowpw : /^(?:\d+|[a-zA-Z]+|[!@#$%^&*]+)$/,
    // lowpw : /^(?=.{6,})$/,
    email : /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
}

