import { NextRequest } from "next/server"

const sendMailMock = jest.fn().mockResolvedValue({ messageId: "test-email-id" })

// Mock nodemailer (Gmail SMTP)
jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: sendMailMock,
  })),
}))

process.env.GMAIL_USER = "test@example.com"
process.env.GMAIL_APP_PASSWORD = "test-app-password"
process.env.CONTACT_TO = "recipient@example.com"

const { POST } = require("@/app/api/contact/route")

describe("/api/contact", () => {
  beforeEach(() => {
    sendMailMock.mockClear()
  })

  it("should send email with valid data", async () => {
    const requestBody = {
      name: "Test User",
      email: "test@example.com",
      comment: "Hello, this is a test message.",
    }

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({ ok: true })
  })

  it("should reject invalid email", async () => {
    const requestBody = {
      name: "Test User",
      email: "invalid-email",
      comment: "Hello, this is a test message.",
    }

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe("入力値が不正です")
    expect(data.issues).toBeDefined()
  })

  it("should reject honeypot spam", async () => {
    const requestBody = {
      name: "Test User",
      email: "test@example.com",
      comment: "Hello, this is a test message.",
      website: "spam-website.com", // honeypot filled
    }

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({ ok: true })
  })

  it("should reject missing required fields", async () => {
    const requestBody = {
      name: "Test User",
      // missing email and comment
    }

    const request = new NextRequest("http://localhost:3000/api/contact", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.error).toBe("入力値が不正です")
  })
})





