"use client";

import { EnhancedFeedbackWidget } from "../../components/admin/EnhancedFeedbackWidget";

export default function Dashboard() {
  return (
    <div className="p-6 min-h-screen w-screen bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,40,180,0.3),transparent)] bg-fixed">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <EnhancedFeedbackWidget />
          {/* Add more widgets here */}
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h2 className="text-xl font-bold text-white mb-4">Analytics</h2>
            <p className="text-gray-400">Analytics widget coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
