"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Send,
  MessageCircle,
  AlertCircle,
  CheckCircle,
  Clock,
  Tag,
  ArrowLeft,
  Plus,
  LogIn,
  User,
  Reply,
  X,
} from "lucide-react";
import { FeedbackQuestion, FeedbackFormData, FeedbackReply } from "@/lib/types";
import { supabase } from "@/lib/supabaseclient";
import { useAuth } from "@/lib/auth";

export default function FeedbackPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // Temporarily bypass auth for testing
  const isUserAuthenticated = true; // Change this to `!!user` after auth is fixed

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [userQuestions, setUserQuestions] = useState<FeedbackQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedQuestion, setSelectedQuestion] =
    useState<FeedbackQuestion | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replySubmitting, setReplySubmitting] = useState(false);

  const [formData, setFormData] = useState<FeedbackFormData>({
    title: "",
    content: "",
    category: "general",
  });

  const categories = [
    { value: "general", label: "General", color: "text-gray-400" },
    { value: "technical", label: "Technical", color: "text-blue-400" },
    { value: "billing", label: "Billing", color: "text-green-400" },
    { value: "course", label: "Course", color: "text-purple-400" },
    { value: "bug", label: "Bug Report", color: "text-red-400" },
    { value: "feature", label: "Feature Request", color: "text-yellow-400" },
  ];

  const statusIcons = {
    open: <Clock className="w-4 h-4 text-blue-400" />,
    in_progress: <AlertCircle className="w-4 h-4 text-yellow-400" />,
    resolved: <CheckCircle className="w-4 h-4 text-green-400" />,
    closed: <CheckCircle className="w-4 h-4 text-gray-400" />,
  };

  const statusColors = {
    open: "text-blue-400 bg-blue-400/10 border-blue-400/30",
    in_progress: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
    resolved: "text-green-400 bg-green-400/10 border-green-400/30",
    closed: "text-gray-400 bg-gray-400/10 border-gray-400/30",
  };

  useEffect(() => {
    if (isUserAuthenticated) {
      fetchUserQuestions();
    } else {
      setLoading(false);
    }
  }, [isUserAuthenticated]);

  const fetchUserQuestions = async () => {
    try {
      console.log("Fetching questions via API...");

      const response = await fetch("/api/feedback");
      const result = await response.json();

      console.log("API response:", result);

      if (!response.ok) {
        console.error("API error:", result.error);
        return;
      }

      // Transform the data to match our interface
      const transformedData: FeedbackQuestion[] = (result.data || []).map(
        (item: any) => ({
          id: item.id,
          userId: item.user_id,
          title: item.title,
          content: item.content,
          category: item.category,
          status: item.status,
          priority: item.priority || "medium",
          createdAt: item.created_at,
          updatedAt: item.updated_at,
          adminResponse: item.admin_response,
          adminId: item.admin_id,
          respondedAt: item.responded_at,
          user: {
            displayName:
              user?.user_metadata?.display_name ||
              user?.email?.split("@")[0] ||
              "Test User",
            email: user?.email || "test@example.com",
          },
        }),
      );

      console.log("Transformed data:", transformedData);
      setUserQuestions(transformedData);
    } catch (error) {
      console.error("Error fetching questions:", error);
      console.error("Error type:", typeof error);
      console.error("Error keys:", Object.keys(error || {}));
      console.error("Error stringified:", JSON.stringify(error, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      console.log("Submitting feedback via API...");

      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          category: formData.category,
        }),
      });

      const result = await response.json();
      console.log("Submit API response:", result);

      if (!response.ok) {
        console.error("Submit API error:", result.error);
        return;
      }

      setSubmitSuccess(true);
      setFormData({
        title: "",
        content: "",
        category: "general",
      });
      setShowForm(false);

      // Refresh the questions list
      fetchUserQuestions();

      // Reset success message after 3 seconds
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = async () => {
    if (!selectedQuestion || !replyText.trim()) return;

    setReplySubmitting(true);
    try {
      console.log("Submitting user reply via API...");

      const response = await fetch("/api/feedback/replies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feedbackId: selectedQuestion.id,
          content: replyText,
        }),
      });

      const result = await response.json();
      console.log("Reply API response:", result);

      if (!response.ok) {
        console.error("Reply API error:", result.error);
        return;
      }

      setReplyText("");
      setShowReplyModal(false);
      setSelectedQuestion(null);

      // Refresh the questions list
      fetchUserQuestions();
    } catch (error) {
      console.error("Error submitting reply:", error);
    } finally {
      setReplySubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <div className="flex w-full bg-black min-h-screen">
      <div className="p-6 w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
            >
              <ArrowLeft className="w-5 h-5 text-gray-300" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <MessageCircle className="w-8 h-8 text-purple-400" />
                Feedback & Support
              </h1>
              <p className="text-gray-400 mt-1">
                Ask questions and get help from our team
              </p>
            </div>
          </div>
        </div>

        {/* Authentication Check */}
        {authLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading...</p>
          </div>
        ) : !isUserAuthenticated ? (
          <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800">
            <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-300 mb-2">
              Sign In Required
            </h3>
            <p className="text-gray-500 mb-6">
              Please sign in to submit feedback and view your questions
            </p>
            <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition mx-auto">
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          </div>
        ) : (
          <div>
            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-900/50 border border-green-500/50 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-green-400">
                  Your question has been submitted successfully!
                </span>
              </div>
            )}

            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition"
              >
                {showForm ? (
                  <ArrowLeft className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
                {showForm ? "Back to Questions" : "Ask a Question"}
              </button>
            </div>

            {showForm ? (
              /* Feedback Form */
              <div className="max-w-4xl mx-auto">
                <div className="bg-gray-900 rounded-xl border border-gray-800 p-8">
                  <h2 className="text-2xl font-bold text-white mb-6">
                    Submit Your Question
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                        placeholder="Brief summary of your question"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Category *
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {categories.map((category) => (
                          <button
                            key={category.value}
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                category: category.value as any,
                              })
                            }
                            className={`p-3 rounded-lg border transition ${
                              formData.category === category.value
                                ? "border-purple-500 bg-purple-500/10 text-purple-400"
                                : "border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600"
                            }`}
                          >
                            <Tag className="w-4 h-4 mb-1 mx-auto" />
                            <div className="text-sm">{category.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Question Details *
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={formData.content}
                        onChange={(e) =>
                          setFormData({ ...formData, content: e.target.value })
                        }
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
                        placeholder="Provide detailed information about your question..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 text-white rounded-lg font-medium transition disabled:cursor-not-allowed"
                    >
                      <Send className="w-4 h-4" />
                      {isSubmitting ? "Submitting..." : "Submit Question"}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              /* Questions List */
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white mb-2">
                    Your Questions
                  </h2>
                  <p className="text-gray-400">
                    Track the status of your submitted questions
                  </p>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-gray-400 mt-4">
                      Loading your questions...
                    </p>
                  </div>
                ) : userQuestions.length === 0 ? (
                  <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-800">
                    <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-300 mb-2">
                      No questions yet
                    </h3>
                    <p className="text-gray-500 mb-6">
                      Start by asking your first question
                    </p>
                    <button
                      onClick={() => setShowForm(true)}
                      className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition"
                    >
                      Ask a Question
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userQuestions.map((question) => (
                      <div
                        key={question.id}
                        className="bg-gray-900 rounded-xl border border-gray-800 p-6"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white mb-2">
                              {question.title}
                            </h3>
                            <p className="text-gray-400 mb-4">
                              {question.content}
                            </p>

                            <div className="flex items-center gap-4 text-sm">
                              <span
                                className={`px-2 py-1 rounded-full border ${statusColors[question.status]}`}
                              >
                                {statusIcons[question.status]}
                                <span className="ml-1 capitalize">
                                  {question.status.replace("_", " ")}
                                </span>
                              </span>

                              <span className="text-gray-400">
                                {
                                  categories.find(
                                    (c) => c.value === question.category,
                                  )?.label
                                }
                              </span>

                              <span className="text-gray-500">
                                {formatDate(question.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>

                        {question.adminResponse && (
                          <div className="mt-4 p-4 bg-gray-800 rounded-lg border-l-4 border-green-500">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-sm font-medium text-green-400">
                                Admin Response
                              </span>
                              <span className="text-xs text-gray-500">
                                {question.respondedAt &&
                                  formatDate(question.respondedAt)}
                              </span>
                            </div>
                            <p className="text-gray-300 mb-3">
                              {question.adminResponse}
                            </p>
                            <button
                              onClick={() => {
                                setSelectedQuestion(question);
                                setShowReplyModal(true);
                              }}
                              className="flex items-center gap-2 px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded transition"
                            >
                              <Reply className="w-3 h-3" />
                              Reply
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Reply Modal */}
        {showReplyModal && selectedQuestion && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Reply to Admin
                </h3>
                <button
                  onClick={() => {
                    setShowReplyModal(false);
                    setSelectedQuestion(null);
                    setReplyText("");
                  }}
                  className="p-2 hover:bg-gray-800 rounded-lg transition"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>

              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">
                  {selectedQuestion.title}
                </h4>
                <p className="text-gray-400 text-sm">
                  {selectedQuestion.content}
                </p>
              </div>

              {selectedQuestion.adminResponse && (
                <div className="mb-4 p-3 bg-gray-800 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-medium text-green-400">
                      Admin Response
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {selectedQuestion.adminResponse}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Your Reply
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
                    rows={4}
                    placeholder="Type your reply to the admin..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleReply}
                    disabled={!replyText.trim() || replySubmitting}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 text-white rounded-lg font-medium transition disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    {replySubmitting ? "Sending..." : "Send Reply"}
                  </button>
                  <button
                    onClick={() => {
                      setShowReplyModal(false);
                      setSelectedQuestion(null);
                      setReplyText("");
                    }}
                    className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
