import { Link } from "@/i18n/routing";

export default function NotFound() {
  return (
    <html>
      <body>
        <div className="text-center mt-10">
          {/* Header */}
          <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>

          {/* Message */}
          <p className="text-2xl text-gray-600 mb-6">
            Oops! The page you are looking for does not exist.
          </p>

          {/* Navigation Link */}
          <Link href="/" className="text-blue-500 hover:text-blue-700 text-lg">
            Go back to homepage
          </Link>
        </div>
      </body>
    </html>
  );
}
