import { describe, it, expect, vi, beforeEach } from "vitest";
import { sendContactEmail } from "./contact";

const { sendMock } = vi.hoisted(() => ({
  sendMock: vi.fn(),
}));

vi.mock("resend", () => {
  return {
    Resend: class {
      emails = {
        send: sendMock,
      };
    },
  };
});

describe("sendContactEmail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should send email successfully with valid data", async () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Hello",
      message: "This is a test message with enough length",
      honeypot: "",
    };

    sendMock.mockResolvedValue({ data: { id: "email-id" }, error: null });

    const result = await sendContactEmail(validData);

    expect(result).toEqual({ success: true });
    expect(sendMock).toHaveBeenCalledWith(expect.objectContaining({
      to: process.env.CONTACT_TO_EMAIL || "admin@example.com",
      replyTo: "john@example.com",
      subject: "Contact Form: Hello",
    }));
  });

  it("should not send email if honeypot is filled", async () => {
    const spamData = {
      name: "Spammer",
      email: "spam@example.com",
      subject: "Free Money",
      message: "Click this link now!",
      honeypot: "I am a bot",
    };

    const result = await sendContactEmail(spamData);

    expect(result).toEqual({ success: true });
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("should return validation error for invalid email", async () => {
    const invalidData = {
      name: "John Doe",
      email: "not-an-email",
      subject: "Hello",
      message: "This is a test message with enough length",
      honeypot: "",
    };

    const result = await sendContactEmail(invalidData);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Validation failed");
    expect(result.fieldErrors).toBeDefined();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("should return validation error for too short message", async () => {
    const invalidData = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Hello",
      message: "Too short",
      honeypot: "",
    };

    const result = await sendContactEmail(invalidData);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Validation failed");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("should return error when Resend API fails", async () => {
    const validData = {
      name: "John Doe",
      email: "john@example.com",
      subject: "Hello",
      message: "This is a test message with enough length",
      honeypot: "",
    };

    sendMock.mockResolvedValue({ data: null, error: { message: "API Error" } });

    const result = await sendContactEmail(validData);

    expect(result.success).toBe(false);
    expect(result.error).toBe("Failed to send email. Please try again later.");
  });
});
