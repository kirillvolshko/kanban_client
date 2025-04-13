"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

const AuthPage = () => {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-500">
      <div className="relative w-[400px] h-[450px] [perspective:1000px]">
        <div
          className={cn(
            "w-full h-full transition-transform duration-700 [transform-style:preserve-3d]",
            isRegistering ? "[transform:rotateY(180deg)]" : ""
          )}
        >
          <div className="absolute w-full h-full [backface-visibility:hidden]">
            <div className="bg-white/90 p-6 rounded shadow-md h-full flex flex-col justify-between">
              <LoginForm />
              <Button className="mt-4" onClick={() => setIsRegistering(true)}>
                Dont have an account? Register
              </Button>
            </div>
          </div>

          <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <div className="bg-white/90 p-6 rounded shadow-md h-full flex flex-col justify-between">
              <RegistrationForm />
              <Button className="mt-4" onClick={() => setIsRegistering(false)}>
                Already registered? Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
