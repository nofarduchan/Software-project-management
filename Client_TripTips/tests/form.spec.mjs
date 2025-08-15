import { expect } from "chai";
import * as yup from "yup";

// סכמת האימות עבור רישום משתמשים
const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one digit")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  location: yup.string().required("Location is required"),
  occupation: yup.string().required("Occupation is required"),
});

// סכמת האימות עבור כניסת משתמשים
const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup.string().required("Password is required"),
});

describe("Form Validation", () => {
  describe("Register Validation", () => {
    it("should validate a valid registration form", async () => {
      const validRegisterData = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "Password123!",
        location: "Somewhere",
        occupation: "Developer",
      };
      const result = await registerSchema.isValid(validRegisterData);
      expect(result).to.be.true;
    });

    it("should invalidate an empty registration form", async () => {
      const invalidRegisterData = {};
      const result = await registerSchema.isValid(invalidRegisterData);
      expect(result).to.be.false;
    });

    it("should invalidate a registration form with invalid password", async () => {
      const invalidRegisterData = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        password: "password",
        location: "Somewhere",
        occupation: "Developer",
      };
      const result = await registerSchema.isValid(invalidRegisterData);
      expect(result).to.be.false;
    });
  });

  describe("Login Validation", () => {
    it("should validate a valid login form", async () => {
      const validLoginData = {
        email: "john.doe@example.com",
        password: "Password123!",
      };
      const result = await loginSchema.isValid(validLoginData);
      expect(result).to.be.true;
    });

    it("should invalidate an empty login form", async () => {
      const invalidLoginData = {};
      const result = await loginSchema.isValid(invalidLoginData);
      expect(result).to.be.false;
    });
  });
});
