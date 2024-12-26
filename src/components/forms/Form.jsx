import { Link } from "react-router-dom";

export default function Form({
  title,
  buttonText,
  linkText,
  linkTo,
  onSubmit,
  children,
}) {
  return (
    <div className="min-h-screen bg-gray-900 pt-32 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-gray-800 rounded-xl p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            {title}
          </h1>

          <form onSubmit={onSubmit} className="space-y-6">
            {children}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              {buttonText}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-400">
            {linkText}{" "}
            <Link to={linkTo} className="text-purple-400 hover:text-purple-300">
              {linkText === "Already have an account?" ? "Sign in" : "Sign up"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
