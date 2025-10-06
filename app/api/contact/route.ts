import { NextResponse } from "next/server"
import { z } from "zod"
import { Resend } from "resend"

// export const runtime = "edge" // Temporarily disabled due to build issues

const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(200),
  comment: z.string().min(1).max(5000),
  // honeypot field (should be empty)
  website: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    // Get environment variables directly in Edge Runtime
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const RESEND_FROM = process.env.RESEND_FROM
    const RESEND_TO = process.env.RESEND_TO

    if (!RESEND_API_KEY || !RESEND_FROM || !RESEND_TO) {
      console.error("Missing environment variables:", {
        RESEND_API_KEY: !!RESEND_API_KEY,
        RESEND_FROM: !!RESEND_FROM,
        RESEND_TO: !!RESEND_TO,
      })
      return NextResponse.json({ error: "環境変数が設定されていません" }, { status: 500 })
    }

    const json = await request.json()
    const parse = contactSchema.safeParse(json)

    if (!parse.success) {
      return NextResponse.json({ error: "入力値が不正です", issues: parse.error.issues }, { status: 400 })
    }

    const { name, email, comment, website } = parse.data

    // basic honeypot: if present -> treat as spam
    if (website && website.trim().length > 0) {
      return NextResponse.json({ ok: true })
    }

    const resend = new Resend(RESEND_API_KEY)
    const subject = `Kuroneko Contact: ${name}`
    const submittedAt = new Date().toISOString()

    // Generate HTML content manually to avoid React Email render issues
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Message</title>
        </head>
        <body style="background-color: #f6f9fc; color: #0a0a0a; font-family: Arial, sans-serif; margin: 0; padding: 20px;">
          <div style="background-color: #ffffff; border-radius: 8px; padding: 24px; margin: 24px auto; width: 100%; max-width: 600px; border: 1px solid #e6e6e6;">
            <h1 style="font-size: 20px; margin: 0 0 16px 0; color: #000;">New Contact Message</h1>
            
            <div style="margin-bottom: 16px;">
              <p style="font-size: 14px; margin: 0 0 8px 0;"><strong>Name:</strong> ${name}</p>
              <p style="font-size: 14px; margin: 0 0 8px 0;"><strong>Email:</strong> ${email}</p>
              <p style="font-size: 14px; margin: 0 0 8px 0;"><strong>Submitted:</strong> ${submittedAt}</p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e6e6e6; margin: 16px 0;">
            
            <div>
              <p style="font-size: 14px; margin: 0 0 8px 0;"><strong>Message:</strong></p>
              <div style="white-space: pre-wrap; line-height: 1.6; font-size: 14px; background-color: #fafafa; border-radius: 6px; padding: 12px; border: 1px solid #eee;">
${comment}
              </div>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e6e6e6; margin: 16px 0;">
            
            <p style="font-size: 12px; color: #666; margin: 0;">This email was sent from your portfolio contact form.</p>
          </div>
        </body>
      </html>
    `

    const text = `Name: ${name}\nEmail: ${email}\nSubmitted: ${submittedAt}\n\n${comment}`

    // Send notification email to admin
    await resend.emails.send({
      from: RESEND_FROM,
      to: RESEND_TO,
      subject,
      replyTo: email,
      html,
      text,
    })

    // Send confirmation email to the user
    const confirmationHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>お問い合わせありがとうございます</title>
        </head>
        <body style="background-color: #f6f9fc; color: #0a0a0a; font-family: Arial, sans-serif; margin: 0; padding: 20px;">
          <div style="background-color: #ffffff; border-radius: 8px; padding: 24px; margin: 24px auto; width: 100%; max-width: 600px; border: 1px solid #e6e6e6;">
            <h1 style="font-size: 20px; margin: 0 0 16px 0; color: #000;">お問い合わせありがとうございます</h1>
            
            <p style="font-size: 14px; margin: 0 0 16px 0; line-height: 1.6;">
              ${name} 様<br><br>
              この度は、お問い合わせいただきありがとうございます。<br>
              以下の内容で承りました。
            </p>
            
            <div style="background-color: #fafafa; border-radius: 6px; padding: 12px; border: 1px solid #eee; margin: 16px 0;">
              <p style="font-size: 14px; margin: 0 0 8px 0;"><strong>お名前:</strong> ${name}</p>
              <p style="font-size: 14px; margin: 0 0 8px 0;"><strong>メールアドレス:</strong> ${email}</p>
              <p style="font-size: 14px; margin: 0 0 8px 0;"><strong>送信日時:</strong> ${submittedAt}</p>
            </div>
            
            <div style="margin: 16px 0;">
              <p style="font-size: 14px; margin: 0 0 8px 0;"><strong>お問い合わせ内容:</strong></p>
              <div style="white-space: pre-wrap; line-height: 1.6; font-size: 14px; background-color: #fafafa; border-radius: 6px; padding: 12px; border: 1px solid #eee;">
${comment}
              </div>
            </div>
            
            <p style="font-size: 14px; margin: 16px 0 0 0; line-height: 1.6;">
              内容を確認の上、近日中にご返信いたします。<br>
              お急ぎの場合は、直接メールにてご連絡ください。
            </p>
            
            <hr style="border: none; border-top: 1px solid #e6e6e6; margin: 16px 0;">
            
            <p style="font-size: 12px; color: #666; margin: 0;">このメールは自動送信されています。</p>
          </div>
        </body>
      </html>
    `

    const confirmationText = `お問い合わせありがとうございます\n\n${name} 様\n\nこの度は、お問い合わせいただきありがとうございます。\n以下の内容で承りました。\n\nお名前: ${name}\nメールアドレス: ${email}\n送信日時: ${submittedAt}\n\nお問い合わせ内容:\n${comment}\n\n内容を確認の上、近日中にご返信いたします。\nお急ぎの場合は、直接メールにてご連絡ください。\n\nこのメールは自動送信されています。`

    await resend.emails.send({
      from: RESEND_FROM,
      to: email,
      subject: "お問い合わせありがとうございます - Portfolio Contact",
      html: confirmationHtml,
      text: confirmationText,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error("/api/contact error", error)
    return NextResponse.json({ error: "送信に失敗しました" }, { status: 500 })
  }
}



