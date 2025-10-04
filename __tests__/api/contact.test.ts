import { POST } from "@/app/api/contact/route"
import { NextRequest } from "next/server"

// Mock Resend
jest.mock("@/lib/email/config", () => ({
  resend: {
    emails: {
      send: jest.fn().mockResolvedValue({ id: "test-email-id" }),
    },
  },
  emailSender: {
    from: "test@example.com",
    to: "recipient@example.com",
  },
}))

// Mock React Email render
jest.mock("@react-email/render", () => ({
  render: jest.fn().mockReturnValue("<html>test email</html>"),
}))

describe("/api/contact", () => {
  beforeEach(() => {
    jest.clearAllMocks()
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





