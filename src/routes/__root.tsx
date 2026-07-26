import type { ReactNode } from "react";
import {
  createRootRoute,
  Outlet,
  ScrollRestoration,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { SmoothScroll } from "../components/SmoothScroll";
import { ScrollProgress, SiteNav } from "../components/SiteChrome";
import { CustomCursor } from "../components/CustomCursor";
import appCss from "../styles.css?url";

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Luxoria — Seven premium appliances engineered with obsessive craft. Explore the collection in an immersive 3D showroom."
        />
        <title>Luxoria — The Home, Engineered</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href={appCss} />
        <HeadContent />
      </head>
      <body>
        <SmoothScroll>
          <CustomCursor />
          <ScrollProgress />
          <SiteNav />
          {children}
        </SmoothScroll>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { title: "Luxoria — The Home, Engineered" },
      {
        name: "description",
        content:
          "Luxoria — Seven premium appliances engineered with obsessive craft. Explore the collection in an immersive 3D showroom.",
      },
    ],
  }),
  component: () => (
    <RootDocument>
      <Outlet />
    </RootDocument>
  ),
});
