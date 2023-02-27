export { emailPattern, passwordPattern, usernamePattern }

const emailPattern: RegExp = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}/gm;
const passwordPattern: RegExp = /(?=.*(.{8,}))(?=.*(\d))/gm;
const usernamePattern: RegExp = /.{1}/gm;