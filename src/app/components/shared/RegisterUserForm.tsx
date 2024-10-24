"use client";

import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

type UserAuthFormProps = React.InputHTMLAttributes<HTMLInputElement>


const validationSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
  lastName: Yup.string().required(),
  firstName: Yup.string().required(),
});

export function RegisterUserForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      lastName: "",
      firstName: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      fetch("/api/register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => {
        res.json();
        setIsLoading(false);
      });
    },
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="firstName">
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              name="firstName"
              placeholder="first name"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
          </div>
          <div className="grid gap-1 my-4">
            <Label className="sr-only" htmlFor="lastName">
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              name="lastName"
              placeholder="last name"
              autoCapitalize="none"
              disabled={isLoading}
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              type="text"
              name="email"
              placeholder="name@example.com"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </div>
          <div className="grid gap-1 my-4">
            <Label className="sr-only" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="password"
              disabled={isLoading}
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
