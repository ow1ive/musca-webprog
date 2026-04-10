import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import googleIcon from '../../assets/image/google.png';
import appleIcon from '../../assets/image/apple.png';

const AUTH_STORAGE_KEY = 'musca-auth-user';

const inputClasses =
  'mt-2 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white';

const actionButtonClassName = 'w-full rounded-xl py-3 text-[11px] tracking-[0.2em]';
const socialButtonClassName = `${actionButtonClassName} gap-2 !bg-white hover:!bg-zinc-100`;

const EyeIcon = ({ visible }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
    {visible ? (
      <path
        d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Zm10 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        fill="currentColor"
      />
    ) : (
      <path
        d="M3 4.5 19.5 21l1.5-1.5-2.8-2.8A12.2 12.2 0 0 0 22 12s-3.5-6-10-6c-1.8 0-3.3.4-4.7 1L4.5 4.5 3 6Zm6.1 6.1 4.8 4.8A3 3 0 0 1 9.1 10.6ZM2 12s3.5 6 10 6c1.8 0 3.3-.4 4.7-1l-2.1-2.1a5 5 0 0 1-7-7L5.8 6A12.2 12.2 0 0 0 2 12Z"
        fill="currentColor"
      />
    )}
  </svg>
);

const SignUpPage = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    const normalizedEmail = email.trim().toLowerCase();

    if (!firstName.trim() || !lastName.trim() || !normalizedEmail || !password.trim()) {
      setError('Please complete all fields.');
      return;
    }

    if (password.trim().length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: normalizedEmail,
        password,
      }),
    );

    setSuccess('Account created. You can now log in.');
    navigate('/auth/signin', { replace: true });
  };

  return (
    <>
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">Sign Up</h1>
      <p className="mt-3 text-sm leading-6 text-zinc-600">
        Create your account to get started.
      </p>

      {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}
      {success ? <p className="mt-4 text-sm font-medium text-green-700">{success}</p> : null}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-medium text-zinc-700">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="First Name"
              autoComplete="given-name"
              className={inputClasses}
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div>
            <label htmlFor="last-name" className="text-sm font-medium text-zinc-700">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Last Name"
              autoComplete="family-name"
              className={inputClasses}
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            className={inputClasses}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-medium text-zinc-700">
            Password
          </label>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              autoComplete="new-password"
              className={`${inputClasses} pr-12`}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((previous) => !previous)}
              className="absolute right-3 top-1/2 mt-1 -translate-y-1/2 text-zinc-500 transition hover:text-zinc-900"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <EyeIcon visible={showPassword} />
            </button>
          </div>
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <Button type="submit" variant="primary" className={actionButtonClassName}>
          Create Account
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={socialButtonClassName}>
            <img src={googleIcon} alt="Google" className="h-3.5 w-3.5 object-contain" />
            <span>Sign Up with Google</span>
          </Button>
          <Button type="button" variant="secondary" className={socialButtonClassName}>
            <img src={appleIcon} alt="Apple" className="h-3.5 w-3.5 object-contain" />
            <span>Sign Up with Apple</span>
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-zinc-200 pt-6 text-sm text-zinc-600">
        Already have an account?{' '}
        <Link to="/auth/signin" className="font-semibold text-zinc-900 transition hover:text-zinc-600">
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
