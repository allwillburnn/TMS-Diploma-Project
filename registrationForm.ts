import { emailPattern, passwordPattern, usernamePattern } from "./data/constants/regExp";
import { invEmailErr, invPasswordErr, invUsernameErr, invAgeErr, invTermsAgreementErr } from "./data/constants/errors"

export class RegistrationForm {

    protected email: string;
    protected password: string;
    protected username: string;
    protected age: number;
    protected termsAgreement: boolean = false;
    protected registered: boolean = false;

    setEmail(email: string) {
        switch (true) {
            case !email.match(emailPattern):
                throw new Error(invEmailErr);
            default:
                return this.email = email;
        }
    }

    setPassword(password: string) {
        switch (true) {
            case !password.match(passwordPattern):
                throw new Error(invPasswordErr);
            default:
                return this.password = password;
        }
    }

    setUsername(username: string) {
        switch (true) {
            case !username.match(usernamePattern):
                throw new Error(invUsernameErr);
            default:
                return this.username = username;
        }
    }

    setAge(age: number) {
        switch (true) {
            case !((age > 0) && (age < 150)):
                throw new Error(invAgeErr);
            default:
                return this.age = age;
        }
    }

    agreeWithTerms() {
        return this.termsAgreement = true;
    }

    register() {
        switch (true) {
            case this.email === undefined:
                return invEmailErr;
            case this.password === undefined:
                return invPasswordErr;
            case this.username === undefined:
                return invUsernameErr;
            case this.age === undefined:
                return invAgeErr;
            case this.termsAgreement === false:
                return invTermsAgreementErr;
            default:
                this.registered = true;
                let registeredTimestamp: Date = new Date();
                return `User "${this.username}" successfully registered at ${registeredTimestamp.toLocaleTimeString()} ${registeredTimestamp.toLocaleDateString()}`;
        }
    }

}

