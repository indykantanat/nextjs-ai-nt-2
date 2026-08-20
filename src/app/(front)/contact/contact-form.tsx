"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendContactEmail, type ContactFormValues } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

const contactSchema = z.object({
  name: z.string().min(2, { message: "ชื่อต้องมี 2-100 ตัวอักษร" }).max(100, { message: "ชื่อต้องมี 2-100 ตัวอักษร" }),
  email: z.string().email({ message: "กรุณากรอกอีเมลให้ถูกต้อง" }),
  subject: z.string().min(3, { message: "หัวข้อต้องมี 3-150 ตัวอักษร" }).max(150, { message: "หัวข้อต้องมี 3-150 ตัวอักษร" }),
  message: z.string().min(10, { message: "ข้อความต้องมี 10-2000 ตัวอักษร" }).max(2000, { message: "ข้อความต้องมี 10-2000 ตัวอักษร" }),
  honeypot: z.string().max(0),
});

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "pending" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      honeypot: "",
    },
  });

  async function onSubmit(data: ContactFormValues) {
    setStatus("pending");
    setServerError(null);

    const result = await sendContactEmail(data);

    if (result.success) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
      setServerError(result.error || "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  }

  if (status === "success") {
    return (
      <div className="border-3 border-foreground p-sp5 text-center">
        <h3 className="rb-h4 mb-sp2">ส่งข้อความสำเร็จ!</h3>
        <p className="text-[15px] leading-[1.5] text-muted-foreground mb-sp4">
          เราได้รับข้อความของคุณแล้ว และจะติดต่อกลับโดยเร็วที่สุด
        </p>
        <Button onClick={() => setStatus("idle")} variant="outline" className="rb-button">
          ส่งข้อความอีกครั้ง
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-sp4">
      <FieldGroup>
        <Field>
          <FieldLabel>ชื่อ</FieldLabel>
          <FieldContent>
            <Input
              {...register("name")}
              placeholder="ชื่อ-นามสกุล"
              className="rb-input"
              disabled={status === "pending"}
            />
            <FieldError errors={errors.name?.types ? [] : errors.name ? [{ message: errors.name.message }] : []} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>อีเมล</FieldLabel>
          <FieldContent>
            <Input
              {...register("email")}
              type="email"
              placeholder="example@email.com"
              className="rb-input"
              disabled={status === "pending"}
            />
            <FieldError errors={errors.email ? [{ message: errors.email.message }] : []} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>หัวข้อ</FieldLabel>
          <FieldContent>
            <Input
              {...register("subject")}
              placeholder="หัวข้อที่ต้องการติดต่อ"
              className="rb-input"
              disabled={status === "pending"}
            />
            <FieldError errors={errors.subject ? [{ message: errors.subject.message }] : []} />
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel>ข้อความ</FieldLabel>
          <FieldContent>
            <textarea
              {...register("message")}
              placeholder="รายละเอียดข้อความ..."
              className="rb-input min-h-[150px] w-full resize-y"
              disabled={status === "pending"}
            />
            <FieldError errors={errors.message ? [{ message: errors.message.message }] : []} />
          </FieldContent>
        </Field>

        <div className="hidden">
          <Input {...register("honeypot")} tabIndex={-1} autoComplete="off" />
        </div>
      </FieldGroup>

      {status === "error" && (
        <div className="text-[12px] text-destructive font-medium">
          {serverError}
        </div>
      )}

      <Button
        type="submit"
        className="rb-button w-full"
        disabled={status === "pending"}
      >
        {status === "pending" ? (
          <div className="flex items-center gap-2">
            <Spinner className="h-4 w-4" />
            <span>กำลังส่ง...</span>
          </div>
        ) : (
          "ส่งข้อความ"
        )}
      </Button>
    </form>
  );
}
