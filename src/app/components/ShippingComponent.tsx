"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ShippingComponent() {
  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Shipping information</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="firstName">First name</Label>
          <Input id="firstName" type="text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="lastName">Last name</Label>
          <Input id="lastName" type="text" />
        </div>
	<div className="grid gap-2">
          <Label htmlFor="address">Address</Label>
          <Input id="address" type="text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="company">Company</Label>
          <Input id="company" type="text" />
        </div>
	<div className="grid gap-2">
          <Label htmlFor="postCode">Postal code</Label>
          <Input id="postCode" type="text" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" type="text" />
        </div>
	<div className="grid gap-2">
          <Label htmlFor="Country">Country</Label>
          <Input id="Country" type="text" />
        </div>

      </CardContent>
      <CardFooter>
        <Button className="w-full">Continue to payment</Button>
      </CardFooter>
    </Card>
  )
}