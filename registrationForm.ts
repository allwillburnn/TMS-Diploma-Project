import { emailPattern, passwordPattern, usernamePattern } from "./const/regExp";

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
                console.log(`Incorrect email is ${email}`);
                throw new Error('Entered email is incorrect');
            default:
                return this.email = email;
        }
    }

    setPassword(password: string) {
        switch (true) {
            case !password.match(passwordPattern):
                throw new Error('Entered password is incorrect');
            default:
                return this.password = password;
        }
    }

    setUsername(username: string) {
        switch (true) {
            case !username.match(usernamePattern):
                throw new Error('Entered username is incorrect');
            default:
                return this.username = username;
        }
    }

    setAge(age: number) {
        switch (true) {
            case (age <= 0) && (age >= 150):
                throw new Error('Entered age is incorrect');
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
                return `An invalid email was entered`;
            case this.password === undefined:
                return `An invalid password was entered`;
            case this.username === undefined:
                return `An invalid username was entered`;
            case this.age === undefined:
                return `An invalid age was entered`;
            case this.termsAgreement === false:
                return `You should accept the terms presented in the Terms and Conditions agreement to continue`;
            default:
                this.registered = true;
                let registeredTimestamp: Date = new Date();
                return `User "${this.username}" successfully registered at ${registeredTimestamp.toLocaleTimeString()} ${registeredTimestamp.toLocaleDateString()}`;
        }
    }

}

