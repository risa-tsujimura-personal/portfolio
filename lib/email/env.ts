import { z } from "zod";

const envSchema = z.object({
  RESEND_API_KEY: z.string().min(1, "RESEND_API_KEY is required"),
  RESEND_FROM: z
    .string()
    .min(1, "RESEND_FROM is required")
    .describe("e.g. 'Kuroneko Contact <noreply@works-kuroneko.com>'"),
  RESEND_TO: z
    .string()
    .min(1, "RESEND_TO is required")
    .describe("Destination email that receives contact messages"),
});

export type Env = z.infer<typeof envSchema>;

export const env: Env = (() => {
  try {
    return envSchema.parse({
      RESEND_API_KEY: process.env.RESEND_API_TOKEN || process.env.RESEND_API_KEY,
      RESEND_FROM: process.env.RESEND_FROM,
      RESEND_TO: process.env.RESEND_TO,
    });
  } catch (error) {
    console.error("Environment variables validation failed:", error);
    throw new Error("メール送信の設定が完了していません。管理者にお問い合わせください。");
  }
})();





