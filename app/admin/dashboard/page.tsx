import { EnhancedFeedbackWidget } from "../../components/admin/EnhancedFeedbackWidget";

export default function Dashboard() {
  return (
    <div className="p-4 sm:p-6 min-h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,40,180,0.3),transparent)] bg-fixed">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
          <EnhancedFeedbackWidget />
          {/* Add more widgets here */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4">Analytics</h2>
            <p className="text-gray-400 text-sm sm:text-base">Analytics widget coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
