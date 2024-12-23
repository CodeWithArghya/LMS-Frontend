import AuthForm from '../components/forms/AuthForm';
import FormInput from '../components/forms/FormInput';

export default function StudentSignUp() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <AuthForm
      title="Student Sign Up"
      buttonText="Sign Up"
      linkText="Already have an account?"
      linkTo="/student/signin"
      onSubmit={handleSubmit}
    >
      <FormInput
        label="Full Name"
        id="name"
        placeholder="Enter your full name"
      />
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
        placeholder="Create a password"
      />
      <FormInput
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        placeholder="Confirm your password"
      />
    </AuthForm>
  );
}