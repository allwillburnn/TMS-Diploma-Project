import { RegistrationForm } from "../registrationForm";

describe("Registration form test cases", () => {

    let registrationForm: RegistrationForm = new RegistrationForm();

    test("User entered valid email", () => {
        const email: string = "asdasd@gmail.com";
        expect(registrationForm.setEmail(email)).toBe(email);
    })

    test("User entered valid password", () => {
        const password: string = "BSDAsdba23b4";
        expect(registrationForm.setPassword(password)).toBe(password);
    })

    test("User entered valid username", () => {
        const username: string = "User";
        expect(registrationForm.setUsername(username)).toBe(username);
    })

    test("User entered valid age", () => {
        const age: number = 26;
        expect(registrationForm.setAge(age)).toBe(age);
    })

    test("User entered valid termsAgreement", () => {
        expect(registrationForm.agreeWithTerms()).toBe(true);
    })

    test("User was registered succesfully", () => {
        registrationForm.setEmail("123@gmail.com")
        registrationForm.setPassword("nxcvbnxcv123")
        registrationForm.setUsername("User")
        registrationForm.setAge(20);
        registrationForm.agreeWithTerms();

        expect(registrationForm.register()).toContain("successfully registered");
    })

})