"use client";

import { Button } from "@/components/ui/button";
import { AppProductsComponent } from "../components/admin/AddPrdoucts";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  return (
    <>
      {" "}
      <div className="border-t">
        <div className="bg-background">
          <div className="h-full mx-auto py-8 lg:px-20">
            <div className="my-8">
              <Button
                variant="secondary"
                onClick={() => router.push("/shop/products")}
              >
                Go To Shop
              </Button>
            </div>

            <AppProductsComponent />
          </div>
        </div>
      </div>
    </>
  );
}
