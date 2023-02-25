import { RegistrationForm } from "../registrationForm";
import { invEmailErr, invPasswordErr, invUsernameErr, invAgeErr, invTermsAgreementErr } from "../data/constants/errors";

describe("Registration form test cases", () => {

    let registrationForm: RegistrationForm;

    beforeEach(() => {
        registrationForm = new RegistrationForm();
    })

    test("User entered valid email", () => {
        const email: string = "asdasd@gmail.com";
        expect(registrationForm.setEmail(email)).toBe(email);
    })

    test("User entered valid password", () => {
        const password: string = "BSDAsdba23b4";
        expect(registrationForm.setPassword(password)).toBe(password);
    })

    test("User entered valid username", () => {
        const randomUsername: string = (Math.random() * (50) + 1).toString(36);
        expect(registrationForm.setUsername(randomUsername)).toBe(randomUsername);
    })

    test("User entered valid age", () => {
        for (let i = 0; i < 20; i++) {
            let age: number = Math.floor(Math.random() * (148 - 2 + 1) + 2);
            expect(registrationForm.setAge(age)).toBe(age);
        }
        expect(registrationForm.setAge(1)).toBe(1);
        expect(registrationForm.setAge(149)).toBe(149);
    })

    test("User entered valid termsAgreement", () => {
        expect(registrationForm.agreeWithTerms()).toBe(true);
    })

    test("User was registered succesfully", () => {
        registrationForm.setEmail("123@gmail.com");
        registrationForm.setPassword("nxcvbnxcv123");
        registrationForm.setUsername("User");
        registrationForm.setAge(20);
        registrationForm.agreeWithTerms();
        expect(registrationForm.register()).toContain("successfully registered");
    })

    test("User entered invalid email", () => {
        expect(() => { registrationForm.setEmail("gmook@te") }).toThrowError(invEmailErr);
    })

    test("User entered invalid password", () => {
        expect(() => { registrationForm.setPassword("qwertyuiop") }).toThrowError(invPasswordErr);
        expect(() => { registrationForm.setPassword("123ertu") }).toThrowError(invPasswordErr);
    })

    test("User entered invalid username", () => {
        expect(() => { registrationForm.setUsername("") }).toThrowError(invUsernameErr);
    })

    test("User entered invalid age", () => {
        expect(() => { registrationForm.setAge(-1) }).toThrowError(invAgeErr);
        expect(() => { registrationForm.setAge(0) }).toThrowError(invAgeErr);
        expect(() => { registrationForm.setAge(150) }).toThrowError(invAgeErr);
        expect(() => { registrationForm.setAge(151) }).toThrowError(invAgeErr);
    })

    test("User trying to register without valid email", () => {
        registrationForm.setPassword("nxcvbnxcv123");
        registrationForm.setUsername("User");
        registrationForm.setAge(20);
        registrationForm.agreeWithTerms();
        expect(registrationForm.register()).toBe(invEmailErr);
    })

    test("User trying to register without valid password", () => {
        registrationForm.setEmail("123@gmail.com");
        registrationForm.setUsername("User");
        registrationForm.setAge(20);
        registrationForm.agreeWithTerms();
        expect(registrationForm.register()).toBe(invPasswordErr);
    })

    test("User trying to register without valid username", () => {
        registrationForm.setEmail("123@gmail.com");
        registrationForm.setPassword("nxcvbnxcv123");
        registrationForm.setAge(20);
        registrationForm.agreeWithTerms();
        expect(registrationForm.register()).toBe(invUsernameErr);
    })

    test("User trying to register without valid age", () => {
        registrationForm.setEmail("123@gmail.com");
        registrationForm.setPassword("nxcvbnxcv123");
        registrationForm.setUsername("User");
        registrationForm.agreeWithTerms();
        expect(registrationForm.register()).toBe(invAgeErr);
    })

    test("User trying to register without accepting TOS", () => {
        registrationForm.setEmail("123@gmail.com");
        registrationForm.setPassword("nxcvbnxcv123");
        registrationForm.setUsername("User");
        registrationForm.setAge(20);
        expect(registrationForm.register()).toBe(invTermsAgreementErr);
    })

})