"use client";
import { useState } from "react";
import { supabase } from "../supabaseclient";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  email: string;
  age: number;
  name: string;
  level: string;
};

export default function Auther() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);

  // Shared fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");

  // Sign-up only fields
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dob, setDob] = useState("");

  const handleSubmit = async () => {
    setError("");
    setSuccessMsg("");

    if (isSignUp) {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      if (!name.trim()) {
        setError("Name is required.");
        return;
      }
      if (!dob) {
        setError("Date of birth is required.");
        return;
      }

      setLoading(true);
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name, date_of_birth: dob },
        },
      });
      if (signUpError) {
        setError(signUpError.message);
      } else if (data.user) {
        const birthYear = new Date(dob).getFullYear();
        const age = new Date().getFullYear() - birthYear;

        const { error: insertError } = await supabase.from("users").insert({
          id: data.user.id,
          name: name,
          email: email,
          age: age,
          level: level,
          created_at: new Date().toISOString(),
        });

        if (insertError) {
          setError(
            "Account created but profile save failed: " + insertError.message,
          );
        } else {
          setSuccessMsg("Account created! Please sign in.");
          setPassword("");
          setConfirmPassword("");
          setName("");
          setDob("");
          setIsSignUp(false);
        }
      }
    } else {
      setLoading(true);
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        setError(signInError.message);
      } else {
        router.push("/home/overview");
      }
    }

    setLoading(false);
  };

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
    setSuccessMsg("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setDob("");
  };

  const inputClass =
    "w-full border-0 border-b border-gray-200 bg-transparent pb-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors";
  const labelClass = "block text-xs tracking-widest uppercase text-white mb-2";

  return (
    <div className="h-10/11 w-5/12 border-3 border-stone rounded-2xl bg-white/10 ">
      <div className="flex items-center justify-center px-8 py-16 overflow-y-auto">
        <div className="w-full max-w-sm">
          <p className="text-xs tracking-widest uppercase text-gray-400 mb-6">
            Account Access
          </p>

          <h2 className="text-4xl font-light text-white mb-1">
            {isSignUp ? "Create account" : "Sign in"}
          </h2>

          <p className="text-xs text-gray-400 tracking-wide mb-10 leading-relaxed">
            {isSignUp
              ? "Enter your details to create your account."
              : "Enter your credentials to access your account."}
          </p>

          {/* Sign-up only: Username */}
          {isSignUp && (
            <div className="mb-6">
              <label className={labelClass}>Username</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className={inputClass}
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-6">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          {/* Sign-up only: Date of Birth */}
          {isSignUp && (
            <div className="mb-6">
              <label className={labelClass}>Date of Birth</label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className={`${inputClass} text-gray-400 [&:not([value=''])]:text-white`}
              />
            </div>
          )}

          {/* Password */}
          <div className="mb-6">
            <label className={labelClass}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
          </div>

          {/* Sign-up only: Confirm Password */}
          {isSignUp && (
            <div className="mb-6">
              <label className={labelClass}>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>
          )}

          {isSignUp && (
            <div className="mb-6">
              <label className={labelClass}>Select Your Level</label>
              <select
                name="level"
                id="level"
                onChange={(e) => setLevel(e.target.value)}
              >
                <option
                  value="Beginner"
                  className="text-gray-500 hover:text-white bg-transparent"
                >
                  Beginner
                </option>
                <option
                  value="Intermediate"
                  className="text-gray-500 hover:text-white bg-transparent"
                >
                  Intermediate
                </option>
                <option
                  value="Advanced"
                  className="text-gray-500 hover:text-white bg-transparent"
                >
                  Advanced
                </option>
              </select>
              <span className="text-sm text-white/20 font-extralight font-[Italic]">
                Please Choose Your Coding Experience Level.
              </span>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-xs text-white border border-gray-200 bg-red-500/30 px-3 py-2 mb-4 tracking-wide">
              {error}
            </div>
          )}

          {/* Success */}
          {successMsg && (
            <div className="text-xs text-black border border-black bg-white px-3 py-2 mb-4 tracking-wide">
              {successMsg}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-black text-white text-xs tracking-widest uppercase py-4 mt-4 hover:bg-neutral-800 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading
              ? isSignUp
                ? "Creating account..."
                : "Signing in..."
              : isSignUp
                ? "Create account →"
                : "Continue →"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-300 tracking-widest uppercase">
              or
            </span>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          {/* Toggle Sign In / Sign Up */}
          <p className="text-center text-xs text-gray-400 tracking-wide">
            {isSignUp ? "Already have an account?" : "No account?"}{" "}
            <button
              onClick={switchMode}
              className="text-white border-b border-white pb-px hover:opacity-60 transition-opacity"
            >
              {isSignUp ? "Sign in" : "Create one"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
