import { EnhancedFeedbackWidget } from "../../components/admin/EnhancedFeedbackWidget";

export default function Support() {
  return (
    <div className="min-h-screen w-full bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,40,180,0.3),transparent)] bg-fixed">
      <div className="p-8 max-w-8xl">
        <EnhancedFeedbackWidget />
      </div>
    </div>
  );
}
