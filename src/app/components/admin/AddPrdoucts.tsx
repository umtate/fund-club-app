"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/ui/icons";

const validationSchema = Yup.object().shape({
  isbn: Yup.string().required(),
  quantity: Yup.number().required(),
  price: Yup.string().required(),
});

export function AppProductsComponent() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      isbn: "",
      quantity: "",
      price: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      fetch("/api/books", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      })
        .then((res) => res.json())
        .then((data) => {
          setIsLoading(false);
          router.push(`/shop/products/${data?.id}`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
  });

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Add book to catalogue</CardTitle>
      </CardHeader>

      <form onSubmit={formik.handleSubmit}>
        <CardContent className="grid gap-6">
          <div className="flex">
            <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                type="text"
                name="isbn"
                onChange={formik.handleChange}
                value={formik.values.isbn}
              />
              {formik.errors.isbn && formik.touched.isbn ? (
                <Label className="text-red-600">{formik.errors.isbn}</Label>
              ) : null}{" "}
            </div>
          </div>

          <div className="flex">
            <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="text"
                name="price"
                onChange={formik.handleChange}
                value={formik.values.price}
              />
              {formik.errors.price && formik.touched.price ? (
                <Label className="text-red-600">{formik.errors.price}</Label>
              ) : null}{" "}
            </div>
            <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
              <Label htmlFor="quantity">Stock Quantity</Label>
              <Input
                id="quantity"
                type="number"
                name="quantity"
                onChange={formik.handleChange}
                value={formik.values.quantity}
              />
              {formik.errors.quantity && formik.touched.quantity ? (
                <Label className="text-red-600">{formik.errors.quantity}</Label>
              ) : null}{" "}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end my-4">

        <Button disabled={isLoading} className="mx-3" type="submit">
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Add book
          </Button>

        </CardFooter>
      </form>
    </Card>
  );
}
