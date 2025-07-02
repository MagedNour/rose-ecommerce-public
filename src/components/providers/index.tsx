import NextIntelProvider from "./components/next-intl-provider";
import NextAuthProvider from "./components/next-auth-provider";
import ReactQueryProvider from "./components/react-query-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextIntelProvider>
      <NextAuthProvider>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </NextAuthProvider>
    </NextIntelProvider>
  );
}
