import React, { useContext, useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaArrowLeftLong } from "react-icons/fa6";
import Button from "../../components/Button";
import { CoachContext } from "../../context/CoachProvider";
import { ToastContext } from "../../context/ToastProvider";
import { useNavigate } from "react-router";
import { LoadingContext } from "../../context/LoadingProvider";
import background from "../../assets/background.jpg";

const Login = () => {
  const [domain, setDomain] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const { login } = useContext(CoachContext);
  const { showToast } = useContext(ToastContext);
  const { isCoachAuthenticated } = useContext(CoachContext);
  const { isLoading, setIsLoading } = useContext(LoadingContext);
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error3, setError3] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [actualOTP, setActualOTP] = useState("");
  const [isBlurred, setIsBlurred] = useState(false);

  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [error1, setError1] = useState("");
  const [error2, setError2] = useState("");

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setDomain(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!domain || !password) {
      showToast("Credentials required", "error");
      return setError("Please enter both domain id and password");
    }

    if (password.length < 8 || password.length > 20) {
      return setError("Password must be between  8-20 characters");
    }
    if (domain.length < 10) {
      return setError("Domain Id should be atleast 10 characters");
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "http://localhost:5500/api/v1/auth/coach-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ domain_name: domain, password }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        showToast(`Welcome coach ${json.data.coach.domain_name}`);
        login(json.data.token, json.data.coach);
      } else {
        setError(json.message || "Invalid domain or password");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isCoachAuthenticated) {
      navigate("/admin/dashboard");
    }
  }, [isCoachAuthenticated, navigate]);

  //forgot password functions
  const handleOTPChange = (e, index) => {
    const value = e.target.value;

    if (/[^0-9]/.test(value)) {
      return; // Allow only numeric characters
    }

    setOtp((prevOtp) => {
      const otpArray = prevOtp.split("");
      otpArray[index] = value;
      return otpArray.join("");
    });

    if (index < 5 && value) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData("Text");
    const digits = pastedValue.replace(/\D/g, "").slice(0, 6); // Only get numbers and ensure no more than 6 digits
    setOtp(digits);
  };

  const togglePasswordVisibility1 = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const sendOTP = async (email) => {
    try {
      setIsLoading(true);

      if (!email) {
        setIsLoading(false);
        return setError2("Enter Valid Email");
      }

      const response = await fetch(
        "http://localhost:5500/api/v1/auth/send-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        setOtpSent(true);
        setIsBlurred(true);
        setStep(2);
        setIsLoading(false);
        showToast("OTP sent successfully");
      } else {
        if (
          response.status === 401 ||
          response.status === 404 ||
          response.status === 500
        ) {
          setIsLoading(false);
          return setError2(json.message);
        }
      }
    } catch (error) {}
  };

  const verifyOTP = async (otp) => {
    try {
      setIsLoading(true);

      if (!otp) {
        setIsLoading(false);
        return setError1("Enter Valid OTP");
      }

      const response = await fetch(
        "http://localhost:5500/api/v1/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, user_otp: otp }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        setIsLoading(false);
        setStep(3); // Move to password reset step
        showToast("OTP verified successfully");
      } else {
        if (
          response.status === 401 ||
          response.status === 404 ||
          response.status === 500
        ) {
          setIsLoading(false);
          return setError1(json.message);
        }
      }
    } catch (error) {}
  };

  const handleEmailSubmit = async () => {
    await sendOTP(email);
  };

  const handleOTPSubmit = async () => {
    await verifyOTP(otp);
  };

  const handlePasswordSubmit = async () => {
    if (!newPassword || !confirmPassword) {
      return setError3("Enter All Fields");
    }
    if (newPassword !== confirmPassword) {
      return setError3("Passwords Do Not Match");
    }
    setError3("");

    try {
      setIsLoading(true);

      const response = await fetch(
        "http://localhost:5500/api/v1/coach/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            newPassword,
          }),
        }
      );

      const json = await response.json();

      if (response.ok) {
        setIsLoading(false);
        showToast(json.message);
        navigate("/login");
      } else {
        if (
          response.status === 401 ||
          response.status === 404 ||
          response.status === 500
        ) {
          setIsLoading(false);
          return setError3(json.message);
        }
      }

      setIsLoading(false);
    } catch (error) {}
  };

  return (
    <>
      <div className="h-dvh overflow-hidden bg-[url('./assets/background.jpg')] bg-cover bg-center flex flex-col items-center py-10 px-6">
        <div className="absolute inset-0 bg-gray-50/90"></div>

        <div className="flex justify-center items-center h-screen rounded-lg z-10">
          {/* Content container */}
          <div className="relative h-[550px]  flex flex-col md:flex-row  overflow-hidden">
            {/* Left side - Image placeholder with purple overlay */}
            <div className="w-[440px]  p-4 flex items-center justify-center bg-[rgba(40,31,108,0.3)] rounded-2xl backdrop-blur-sm">
              <span className="text-white text-2xl font-bold">Hello</span>
            </div>

            {/* Right side - Login form with transparency */}
            <div className="w-[470px] flex items-center justify-center p-4 rounded-r-lg">
              <div className="w-full  ml-20">
                {/* Login header */}
                <h2 className="text-blue-900 font-bold text-2xl mb-8 text-center">
                  {step === 0 && "Login"}
                  {step === 1 && "Forgot your password ?"}
                  {step === 2 && "OTP page Login"}
                  {step === 3 && "Reset Password to Login"}
                </h2>

                {step === 0 && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Domain input */}
                    <div>
                      <input
                        type="text"
                        placeholder="Domain Id"
                        className="w-full p-3 my-4 rounded-[10px] bg-[rgba(209,201,255,0.6)] border-b-blue-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={domain}
                        onChange={handleEmailChange}
                      />
                    </div>

                    {/* Password input */}
                    <div className="relative">
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Password"
                        className="w-full p-3  rounded-[10px] bg-[rgba(209,201,255,0.6)] border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      {password !== "" && (
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          onClick={togglePasswordVisibility}
                        >
                          {isPasswordVisible ? (
                            <AiFillEyeInvisible size={20} />
                          ) : (
                            <AiFillEye size={20} />
                          )}
                        </button>
                      )}
                    </div>

                    {/* Error message */}
                    {error && (
                      <div className="text-red-500 text-sm">{error}</div>
                    )}

                    {/* Forgot password link */}
                    <div className="text-right -mt-3 px-1">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="text-sm  text-blue-900 hover:underline cursor-pointer font-bold"
                      >
                        Forgot Password?
                      </button>
                    </div>

                    {/* Login button */}
                    <div className="flex justify-center items-center">
                      <button
                        type="submit"
                        className="w-50 bg-blue-900 text-white py-2 rounded-2xl cursor-pointer"
                        disabled={isLoading}
                      >
                        {isLoading ? "Signing In..." : "Login"}
                      </button>
                    </div>

                    {/* Or login with separator
                    <div className="flex items-center justify-center gap-2 text-xs text-gray-500 my-2">
                      <div className="h-px bg-gray-600 w-25"></div>
                      <span className="text-blue-900 font-bold">
                        Or Login with
                      </span>
                      <div className="h-px bg-gray-900 w-25"></div>
                    </div> */}

                    {/* Google button */}
                    {/* <button
                      type="button"
                      className="w-full bg-[rgba(209,201,255,0.6)] cursor-pointer py-2 mt-5 rounded-[10px] text-sm flex items-center justify-center gap-2"
                    >
                      <FcGoogle size={20} />
                      Google
                    </button> */}
                  </form>
                )}

                {/* Forgot Password Steps */}
                {step === 1 && (
                  <div className="space-y-4">
                    <input
                      type="email"
                      placeholder="Enter your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className=" w-[350px] p-3 rounded-2xl bg-[rgba(209,201,255,0.6)]  focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    {error2 && (
                      <div className="text-red-500 text-sm mt-1">{error2}</div>
                    )}
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        // onClick={handleEmailSubmit}
                        onClick ={() =>setStep(2)}//for checkin figma
                        className="w-40 bg-blue-900 text-white py-2 rounded-2xl cursor-pointer"
                      >
                        Submit
                      </button>
                    </div>
                    <div className="text-center mt-4 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        className="text-sm text-blue-950 font-medium  cursor-pointer  flex items-center gap-2"
                      >
                        <FaArrowLeftLong size={18} className="text-blue-900 font-bold" />
                        <span>Back to Login</span>
                      </button>
                    </div>
                  </div>
                )}

                {step === 2 && !otpSent && (//for figma check
                  <div className="space-y-4">
                  <div className="text-center mx-0 text-gray-400 -mt-7">
                       <p> Enter Code send to your Email ID</p>
                  </div>
                      <div className="flex justify-center gap-x-2 mb-9">
                      {[0, 1, 2, 3, 4, 5].map((index) => (
                        <input
                          key={index}
                          id={`otp-input-${index}`}
                          type="text"
                          maxLength="1"
                          onChange={(e) => handleOTPChange(e, index)}
                          onPaste={handlePaste}
                          className="w-10 h-10 text-center text-lg rounded bg-[rgba(209,201,255,0.6)] border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      ))}
                    </div>
                    {error1 && (
                      <div className="text-red-500 text-sm mt-1 text-center">
                        {error1}
                      </div>
                    )}
                       <div className="text-center mt-5 text-gray-400">
                  <span> Didn't get the OTP ? </span>
                  <button type="submit" 
                  
                  className="text-blue-900 mx-2 cursor-pointer hover:underline">
                    Resend it.
                  </button>

                  </div>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        // onClick={handleOTPSubmit}
                        onClick ={() =>setStep(3)}//for checkin figma
                        className="w-40 bg-blue-900 text-white py-2 rounded-2xl cursor-pointer"
                      >
                        Verify OTP
                      </button>
                    </div>
                    <div className="text-center mt-4 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        className="text-sm text-blue-950 font-medium  cursor-pointer  flex items-center gap-2"
                      >
                        <FaArrowLeftLong size={18} className="text-blue-900 font-bold" />
                        <span>Back to Login</span>
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4">
                    <div>
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        placeholder="Enter your New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full p-3 rounded bg-[rgba(209,201,255,0.6)] border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      {newPassword !== "" && (
                        <button
                          type="button"
                          className="absolute right-3 transform -translate-y-1/2 text-gray-400"
                          onClick={togglePasswordVisibility}
                        >
                          {isPasswordVisible ? (
                            <AiFillEyeInvisible size={20} />
                          ) : (
                            <AiFillEye size={20} />
                          )}
                        </button>
                      )}
                    </div>
                    <div className="relative">
                      <input
                        type={isConfirmPasswordVisible ? "text" : "password"}
                        placeholder="Confirm your Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full p-3 rounded bg-[rgba(209,201,255,0.6)] border-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      {confirmPassword !== "" && (
                        <button
                          type="button"
                          onClick={togglePasswordVisibility1}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        >
                          {isConfirmPasswordVisible ? (
                            <AiFillEyeInvisible size={20} />
                          ) : (
                            <AiFillEye size={20} />
                          )}
                        </button>
                      )}
                    </div>
                    {error3 && (
                      <div className="text-red-500 text-sm mt-1">{error3}</div>
                    )}
                    <div className="flex justify-center">
                      <button
                        onClick={handlePasswordSubmit}
                        className="w-40 bg-blue-900 text-white py-2 rounded-2xl cursor-pointer"
                      >
                        Reset Password
                      </button>
                    </div>
                    <div className="text-center mt-4 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        className="text-sm text-blue-950 font-medium  cursor-pointer  flex items-center gap-2"
                      >
                        <FaArrowLeftLong size={18} className="text-blue-900 font-bold" />
                        <span>Back to Login</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
