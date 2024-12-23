import AuthForm from '../components/forms/AuthForm';
import FormInput from '../components/forms/FormInput';

export default function InstructorSignIn() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <AuthForm
      title="Instructor Sign In"
      buttonText="Sign In"
      linkText="Don't have an account?"
      linkTo="/instructor/signup"
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