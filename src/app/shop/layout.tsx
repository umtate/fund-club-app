import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Sidebar } from "../components/shop/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Funda Club App",
  description: "Join the Literary Adventure.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="hidden md:block">
      <div className="border-t">
        <div className="bg-background my-4">
          <div className="grid lg:grid-cols-5">
            <Sidebar className="hidden lg:block" />
            <div className="col-span-3 lg:col-span-4 lg:border-l">
              <div className="h-full px-4 py-6 lg:px-8">
                <div className="border-none p-0 outline-none">
                  <div className="flex items-center justify-between">
                    <div className="">
                      <Input placeholder="search" />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Funda Club
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Join the Literary Adventure.
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4">{children}</div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
