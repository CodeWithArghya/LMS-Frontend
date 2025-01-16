import { Link } from 'react-router-dom';

export default function AuthForm({ 
  title, 
  buttonText, 
  linkText, 
  linkTo, 
  onSubmit, 
  children 
}) {
  return (
    <div className="min-h-screen bg-gray-900 py-16 md:py-20 lg:py-32 px-4">
      <div className="container mx-auto">
        <div className="max-w-sm md:max-w-md mx-auto bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold text-white text-center mb-6 md:mb-8">{title}</h1>
          
          <form onSubmit={onSubmit} className="space-y-4 md:space-y-6">
            {children}
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 md:py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity text-sm md:text-base"
            >
              {buttonText}
            </button>
          </form>
          
          <p className="mt-4 md:mt-6 text-center text-sm md:text-base text-gray-400">
            {linkText}{' '}
            <Link to={linkTo} className="text-purple-400 hover:text-purple-300">
              {linkText === "Already have an account?" ? "Sign in" : "Sign up"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}