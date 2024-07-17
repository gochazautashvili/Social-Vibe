import Header from "@/components/Header";
import Aside from "@/components/aside/Aside";
import MobileMenu from "@/components/aside/MobileMenu";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex">
        <Aside />
        <main className="md:min-h-screen min-h-[93vh] flex-[10] dark:bg-black">
          <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
          {children}
        </main>
        <Toaster />
      </div>
      <MobileMenu />
    </>
  );
};

export default layout;
