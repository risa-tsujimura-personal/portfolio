import { Resend } from "resend";
import { env } from "./env";

export const resend = new Resend(env.RESEND_API_TOKEN);

export const emailSender = {
  from: env.RESEND_FROM,
  to: env.RESEND_TO,
};



