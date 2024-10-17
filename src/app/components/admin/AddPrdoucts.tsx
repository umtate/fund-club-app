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
import { Textarea } from "@/components/ui/textarea";

const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  author: Yup.string().required(),
  isbn: Yup.string().required(),
  publisher: Yup.string().required(),
  genre: Yup.string().required(),
  edition: Yup.string().required(),
  summary: Yup.string().required(),
  numberOfPages: Yup.number().required(),
  quantity: Yup.number().required(),
  price: Yup.string().required(),
  image: Yup.string(),
});

export function AppProductsComponent() {
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      isbn: "",
      publisher: "",
      genre: "",
      edition: "",
      numberOfPages: "",
      summary: "",
      quantity: "",
      price: "",
      image: "",
    },
    validationSchema,
    onSubmit: (values) => {
      fetch("/api/books", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((res) => res.json());
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
              <Label htmlFor="title">Tilte</Label>
              <Input
                id="title"
                type="text"
                name="title"
                onChange={formik.handleChange}
                value={formik.values.title}
              />
              {formik.errors.title && formik.touched.title ? (
                <Label className="text-red-600">{formik.errors.title}</Label>
              ) : null}{" "}
            </div>
            <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                type="text"
                name="author"
                onChange={formik.handleChange}
                value={formik.values.author}
              />
              {formik.errors.author && formik.touched.author ? (
                <Label className="text-red-600">{formik.errors.author}</Label>
              ) : null}{" "}
            </div>
          </div>

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
            <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
              <Label htmlFor="publisher">Publisher</Label>
              <Input
                id="publisher"
                type="text"
                name="publisher"
                onChange={formik.handleChange}
                value={formik.values.publisher}
              />
              {formik.errors.publisher && formik.touched.publisher ? (
                <Label className="text-red-600">
                  {formik.errors.publisher}
                </Label>
              ) : null}{" "}
            </div>
          </div>

          <div className="flex">
            <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
              <Label htmlFor="genre">Genre/Category</Label>
              <Input
                id="genre"
                type="text"
                name="genre"
                onChange={formik.handleChange}
                value={formik.values.genre}
              />
              {formik.errors.genre && formik.touched.genre ? (
                <Label className="text-red-600">{formik.errors.genre}</Label>
              ) : null}{" "}
            </div>

            <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
              <Label htmlFor="edition">Edition</Label>
              <Input
                id="edition"
                type="text"
                name="edition"
                onChange={formik.handleChange}
                value={formik.values.edition}
              />
              {formik.errors.edition && formik.touched.edition ? (
                <Label className="text-red-600">{formik.errors.edition}</Label>
              ) : null}{" "}
            </div>

            <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
              <Label htmlFor="numberOfPages">Number of Pages</Label>
              <Input
                id="numberOfPages"
                type="number"
                name="numberOfPages"
                onChange={formik.handleChange}
                value={formik.values.numberOfPages}
              />
              {formik.errors.numberOfPages && formik.touched.numberOfPages ? (
                <Label className="text-red-600">
                  {formik.errors.numberOfPages}
                </Label>
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
          <div className="grid gap-2 my-3 mx-3 ">
            <Label htmlFor="summary">Summary</Label>

            <Textarea
              placeholder="Type book summary here."
              name="summary"
              onChange={formik.handleChange}
              value={formik.values.summary}
            />
          </div>

          <div className="grid gap-2 my-3 mx-3 w-1/2 ">
            <Label htmlFor="image">Upload Image</Label>
            <Input id="image" type="file" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end my-4">
          <Button className="mx-3" type="submit">
            Add book
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
