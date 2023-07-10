import React from "react";
import { PageContextProvider } from "./usePageContext";
import type { PageContext } from "./types";
import { css, Global } from "@emotion/react";

export { PageShell };

function PageShell({
  children,
  pageContext,
}: {
  children: React.ReactNode;
  pageContext: PageContext;
}) {
  return (
    <React.StrictMode>
      <Global styles={globalStyles} />
      <PageContextProvider pageContext={pageContext}>
        {children}
      </PageContextProvider>
    </React.StrictMode>
  );
}

const globalStyles = css`
  :root {
    line-height: 1.5;
    font-weight: 400;

    color: #141414;
    font-family: Poppins, -apple-system, system-ui, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }
  html,
  body {
    margin: 0;
    font-size: 16px;
  }
`;
