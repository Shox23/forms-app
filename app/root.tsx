import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { Progress } from "./components/ui/progress";
import { FormProvider } from "./store/formStore";
import { ROUTES } from "./lib/constants";
import { Toaster } from "./components/ui/sonner";
import { SuccessModal } from "./components/SuccessModal";
import { useSuccessModal } from "./hooks/useSuccessModal";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

function FormLayout() {
  const location = useLocation();
  const routeValues = Object.values(ROUTES);
  const stepIndex = routeValues.indexOf(location.pathname as any);
  const progress = stepIndex >= 0 ? Math.round(((stepIndex + 1) / routeValues.length) * 100) : 0;
  const { modalProps } = useSuccessModal();

  return (
    <div className="min-h-screen flex flex-col relative bg-neutral-50 pt-10 px-4">
      {progress > 0 && (
        <div className="max-w-md mx-auto w-full mb-6">
          <Progress value={progress} className="h-1.5 rounded-none bg-neutral-200" />
        </div>
      )}
      
      <div className="flex-grow">
        <Outlet />
      </div>
      <Toaster />
      <SuccessModal {...modalProps} />
    </div>
  );
}

export default function App() {
  return (
    <FormProvider>
      <FormLayout />
    </FormProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
