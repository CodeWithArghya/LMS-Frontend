import AuthForm from '../components/forms/AuthForm';
import FormInput from '../components/forms/FormInput';

export default function StudentSignIn() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <AuthForm
      title="Student Sign In"
      buttonText="Sign In"
      linkText="Don't have an account?"
      linkTo="/student/signup"
      onSubmit={handleSubmit}
    >
      <FormInput
        label="Email Address"
        type="email"
        id="email"
        placeholder="Enter your email"
      />
      <FormInput
        label="Password"
        type="password"
        id="password"
        placeholder="Enter your password"
      />
    </AuthForm>
  );
}