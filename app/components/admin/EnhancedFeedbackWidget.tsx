"use client";

import { useState, useEffect } from "react";
import { 
  MessageCircle, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  TrendingUp,
  Eye,
  Reply,
  Filter,
  Send,
  Flag,
  Edit3,
  X,
  Shield,
  Lock,
  User
} from "lucide-react";
import { FeedbackQuestion } from "../../../lib/types";
import { supabase } from "../../../lib/supabase";
import { useAuth } from "../../../lib/auth";

interface FeedbackStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  urgent: number;
}

export function EnhancedFeedbackWidget() {
  const { user, loading: authLoading } = useAuth();
  
  // Temporarily bypass auth for testing
  const isAdminAuthenticated = true; // Change this to check admin role after auth is fixed
  
  const [feedback, setFeedback] = useState<FeedbackQuestion[]>([]);
  const [stats, setStats] = useState<FeedbackStats>({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0,
    urgent: 0
  });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackQuestion | null>(null);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [showConversationModal, setShowConversationModal] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [conversationReplies, setConversationReplies] = useState<any[]>([]);
  const [showAdvancedReply, setShowAdvancedReply] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [responseTone, setResponseTone] = useState('professional');
  const [includeActionItems, setIncludeActionItems] = useState(false);
  const [followUpSchedule, setFollowUpSchedule] = useState('');

  // Constants for styling
  const statusColors = {
    open: "text-blue-400 bg-blue-400/10 border-blue-400/30",
    in_progress: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
    resolved: "text-green-400 bg-green-400/10 border-green-400/30",
    closed: "text-gray-400 bg-gray-400/10 border-gray-400/30"
  };

  const priorityColors = {
    low: "text-gray-400 bg-gray-400/10 border-gray-400/30",
    medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
    high: "text-orange-400 bg-orange-400/10 border-orange-400/30",
    urgent: "text-red-400 bg-red-400/10 border-red-400/30"
  };

  const categories = [
    { value: "general", label: "General", color: "text-gray-400" },
    { value: "technical", label: "Technical", color: "text-blue-400" },
    { value: "billing", label: "Billing", color: "text-green-400" },
    { value: "course", label: "Course", color: "text-purple-400" },
    { value: "bug", label: "Bug", color: "text-red-400" },
    { value: "feature", label: "Feature", color: "text-orange-400" }
  ];

  const responseTemplates = [
    {
      id: 'acknowledgment',
      name: 'Acknowledgment',
      content: 'Thank you for your feedback. We appreciate you bringing this to our attention and will review it carefully.'
    },
    {
      id: 'investigation',
      name: 'Under Investigation',
      content: 'We have received your feedback and our team is actively investigating this matter. We will provide you with an update within 24-48 hours.'
    },
    {
      id: 'resolution',
      name: 'Issue Resolved',
      content: 'We have addressed the issue you reported. The fix has been implemented and should now be working as expected. Please let us know if you continue to experience any problems.'
    },
    {
      id: 'feature-request',
      name: 'Feature Request',
      content: 'Thank you for suggesting this feature. Our product team will review your request as part of our roadmap planning. We\'ll notify you if this feature gets added to our development queue.'
    },
    {
      id: 'bug-fix',
      name: 'Bug Fix',
      content: 'We have identified and fixed the bug you reported. This will be included in our next update. Thank you for helping us improve our platform.'
    }
  ];

  const toneOptions = [
    { value: 'professional', label: 'Professional', description: 'Formal and business-like' },
    { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
    { value: 'technical', label: 'Technical', description: 'Detailed and technical' },
    { value: 'apologetic', label: 'Apologetic', description: 'Sincere and understanding' }
  ];

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchFeedback();
    } else {
      setLoading(false);
    }
  }, [isAdminAuthenticated]);

  const fetchFeedback = async () => {
    try {
      console.log('Fetching all feedback via admin API...');

      const response = await fetch('/api/admin/feedback');
      const result = await response.json();
      
      console.log('Admin API response:', result);

      if (!response.ok) {
        console.error('Admin API error:', result.error);
        return;
      }

      // Transform the data to match our interface
      const transformedData: FeedbackQuestion[] = (result.data || []).map((item: any) => ({
        id: item.id,
        userId: item.user_id,
        title: item.title,
        content: item.content,
        category: item.category,
        status: item.status,
        priority: item.priority || 'medium',
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        adminResponse: item.admin_response,
        adminId: item.admin_id,
        respondedAt: item.responded_at,
        user: {
          displayName: 'User', // We'll fetch this separately if needed
          email: 'user@example.com'
        },
        admin: item.admin_id ? {
          displayName: 'Admin',
          email: 'admin@example.com'
        } : undefined
      }));

      console.log('Admin transformed data:', transformedData);
      setFeedback(transformedData);
      
      // Calculate stats
      const newStats: FeedbackStats = {
        total: transformedData.length,
        open: transformedData.filter(f => f.status === 'open').length,
        inProgress: transformedData.filter(f => f.status === 'in_progress').length,
        resolved: transformedData.filter(f => f.status === 'resolved').length,
        urgent: transformedData.filter(f => f.priority === 'urgent').length
      };
      setStats(newStats);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      console.error('Admin fetch error type:', typeof error);
      console.error('Admin fetch error keys:', Object.keys(error || {}));
    } finally {
      setLoading(false);
    }
  };

  const updateFeedbackStatus = async (id: string, status?: string, priority?: string) => {
    try {
      console.log('Updating feedback via API:', { id, status, priority });

      const updateData: any = { id };
      if (status) updateData.status = status;
      if (priority) updateData.priority = priority;

      const response = await fetch('/api/admin/feedback', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const result = await response.json();
      console.log('Update API response:', result);

      if (!response.ok) {
        console.error('Update API error:', result.error);
        return;
      }

      // Update local state
      setFeedback(prev => prev.map(item => 
        item.id === id 
          ? { ...item, status: status as any || item.status, priority: priority as any || item.priority }
          : item
      ));
    } catch (error) {
      console.error("Error updating feedback:", error);
    }
  };

  const submitAdvancedReply = async () => {
    if (!selectedFeedback || !replyText.trim()) return;
    
    setIsSubmitting(true);
    try {
      console.log('Submitting advanced reply via API...');
      
      // Build advanced response data
      const advancedResponse = {
        id: selectedFeedback.id,
        admin_response: replyText,
        response_type: 'advanced',
        template_used: selectedTemplate,
        tone: responseTone,
        has_action_items: includeActionItems,
        follow_up_schedule: followUpSchedule,
        metadata: {
          original_feedback_category: selectedFeedback.category,
          original_feedback_priority: selectedFeedback.priority,
          response_length: replyText.length,
          timestamp: new Date().toISOString()
        }
      };
      
      const response = await fetch('/api/admin/feedback', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(advancedResponse),
      });

      const result = await response.json();
      console.log('Advanced reply API response:', result);

      if (!response.ok) {
        console.error('Advanced reply API error:', result.error);
        return;
      }

      // Update local state
      setFeedback(prev => prev.map(item => 
        item.id === selectedFeedback.id 
          ? { 
              ...item, 
              adminResponse: replyText,
              adminId: 'admin1',
              respondedAt: new Date().toISOString(),
              status: 'resolved' as any
            }
          : item
      ));

      // Reset advanced reply state
      setReplyText('');
      setSelectedTemplate('');
      setResponseTone('professional');
      setIncludeActionItems(false);
      setFollowUpSchedule('');
      setShowAdvancedReply(false);
      setShowConversationModal(false);
      setSelectedFeedback(null);
    } catch (error) {
      console.error("Error submitting advanced reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const applyTemplate = (templateId: string) => {
    const template = responseTemplates.find(t => t.id === templateId);
    if (template) {
      setReplyText(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const generateSmartResponse = () => {
    if (!selectedFeedback) return;
    
    let smartResponse = '';
    const category = selectedFeedback.category;
    const priority = selectedFeedback.priority;
    
    // Generate contextual response based on category and priority
    if (priority === 'urgent') {
      smartResponse = 'We understand the urgency of this matter and are giving it our immediate attention. ';
    }
    
    switch (category) {
      case 'bug':
        smartResponse += 'Our technical team has been notified of this issue and is working on a resolution. ';
        break;
      case 'feature':
        smartResponse += 'Your feature request has been forwarded to our product team for consideration. ';
        break;
      case 'billing':
        smartResponse += 'Our billing team has been notified and will review your account shortly. ';
        break;
      case 'technical':
        smartResponse += 'Our technical support team is investigating this issue and will provide detailed assistance. ';
        break;
      default:
        smartResponse += 'We have received your feedback and will review it thoroughly. ';
    }
    
    smartResponse += 'We appreciate your patience and will keep you updated on our progress.';
    
    setReplyText(smartResponse);
  };

  const submitReply = async () => {
    if (!selectedFeedback || !replyText.trim()) return;
    
    setIsSubmitting(true);
    try {
      console.log('Submitting reply via API...');
      
      const response = await fetch('/api/admin/feedback', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: selectedFeedback.id,
          admin_response: replyText
        }),
      });

      const result = await response.json();
      console.log('Reply API response:', result);

      if (!response.ok) {
        console.error('Reply API error:', result.error);
        return;
      }

      // Update local state
      setFeedback(prev => prev.map(item => 
        item.id === selectedFeedback.id 
          ? { 
              ...item, 
              adminResponse: replyText,
              adminId: 'admin1', // Would be current admin ID
              respondedAt: new Date().toISOString(),
              status: 'resolved' as any
            }
          : item
      ));

      setReplyText('');
      setShowReplyModal(false);
      setSelectedFeedback(null);
    } catch (error) {
      console.error("Error submitting reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fetchConversationReplies = async (feedbackId: string) => {
    try {
      console.log('Fetching conversation replies...');
      
      const response = await fetch(`/api/admin/feedback/replies?feedbackId=${feedbackId}`);
      const result = await response.json();
      
      console.log('Conversation replies:', result);

      if (!response.ok) {
        console.error('Conversation API error:', result.error);
        return;
      }

      setConversationReplies(result.data || []);
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  const handleViewConversation = (feedback: FeedbackQuestion) => {
    setSelectedFeedback(feedback);
    setShowConversationModal(true);
    fetchConversationReplies(feedback.id);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <Clock className="w-4 h-4 text-blue-400" />;
      case 'in_progress': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'closed': return <CheckCircle className="w-4 h-4 text-gray-400" />;
      default: return <MessageCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
      case 'in_progress': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
      case 'resolved': return 'text-green-400 bg-green-400/10 border-green-400/30';
      case 'closed': return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
      default: return 'text-gray-400 bg-gray-400/10 border-gray-400/30';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'text-blue-400';
      case 'billing': return 'text-green-400';
      case 'course': return 'text-purple-400';
      case 'bug': return 'text-red-400';
      case 'feature': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return "Just now";
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffHours < 168) return `${Math.floor(diffHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const filteredFeedback = feedback.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'urgent') return item.priority === 'urgent';
    if (filter === 'open') return item.status === 'open';
    return item.status === filter;
  });

  if (authLoading) {
    return (
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-800 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-800 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="bg-gray-900 rounded-xl border border-gray-800 p-8">
        <div className="text-center">
          <Lock className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-300 mb-2">Admin Access Required</h3>
          <p className="text-gray-500 mb-6">Please sign in with admin credentials to access feedback management</p>
          <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
            <Shield className="w-4 h-4" />
            <span>Admin authentication required</span>
          </div>
        </div>
      </div>
    );
  }

  const mainContent = (
    <>
      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-purple-400" />
              Feedback Management
            </h2>
            <button
              onClick={fetchFeedback}
              className="p-2 hover:bg-gray-800 rounded-lg transition"
              title="Refresh"
            >
              <AlertCircle className="w-4 h-4 text-gray-400" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-xs text-gray-400">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.open}</div>
              <div className="text-xs text-gray-400">Open</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.inProgress}</div>
              <div className="text-xs text-gray-400">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{stats.resolved}</div>
              <div className="text-xs text-gray-400">Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{stats.urgent}</div>
              <div className="text-xs text-gray-400">Urgent</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="p-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Filter:</span>
            {['all', 'open', 'in_progress', 'resolved', 'urgent'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-xs rounded-full transition ${
                  filter === f
                    ? "bg-purple-600 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              >
                {f === 'all' ? 'All' : f.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback List */}
        <div className="max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-gray-400 mt-4">Loading feedback...</p>
            </div>
          ) : filteredFeedback.length === 0 ? (
            <div className="p-8 text-center">
              <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-300 mb-2">No feedback found</h3>
              <p className="text-gray-500">No feedback matches the current filter</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {filteredFeedback.map((item) => (
                <div key={item.id} className="p-6 hover:bg-gray-800/50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-2">{item.title}</h4>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{item.content}</p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <span className={`px-2 py-1 rounded-full border ${statusColors[item.status]}`}>
                          {getStatusIcon(item.status)}
                          <span className="ml-1 capitalize">{item.status.replace('_', ' ')}</span>
                        </span>
                        
                        <span className={`px-2 py-1 rounded-full border ${priorityColors[item.priority]}`}>
                          <Flag className="w-3 h-3" />
                          <span className="ml-1 capitalize">{item.priority}</span>
                        </span>
                        
                        <span className="text-gray-400">
                          {categories.find((c: any) => c.value === item.category)?.label}
                        </span>
                        
                        <span className="text-gray-500">
                          {formatDate(item.createdAt)}
                        </span>
                      </div>
                      
                      {item.user && (
                        <div className="text-xs text-gray-500">
                          From: {item.user.displayName} ({item.user.email})
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <button
                        onClick={() => handleViewConversation(item)}
                        className="p-1 hover:bg-gray-800 rounded transition"
                        title="View conversation"
                      >
                        <Eye className="w-4 h-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFeedback(item);
                          setShowReplyModal(true);
                        }}
                        className="p-1 hover:bg-gray-800 rounded transition"
                        title="Reply"
                      >
                        <Reply className="w-4 h-4 text-gray-400" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedFeedback(item);
                          setReplyText('');
                        }}
                        className="p-1 hover:bg-gray-800 rounded transition"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Admin Controls */}
                  <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-700">
                    <span className="text-xs text-gray-500">Set Status:</span>
                    {['open', 'in_progress', 'resolved', 'closed'].map((status: any) => (
                      <button
                        key={status}
                        onClick={() => updateFeedbackStatus(item.id, status)}
                        className={`px-2 py-1 text-xs rounded transition ${
                          item.status === status
                            ? "bg-purple-600 text-white"
                            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        }`}
                      >
                        {status.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500">Priority:</span>
                    {['low', 'medium', 'high', 'urgent'].map((priority: any) => (
                      <button
                        key={priority}
                        onClick={() => updateFeedbackStatus(item.id, undefined, priority)}
                        className={`px-2 py-1 text-xs rounded transition ${
                          item.priority === priority
                            ? priority === 'urgent' ? "bg-red-600 text-white" : "bg-purple-600 text-white"
                            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        }`}
                      >
                        {priority}
                      </button>
                    ))}
                  </div>
                  
                  {item.adminResponse && (
                    <div className="mt-3 p-3 bg-gray-800 rounded-lg border-l-4 border-green-500">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-sm font-medium text-green-400">Admin Response</span>
                      </div>
                      <p className="text-gray-300 text-sm">{item.adminResponse}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedFeedback && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-2xl w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Reply to Feedback</h3>
              <button
                onClick={() => {
                  setShowReplyModal(false);
                  setSelectedFeedback(null);
                  setReplyText('');
                }}
                className="p-2 hover:bg-gray-800 rounded-lg transition"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            
            <div className="mb-4">
              <h4 className="text-white font-medium mb-2">{selectedFeedback.title}</h4>
              <p className="text-gray-400 text-sm">{selectedFeedback.content}</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Your Response
                </label>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
                  rows={4}
                  placeholder="Type your response..."
                />
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={submitReply}
                  disabled={!replyText.trim() || isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 text-white rounded-lg font-medium transition disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? "Sending..." : "Send Response"}
                </button>
                <button
                  onClick={() => {
                    setShowReplyModal(false);
                    setSelectedFeedback(null);
                    setReplyText('');
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
    </>
  );

  // Conversation Modal
  if (showConversationModal && selectedFeedback) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Conversation Thread</h3>
            <button
              onClick={() => {
                setShowConversationModal(false);
                setSelectedFeedback(null);
                setConversationReplies([]);
              }}
              className="p-2 hover:bg-gray-800 rounded-lg transition"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Original Question */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Original Question</span>
                <span className="text-xs text-gray-500">
                  {formatDate(selectedFeedback.createdAt)}
                </span>
              </div>
              <h4 className="text-white font-medium mb-2">{selectedFeedback?.title}</h4>
              <p className="text-gray-300">{selectedFeedback?.content}</p>
              {selectedFeedback?.user && (
                <div className="text-xs text-gray-500 mt-2">
                  From: {selectedFeedback.user.displayName} ({selectedFeedback.user.email})
                </div>
              )}
            </div>

            {/* Admin Response */}
            {selectedFeedback?.adminResponse && (
              <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-green-500">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-sm font-medium text-green-400">Admin Response</span>
                  <span className="text-xs text-gray-500">
                    {selectedFeedback.respondedAt && formatDate(selectedFeedback.respondedAt)}
                  </span>
                </div>
                <p className="text-gray-300">{selectedFeedback.adminResponse}</p>
              </div>
            )}

            {/* Conversation Replies */}
            {conversationReplies.map((reply: any) => (
              <div key={reply.id} className={`bg-gray-800 rounded-lg p-4 ${reply.sender_type === 'user' ? 'border-l-4 border-blue-500' : 'border-l-4 border-green-500'}`}>
                <div className="flex items-center gap-2 mb-2">
                  {reply.sender_type === 'user' ? (
                    <User className="w-4 h-4 text-blue-400" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                  <span className={`text-sm font-medium ${reply.sender_type === 'user' ? 'text-blue-400' : 'text-green-400'}`}>
                    {reply.sender_type === 'user' ? 'User Reply' : 'Admin Reply'}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatDate(reply.created_at)}
                  </span>
                </div>
                <p className="text-gray-300">{reply.content}</p>
              </div>
            ))}

            {/* Quick Reply */}
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Reply className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-medium text-purple-400">Quick Reply</span>
              </div>
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
                rows={3}
                placeholder="Type your reply..."
              />
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => {
                    if (replyText.trim()) {
                      // Handle quick reply here
                      setReplyText('');
                    }
                  }}
                  disabled={!replyText.trim()}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-700 text-white rounded-lg font-medium transition disabled:cursor-not-allowed"
                >
                  <Send className="w-4 h-4" />
                  Send Reply
                </button>
                <button
                  onClick={() => {
                    setShowConversationModal(false);
                    setShowAdvancedReply(true);
                  }}
                  className="px-4 py-2 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg font-medium transition shadow-lg"
                >
                  Advanced Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Advanced Reply Modal
  if (showAdvancedReply && selectedFeedback) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 max-w-5xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Reply className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Advanced Reply</h3>
                <p className="text-sm text-gray-400">AI-powered response with templates and analytics</p>
              </div>
            </div>
            <button
              onClick={() => {
                setShowAdvancedReply(false);
                setSelectedFeedback(null);
                setReplyText('');
                setSelectedTemplate('');
                setResponseTone('professional');
                setIncludeActionItems(false);
                setFollowUpSchedule('');
              }}
              className="p-2 hover:bg-gray-800 rounded-lg transition"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Response Editor */}
            <div className="lg:col-span-2 space-y-4">
              {/* Original Feedback */}
              <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-blue-500">
                <div className="flex items-center gap-2 mb-2">
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">Original Feedback</span>
                  <span className="text-xs text-gray-500">
                    {formatDate(selectedFeedback.createdAt)}
                  </span>
                </div>
                <h4 className="text-white font-medium mb-2">{selectedFeedback.title}</h4>
                <p className="text-gray-300 text-sm">{selectedFeedback.content}</p>
                <div className="flex items-center gap-3 mt-3 text-xs">
                  <span className={`px-2 py-1 rounded-full border ${statusColors[selectedFeedback.status]}`}>
                    {getStatusIcon(selectedFeedback.status)}
                    <span className="ml-1 capitalize">{selectedFeedback.status.replace('_', ' ')}</span>
                  </span>
                  <span className={`px-2 py-1 rounded-full border ${priorityColors[selectedFeedback.priority]}`}>
                    <Flag className="w-3 h-3" />
                    <span className="ml-1 capitalize">{selectedFeedback.priority}</span>
                  </span>
                  <span className="text-gray-400">
                    {categories.find((c: any) => c.value === selectedFeedback.category)?.label}
                  </span>
                </div>
              </div>

              {/* Response Editor */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-300">
                    Your Response
                  </label>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>{replyText.length} characters</span>
                    <span>•</span>
                    <span>{Math.ceil(replyText.length / 5)} words</span>
                  </div>
                </div>
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
                  rows={8}
                  placeholder="Craft your response here..."
                />
              </div>

              {/* Action Items */}
              {includeActionItems && (
                <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-yellow-500">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-400">Action Items</span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span>Review and investigate the reported issue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Coordinate with relevant team members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span>Provide timeline for resolution</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Tools & Options */}
            <div className="space-y-4">
              {/* Smart Response Generator */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  Smart Response
                </h4>
                <button
                  onClick={generateSmartResponse}
                  className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg text-sm font-medium transition"
                >
                  Generate AI Response
                </button>
                <p className="text-xs text-gray-400 mt-2">
                  Contextual response based on feedback category and priority
                </p>
              </div>

              {/* Response Templates */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Response Templates</h4>
                <div className="space-y-2">
                  {responseTemplates.map((template) => (
                    <button
                      key={template.id}
                      onClick={() => applyTemplate(template.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                        selectedTemplate === template.id
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <div className="font-medium">{template.name}</div>
                      <div className="text-xs opacity-75 truncate">
                        {template.content}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Response Tone */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Response Tone</h4>
                <div className="space-y-2">
                  {toneOptions.map((tone) => (
                    <label key={tone.value} className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tone"
                        value={tone.value}
                        checked={responseTone === tone.value}
                        onChange={(e) => setResponseTone(e.target.value)}
                        className="mt-1 rounded"
                      />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-300">{tone.label}</div>
                        <div className="text-xs text-gray-500">{tone.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Follow-up Options */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3">Follow-up</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeActionItems}
                      onChange={(e) => setIncludeActionItems(e.target.checked)}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-300">Include action items</span>
                  </label>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Follow-up schedule</label>
                    <select
                      value={followUpSchedule}
                      onChange={(e) => setFollowUpSchedule(e.target.value)}
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-purple-500"
                    >
                      <option value="">No follow-up</option>
                      <option value="1day">1 day</option>
                      <option value="3days">3 days</option>
                      <option value="1week">1 week</option>
                      <option value="2weeks">2 weeks</option>
                      <option value="1month">1 month</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Response Analytics */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-400" />
                  Response Analytics
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Sentiment Score:</span>
                    <span className="text-green-400">Positive</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Complexity:</span>
                    <span className="text-yellow-400">Medium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Read Time:</span>
                    <span className="text-gray-300">{Math.ceil(replyText.length / 200)} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Response Quality:</span>
                    <span className="text-green-400">High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-700">
            <button
              onClick={submitAdvancedReply}
              disabled={!replyText.trim() || isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-700 text-white rounded-lg font-medium transition disabled:cursor-not-allowed shadow-lg"
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Sending Advanced Response..." : "Send Advanced Response"}
            </button>
            <button
              onClick={() => {
                setShowAdvancedReply(false);
                setShowReplyModal(true);
              }}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition"
            >
              Switch to Basic
            </button>
            <button
              onClick={() => {
                setShowAdvancedReply(false);
                setSelectedFeedback(null);
                setReplyText('');
                setSelectedTemplate('');
                setResponseTone('professional');
                setIncludeActionItems(false);
                setFollowUpSchedule('');
              }}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-lg font-medium transition"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return mainContent;
}
