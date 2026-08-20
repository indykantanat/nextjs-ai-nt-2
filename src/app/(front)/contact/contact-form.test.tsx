import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ContactForm from "./contact-form";
import { sendContactEmail } from "@/app/actions/contact";

vi.mock("@/app/actions/contact", () => ({
  sendContactEmail: vi.fn(),
}));

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form fields", () => {
    render(<ContactForm />);
    
    expect(screen.getByText(/ชื่อ/i)).toBeInTheDocument();
    expect(screen.getByText(/อีเมล/i)).toBeInTheDocument();
    expect(screen.getByText(/หัวข้อ/i)).toBeInTheDocument();
    // Use getAllByText since "ข้อความ" appears in both label and button
    expect(screen.getAllByText(/ข้อความ/i)[0]).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ส่งข้อความ/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    render(<ContactForm />);
    
    fireEvent.click(screen.getByRole("button", { name: /ส่งข้อความ/i }));

    await waitFor(() => {
      expect(screen.getByText(/ชื่อต้องมี 2-100 ตัวอักษร/i)).toBeInTheDocument();
      expect(screen.getByText(/กรุณากรอกอีเมลให้ถูกต้อง/i)).toBeInTheDocument();
      expect(screen.getByText(/หัวข้อต้องมี 3-150 ตัวอักษร/i)).toBeInTheDocument();
      expect(screen.getByText(/ข้อความต้องมี 10-2000 ตัวอักษร/i)).toBeInTheDocument();
    });
  });

  it("submits form successfully and shows success message", async () => {
    (sendContactEmail as any).mockResolvedValue({ success: true });
    
    render(<ContactForm />);
    
    fireEvent.change(screen.getByPlaceholderText(/ชื่อ-นามสกุล/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/example@email.com/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/หัวข้อที่ต้องการติดต่อ/i), { target: { value: "Hello" } });
    fireEvent.change(screen.getByPlaceholderText(/รายละเอียดข้อความ.../i), { target: { value: "This is a test message long enough" } });
    
    fireEvent.click(screen.getByRole("button", { name: /ส่งข้อความ/i }));

    await waitFor(() => {
      expect(screen.getByText(/ส่งข้อความสำเร็จ!/i)).toBeInTheDocument();
      expect(screen.getByText(/เราได้รับข้อความของคุณแล้ว/i)).toBeInTheDocument();
    });
  });

  it("shows server error message on failed submission", async () => {
    (sendContactEmail as any).mockResolvedValue({ 
      success: false, 
      error: "เกิดข้อผิดพลาดทางเทคนิค กรุณาลองใหม่" 
    });
    
    render(<ContactForm />);
    
    fireEvent.change(screen.getByPlaceholderText(/ชื่อ-นามสกุล/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/example@email.com/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/หัวข้อที่ต้องการติดต่อ/i), { target: { value: "Hello" } });
    fireEvent.change(screen.getByPlaceholderText(/รายละเอียดข้อความ.../i), { target: { value: "This is a test message long enough" } });
    
    fireEvent.click(screen.getByRole("button", { name: /ส่งข้อความ/i }));

    await waitFor(() => {
      expect(screen.getByText(/เกิดข้อผิดพลาดทางเทคนิค กรุณาลองใหม่/i)).toBeInTheDocument();
    });
  });

  it("disables button and shows loading state during submission", async () => {
    // Use a promise that doesn't resolve immediately
    (sendContactEmail as any).mockReturnValue(new Promise(() => {}));
    
    render(<ContactForm />);
    
    fireEvent.change(screen.getByPlaceholderText(/ชื่อ-นามสกุล/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText(/example@email.com/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByPlaceholderText(/หัวข้อที่ต้องการติดต่อ/i), { target: { value: "Hello" } });
    fireEvent.change(screen.getByPlaceholderText(/รายละเอียดข้อความ.../i), { target: { value: "This is a test message long enough" } });
    
    fireEvent.click(screen.getByRole("button", { name: /ส่งข้อความ/i }));

    await waitFor(() => {
      expect(screen.getByRole("button")).toBeDisabled();
      expect(screen.getByText(/กำลังส่ง.../i)).toBeInTheDocument();
    });
  });
});
