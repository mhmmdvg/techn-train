import Input from '@/components/input';
import useAuthentication from '@/hooks/use-auth';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const Login = () => {
  const [loginInput, setLoginInput] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const { authLogin } = useAuthentication();

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginInput({
      ...loginInput,
      [name]: value,
    });
  };

  useEffect(() => {
    if (
      loginInput.username === '' ||
      loginInput.password === '' ||
      loginInput.password.length <= 8
    ) {
      return setDisableButton(true);
    }
    return setDisableButton(false);
  }, [loginInput]);

  console.log(loginInput);

  return (
    <main className="flex justify-center items-center h-screen px-0 py-0 mx-auto bg-foreground">
      <div className="bg-white w-[400px] flex flex-col justify-center items-center rounded-lg py-12 px-8 space-y-5">
        <h1 className="text-gray-500 text-sm font-semibold">Ini teh logo</h1>
        <div>
          <h1 className="text-black font-bold text-lg">
            Log In to Dashboard Kit
          </h1>
          <p className="font-semibold text-gray-400 text-xs">
            Enter your email and password below
          </p>
        </div>

        <form
          className="w-full space-y-5"
          onSubmit={(e: FormEvent<HTMLFormElement>) =>
            authLogin(e, loginInput.username, loginInput.password)
          }
        >
          <div className="flex flex-col space-y-1 w-full items-start">
            <label className="font-semibold text-gray-400 text-xs">EMAIL</label>
            <Input
              placeholder="Email address"
              type="text"
              name="username"
              onChange={handleInput}
              // onChange={(e: ChangeEvent<HTMLInputElement>) =>
              //   console.log(e.target.value)
              // }
            />
          </div>

          <div className="flex flex-col relative space-y-1 w-full items-start">
            <div className="flex flex-row justify-between w-full">
              <label className="font-semibold text-gray-400 text-xs">
                PASSWORD
              </label>
              <a className="text-xs font-semibold text-gray-400 hover:cursor-pointer">
                Forgot password?
              </a>
            </div>
            <div
              className="absolute top-[58%] transform -translate-y-1/2 left-[19rem] hover:cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeIcon className="h-4 w-4 text-gray-500 " />
              ) : (
                <EyeOffIcon className="h-4 w-4 text-gray-500 " />
              )}
            </div>
            <Input
              placeholder="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              onChange={handleInput}
            />
          </div>

          <button
            disabled={disableButton}
            className="bg-accent disabled:bg-accent/25 disabled:shadow-none text-white w-full shadow-md shadow-indigo-500/50"
            type="submit"
          >
            Log In
          </button>
        </form>

        <p className="text-xs font-semibold text-gray-400">
          Don't have an account?
          <a className="text-indigo-500 hover:cursor-pointer">Sign up</a>
        </p>
      </div>
    </main>
  );
};

export default Login;
