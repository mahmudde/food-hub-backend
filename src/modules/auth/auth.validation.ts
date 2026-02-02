import { z } from "zod";

const signUpValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "নাম প্রয়োজন", // এটি এখানে থাকবে
      })
      .min(3, { message: "নাম অন্তত ৩ অক্ষরের হতে হবে" }),

    email: z
      .string({
        required_error: "ইমেল প্রয়োজন", // এখানে থাকবে
      })
      .email({ message: "সঠিক ইমেল ঠিকানা দিন" }),

    password: z
      .string({
        required_error: "পাসওয়ার্ড প্রয়োজন",
      })
      .min(6, { message: "পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে" }),
  }),
});
