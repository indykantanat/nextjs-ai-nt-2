"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "กรุณากรอกอีเมล")
    .email("รูปแบบอีเมลไม่ถูกต้อง"),
  password: z
    .string()
    .min(1, "กรุณากรอกรหัสผ่าน")
    .min(8, "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginFormValues) {
        await authClient.signIn.email({
          email: data.email,
          password: data.password,
         }, {
            onSuccess: () => {
              alert('เข้าระบบสำเร็จ');
              router.replace('/');
            },
            onError: (ctx) => {
              alert(JSON.stringify(ctx.error));
            }
         });
  }

  return (
  <div className="flex min-h-screen items-center justify-center px-4 py-sp5">
    <Card variant="elevated" className="w-full gap-0 p-0 sm:max-w-md">
      <div className="flex items-center justify-between border-b-3 border-foreground bg-foreground px-sp3 py-2">
        <span className="rb-meta text-background">COSCI / LOGIN</span>
        <span className="rb-meta text-background">[ 01 ]</span>
      </div>
      <CardHeader className="p-sp4 pb-0">
        <CardTitle className="rb-h3">เข้าสู่ระบบ</CardTitle>
        <CardDescription>กรอกอีเมลและรหัสผ่านเพื่อเข้าสู่ระบบ</CardDescription>
      </CardHeader>
      <CardContent className="p-sp4">
        <form id="form-login" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-login-email">อีเมล</FieldLabel>
                  <Input
                    {...field}
                    id="form-login-email"
                    type="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-login-password">
                    รหัสผ่าน
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-login-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 border-t-3 border-foreground p-sp4">
        <Button type="submit" form="form-login" size="lg" className="w-full">
          เข้าสู่ระบบ
        </Button>
        <p className="text-center text-[14px] text-muted-foreground">
          ยังไม่มีบัญชี?{" "}
          <a href="/signup" className="rb-link">
            สมัครสมาชิก
          </a>
        </p>
      </CardFooter>
    </Card>
    </div>
  )
}