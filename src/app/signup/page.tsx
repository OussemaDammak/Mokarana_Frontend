"use client";

import Link from "next/link";
import { useState,useEffect } from "react";
import { useRouter, } from "next/navigation";
import { signup,googleLogin } from "@/lib/auth.service";
import { GoogleLogin, CredentialResponse,useGoogleLogin } from '@react-oauth/google';
 
const SignupPage = () => {
const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client?hl=en_US"; // <-- force language
    script.async = true;
    script.defer = true;
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!agreed) {
      setError("Please agree to the Terms and Conditions");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      await signup({
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });
      
      // Redirect to dashboard or home page after successful signup
       setTimeout(() => {
                router.refresh();
                window.location.href = '/';
                }, 1000);
    } catch (err: any) {
      setError(err.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    if (!credentialResponse.credential) {
      setError("No credential received from Google");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await googleLogin(credentialResponse.credential);
      setTimeout(() => {
                router.refresh();
                window.location.href = '/';
                }, 1000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
  };





  return (
    <>
      <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three dark:bg-dark mx-auto max-w-[500px] rounded-sm bg-white px-6 py-10 sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black sm:text-3xl dark:text-white">
                  Create your account
                </h3>
                <p className="text-body-color mb-11 text-center text-base font-medium">
                  Signup to unlock more features
                </p>

                {error && (
                  <div className="mb-6 rounded-sm bg-red-50 border border-red-200 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                    {error}
                  </div>
                )}
  <div className="mb-6 flex w-full max-w-full items-center justify-center">
  <div className="flex w-full max-w-full rounded-xs border border-stroke bg-[#f8f8f8] px-0 py-0 text-base text-body-color dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark dark:hover:shadow-none hover:border-primary hover:bg-primary/5 hover:text-primary dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary transition-all duration-300">
    <div className="w-full">
       {scriptLoaded && (
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
        useOneTap={false}
        size="large"
        shape="rectangular"
        text="signin_with"
        logo_alignment="left"
        theme="filled_black"
        width="100%" 
        
        locale="en_US"
      />
      )}
    </div>
  </div>
</div>


               

                <div className="mb-8 flex items-center justify-center">
                  <span className="bg-body-color/50 hidden h-[1px] w-full max-w-[60px] sm:block"></span>
                  <p className="text-body-color w-full px-5 text-center text-base font-medium">
                    Or, register with your email
                  </p>
                  <span className="bg-body-color/50 hidden h-[1px] w-full max-w-[60px] sm:block"></span>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <label
                      htmlFor="name"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="email"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your Email"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-8">
                    <label
                      htmlFor="password"
                      className="text-dark mb-3 block text-sm dark:text-white"
                    >
                      Your Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your Password"
                      className="border-stroke dark:text-body-color-dark dark:shadow-two text-body-color focus:border-primary dark:focus:border-primary w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base outline-hidden transition-all duration-300 dark:border-transparent dark:bg-[#2C303B] dark:focus:shadow-none"
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-8 flex">
                    <label
                      htmlFor="checkboxLabel"
                      className="text-body-color flex cursor-pointer text-sm font-medium select-none"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="checkboxLabel"
                          checked={agreed}
                          onChange={(e) => setAgreed(e.target.checked)}
                          className="sr-only"
                          disabled={loading}
                        />
                        <div className="box border-body-color/20 mt-1 mr-4 flex h-5 w-5 items-center justify-center rounded-sm border dark:border-white/10">
                          <span className={agreed ? "opacity-100" : "opacity-0"}>
                            <svg
                              width="11"
                              height="8"
                              viewBox="0 0 11 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                fill="#3056D3"
                                stroke="#3056D3"
                                strokeWidth="0.4"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                      <span>
                        By creating account means you agree to the
                        <a href="#0" className="text-primary hover:underline">
                          {" "}
                          Terms and Conditions{" "}
                        </a>
                        , and our
                        <a href="#0" className="text-primary hover:underline">
                          {" "}
                          Privacy Policy{" "}
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="mb-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="shadow-submit dark:shadow-submit-dark bg-red hover:bg-primary/90 flex w-full items-center justify-center rounded-xs px-9 py-4 text-base font-medium text-white duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? "Signing up..." : "Sign up"}
                    </button>
                  </div>
                </form>

                <p className="text-body-color text-center text-base font-medium">
                  Already using Startup?{" "}
                  <Link href="/signin" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-0 z-[-1]">
          <svg
            width="1440"
            height="969"
            viewBox="0 0 1440 969"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <mask
              id="mask0_95:1005"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="1440"
              height="969"
            >
              <rect width="1440" height="969" fill="#090E34" />
            </mask>
            <g mask="url(#mask0_95:1005)">
              <path
                opacity="0.1"
                d="M1086.96 297.978L632.959 554.978L935.625 535.926L1086.96 297.978Z"
                fill="url(#paint0_linear_95:1005)"
              />
              <path
                opacity="0.1"
                d="M1324.5 755.5L1450 687V886.5L1324.5 967.5L-10 288L1324.5 755.5Z"
                fill="url(#paint1_linear_95:1005)"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_95:1005"
                x1="1178.4"
                y1="151.853"
                x2="780.959"
                y2="453.581"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_95:1005"
                x1="160.5"
                y1="220"
                x2="1099.45"
                y2="1192.04"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
    </>
  );
};

export default SignupPage;