"use client";

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

export function AppProductsComponent() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Add book to catalogue</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-6">
        <div className="flex">
          <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
            <Label htmlFor="title">Tilte</Label>
            <Input id="title" type="text" />
          </div>
          <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
            <Label htmlFor="author">Author</Label>
            <Input id="author" type="text" />
          </div>
        </div>

        <div className="flex">
          <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
            <Label htmlFor="isbn">ISBN</Label>
            <Input id="isbn" type="text" />
          </div>
          <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
            <Label htmlFor="publisher">Publisher</Label>
            <Input id="publishe" type="text" />
          </div>
        </div>

        <div className="flex">
          <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
            <Label htmlFor="publicationDate">Publication Date</Label>
            <Input id="publicationDate" type="text" />
          </div>
          <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
            <Label htmlFor="genre">Genre/Category</Label>
            <Input id="genre" type="text" />
          </div>
        </div>

        <div className="flex">
          <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
            <Label htmlFor="language">Language</Label>
            <Input id="language" type="text" />
          </div>
          <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
            <Label htmlFor="edition">Edition</Label>
            <Input id="edition" type="text" />
          </div>
        </div>

        <div className="flex">
          <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
            <Label htmlFor="numberOfPages">Number of Pages</Label>
            <Input id="numberOfPages" type="text" />
          </div>
          <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
            <Label htmlFor="coverType">Cover Type</Label>
            <Input id="coverType" type="text" />
          </div>
        </div>

        <div className="flex">
          <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="text" />
          </div>
          <div className="py-1.25 mx-3 px-0.75 items-center  w-1/2 md:w-full">
            <Label htmlFor="quantity">Stock Quantity</Label>
            <Input id="quantity" type="text" />
          </div>
        </div>

	<div className="grid gap-2 mx-3">
          <Label htmlFor="firstName">Upload Image</Label>
          <Input id="firstName" type="text" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-end my-4">
        <Button className="mx-3">Add book</Button>
      </CardFooter>
    </Card>
  );
}
