import { Outlet, useLocation } from 'react-router-dom';
import loginImage from '../assets/image/log-in.png';
import signUpImage from '../assets/image/login-page.png';

const AuthLayout = () => {
  const location = useLocation();
  const isSignIn = location.pathname === '/auth/signin';
  const isSignUp = location.pathname === '/auth/signup';
  const showAuthImage = isSignIn || isSignUp;

  return (
    <section className="min-h-screen bg-white text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1.08fr_0.92fr]">
        <div className="flex items-center justify-center border-b-2 border-zinc-200 bg-white p-6 sm:p-8 lg:border-b-0 lg:border-r-2 lg:border-zinc-200 lg:p-10">
          <div
            className={`flex w-full max-w-[44rem] items-center justify-center rounded-[2rem] border-2 border-dashed p-4 sm:p-6 ${
              showAuthImage ? 'border-transparent bg-white' : 'border-zinc-300 bg-zinc-100/60'
            }`}
          >
            {showAuthImage ? (
              <img
                src={isSignIn ? loginImage : signUpImage}
                alt={isSignIn ? 'Login visual' : 'Sign up visual'}
                className="h-auto w-full max-w-[38rem] rounded-2xl object-contain"
              />
            ) : (
              <div className="relative aspect-square w-full max-w-[18rem] border-[10px] border-zinc-50/90">
                <span className="absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 rotate-45 bg-zinc-50/90" />
                <span className="absolute left-1/2 top-0 h-full w-2 -translate-x-1/2 -rotate-45 bg-zinc-50/90" />
              </div>
            )}
          </div>
        </div>

        <main className="flex items-center bg-white px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;
