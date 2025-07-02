import type Locale from "@/i18n/routing";

type RouteProps = {
  params: { locale: Locale };
  searchParams: SearchParams;
};

declare type LayoutProps = {
  children: React.ReactNode;
} & Pick<RouteProps, "params">;

declare type SearchParams = {
  [key: string]: string | string[] | undefined;
};

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}
