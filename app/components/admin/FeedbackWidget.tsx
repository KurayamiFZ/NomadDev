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
  Filter
} from "lucide-react";
import { FeedbackQuestion } from "../../../lib/types";

interface FeedbackStats {
  total: number;
  open: number;
  inProgress: number;
  resolved: number;
  urgent: number;
}

export function FeedbackWidget() {
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

  useEffect(() => {
    fetchFeedback();
  }, []);

  const fetchFeedback = async () => {
    try {
      // This would be your actual Supabase call
      // const { data, error } = await supabase
      //   .from('feedback_questions')
      //   .select('*, user:auth.users(display_name, email), admin:auth.users!admin_id(display_name, email)')
      //   .order('created_at', { ascending: false })
      //   .limit(10);

      // For now, using mock data
      const mockData: FeedbackQuestion[] = [
        {
          id: "1",
          userId: "user1",
          title: "Question about Unity physics",
          content: "I'm having trouble understanding how to implement realistic physics in my game...",
          category: "technical",
          status: "open",
          priority: "high",
          createdAt: "2024-01-15T10:30:00Z",
          updatedAt: "2024-01-15T10:30:00Z",
          user: {
            displayName: "John Doe",
            email: "john@example.com"
          }
        },
        {
          id: "2",
          userId: "user2",
          title: "Billing issue",
          content: "I was charged twice for my subscription this month...",
          category: "billing",
          status: "in_progress",
          priority: "urgent",
          createdAt: "2024-01-15T09:15:00Z",
          updatedAt: "2024-01-15T11:20:00Z",
          adminId: "admin1",
          user: {
            displayName: "Jane Smith",
            email: "jane@example.com"
          }
        },
        {
          id: "3",
          userId: "user3",
          title: "Feature request for dark mode",
          content: "It would be great if we had a dark mode option for the learning platform...",
          category: "feature",
          status: "resolved",
          priority: "low",
          createdAt: "2024-01-14T16:45:00Z",
          updatedAt: "2024-01-15T08:30:00Z",
          adminResponse: "Thanks for the suggestion! We've added this to our roadmap for Q2.",
          adminId: "admin1",
          respondedAt: "2024-01-15T08:30:00Z",
          user: {
            displayName: "Bob Wilson",
            email: "bob@example.com"
          }
        }
      ];

      setFeedback(mockData);
      
      // Calculate stats
      const newStats: FeedbackStats = {
        total: mockData.length,
        open: mockData.filter(f => f.status === 'open').length,
        inProgress: mockData.filter(f => f.status === 'in_progress').length,
        resolved: mockData.filter(f => f.status === 'resolved').length,
        urgent: mockData.filter(f => f.priority === 'urgent').length
      };
      setStats(newStats);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setLoading(false);
    }
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

  if (loading) {
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

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-purple-400" />
            Recent Feedback
          </h2>
          <button className="text-purple-400 hover:text-purple-300 text-sm font-medium">
            View All
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-5 gap-3">
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

      {/* Filter */}
      <div className="px-6 py-3 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-purple-500"
          >
            <option value="all">All Feedback</option>
            <option value="urgent">Urgent</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Feedback List */}
      <div className="max-h-96 overflow-y-auto">
        {filteredFeedback.length === 0 ? (
          <div className="p-8 text-center">
            <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No feedback found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-800">
            {filteredFeedback.map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-800/50 transition">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-white truncate mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-2">
                      {item.content}
                    </p>
                    
                    <div className="flex items-center gap-3 text-xs">
                      <span className={`px-2 py-1 rounded-full border ${getStatusColor(item.status)}`}>
                        {getStatusIcon(item.status)}
                        <span className="ml-1 capitalize">{item.status.replace('_', ' ')}</span>
                      </span>
                      
                      <span className={getCategoryColor(item.category)}>
                        {item.category}
                      </span>
                      
                      <span className={getPriorityColor(item.priority)}>
                        {item.priority}
                      </span>
                      
                      <span className="text-gray-500">
                        {formatDate(item.createdAt)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-1 ml-3">
                    <button className="p-1 hover:bg-gray-700 rounded transition">
                      <Eye className="w-4 h-4 text-gray-400" />
                    </button>
                    {item.status === 'open' && (
                      <button className="p-1 hover:bg-gray-700 rounded transition">
                        <Reply className="w-4 h-4 text-purple-400" />
                      </button>
                    )}
                  </div>
                </div>
                
                {item.user && (
                  <div className="text-xs text-gray-500">
                    From: {item.user.displayName} ({item.user.email})
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
