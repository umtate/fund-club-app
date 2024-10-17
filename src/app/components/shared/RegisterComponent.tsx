import { RegisterUserForm } from "./RegisterUserForm";

export default function RegisterComponent() {
  return (
    <>
       <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0 lg:mt-12">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create Account</h1>
          </div>
          <RegisterUserForm />
        </div>
      </div>
    </>
  );
}
