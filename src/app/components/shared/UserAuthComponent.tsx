"use client";

import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { AuthContext } from "./auth/AuthProvider";
import { useRouter } from "next/navigation";
import { Actions } from "./auth/actions";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

const validationSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
});

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const authContext = React.useContext(AuthContext);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      fetch("/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((res) => {
          if (res.status === 200) return res.json();
          throw Error;
        })
        .then((data) => {
          setIsLoading(false);
          authContext.dispatch({
            type: Actions.LOG_IN,
            payload: data,
          });
          router.push("/shop/products");
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid gap-2">
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
            Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}
