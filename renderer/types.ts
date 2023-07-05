export type { PageContextServer };
export type { PageContextClient };
export type { PageContext };
export type { PageProperties as PageProps };

import type {
  PageContextBuiltIn,
  /*
  // When using Client Routing https://vite-plugin-ssr.com/clientRouting
  PageContextBuiltInClientWithClientRouting as PageContextBuiltInClient
  /*/
  // When using Server Routing
  PageContextBuiltInClientWithServerRouting as PageContextBuiltInClient,
  //*/
} from "vite-plugin-ssr/types";

type Page = (pageProperties: PageProperties) => React.ReactElement;
type PageProperties = Record<string, unknown>;

export type PageContextCustom = {
  Page: Page;
  pageProps?: PageProperties;
  urlPathname: string;
  exports: {
    documentProps?: {
      title?: string;
      description?: string;
    };
  };
};

export type User = {
  message?: string;
  actualRoom: string;
  isTyping?: boolean;
  id: string;
  username: string;
  date?: number;
};

type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom;
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom;

type PageContext = PageContextClient | PageContextServer;
