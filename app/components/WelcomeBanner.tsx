import Icon from "./icons";
import { supabase } from "@/lib/supabaseclient";
import Username from "./Username";

export function WelcomeBanner() {
  
  return (
    <div className="bg-linear-to-r from-purple-600 via-pink-600 to-purple-600 rounded-2xl p-8 mb-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="relative z-10">
        <Username />
        <p className="text-purple-100 text-lg">
          You're in Week First week of your journey. Keep up the momentum!
        </p>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 right-20 w-48 h-48 bg-white/5 rounded-full -mb-24"></div>
    </div>
  );
}
