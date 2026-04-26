"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseclient";
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
  const [username, setUsername] = useState("");
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
      if (!username.trim()) {
        setError("Username is required.");
        return;
      }
      if (username.length < 3) {
        setError("Username must be at least 3 characters long.");
        return;
      }
      if (usernameAvailable === false) {
        setError("Username is already taken. Please choose a different one.");
        return;
      }
      if (usernameAvailable === null) {
        setError("Please wait for username validation to complete.");
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

        // Double-check username availability before insertion
        try {
          const checkRes = await fetch(`/api/check-username?username=${encodeURIComponent(username.trim())}`);
          const checkData = await checkRes.json();
          
          if (!checkData.available) {
            setError("Username was taken by another user. Please choose a different one.");
            return;
          }
        } catch (error) {
          console.error("Failed to re-check username:", error);
        }

        const { error: insertError } = await supabase.from("users").insert({
          id: data.user.id,
          name: name,
          username: username.trim(), // Ensure trimmed username
          email: email,
          age: age,
          level: level,
          created_at: new Date().toISOString(),
        });

        if (insertError) {
          console.error("Profile insert error:", insertError);
          if (insertError.message.includes("duplicate key") || insertError.message.includes("unique constraint")) {
            setError("Username became unavailable. Please try a different username.");
          } else {
            setError(
              "Account created but profile save failed: " + insertError.message,
            );
          }
        } else {
          setSuccessMsg("Account created! Please sign in.");
          setPassword("");
          setConfirmPassword("");
          setName("");
          setUsername("");
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

  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [usernameError, setUsernameError] = useState("");

  useEffect(() => {
    const checkUsername = async () => {
      if (!username.trim()) {
        setUsernameAvailable(null);
        setUsernameError("");
        return;
      }

      if (username.length < 3) {
        setUsernameAvailable(false);
        setUsernameError("Username must be at least 3 characters long");
        return;
      }

      try {
        const res = await fetch(`/api/check-username?username=${encodeURIComponent(username.trim())}`);
        const data = await res.json();
        
        if (!res.ok) {
          setUsernameAvailable(false);
          setUsernameError(data.error || "Failed to check username");
          return;
        }

        setUsernameAvailable(data.available);
        setUsernameError(data.available ? "" : data.message || "Username is already taken");
      } catch (error) {
        setUsernameAvailable(false);
        setUsernameError("Network error checking username");
      }
    };

    const timeoutId = setTimeout(checkUsername, 300); // Debounce
    return () => clearTimeout(timeoutId);
  }, [username]);

  const switchMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
    setSuccessMsg("");
    setPassword("");
    setConfirmPassword("");
    setName("");
    setUsername("");
    setDob("");
    setUsernameAvailable(null);
    setUsernameError("");
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Your Username"
                className={`${inputClass} ${
                  usernameAvailable === false ? 'border-red-500' : 
                  usernameAvailable === true ? 'border-green-500' : 
                  ''
                }`}
              />
              {usernameError && (
                <p className="text-xs mt-1 text-red-400">{usernameError}</p>
              )}
              {usernameAvailable === true && (
                <p className="text-xs mt-1 text-green-400">Username is available!</p>
              )}
            </div>
          )}

          {isSignUp && (
            <div className="mb-6">
              <label className={labelClass}>Display name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Display Name"
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
                className="flex justify-center items-center font-bold p-1 bg-white/20 border border-white rounded"
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
              <span className="text-sm text-white/50 font-extralight font-[Italic]">
                Please Choose Your Coding Experience Level.
                <div className="flex-1 h-px bg-gray-100 w-2/3"></div>
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
