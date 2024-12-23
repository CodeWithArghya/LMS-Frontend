import AuthForm from '../components/forms/AuthForm';
import FormInput from '../components/forms/FormInput';

export default function InstructorSignUp() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <AuthForm
      title="Instructor Sign Up"
      buttonText="Sign Up"
      linkText="Already have an account?"
      linkTo="/instructor/signin"
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
      <FormInput
        label="Specialization"
        id="specialization"
        placeholder="Your area of expertise"
      />
    </AuthForm>
  );
}