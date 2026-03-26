import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Circle,
  Clock,
  Zap,
  FileText,
  Archive,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react";

export function ExpandedView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showTranscript, setShowTranscript] = useState(false);

  // Mock data - in real app this would be fetched based on id
  const capture = {
    id,
    summary:
      "You need to contact the client about the project deadline tomorrow, remind Sarah about the upcoming meeting, and verify that the reports are ready for review.",
    transcript:
      "I need to call the client about the project deadline tomorrow also remind Sarah about the meeting and check if the reports are ready",
    actions: [
      "Call the client about project deadline",
      "Remind Sarah about the meeting",
      "Check if the reports are ready",
    ],
    pattern: "Recurring issue detected: Multiple deadlines mentioned in last 3 captures",
    timestamp: "2 minutes ago",
  };

  const actionButtons = [
    { label: "NOW", icon: Zap, color: "from-red-500 to-orange-500" },
    { label: "NOT NOW", icon: Clock, color: "from-gray-500 to-gray-600" },
    { label: "MAKE SMALLER", icon: Circle, color: "from-yellow-500 to-amber-500" },
    { label: "DRAFT", icon: FileText, color: "from-cyan-500 to-blue-500" },
    { label: "REFERENCE", icon: Archive, color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-950 via-orange-900 to-gray-900">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pt-12 pb-12 max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/results")}
            className="p-2 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="text-white" size={20} />
          </button>
          <span className="text-white/60 text-sm">{capture.timestamp}</span>
        </div>

        <div className="space-y-6">
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="backdrop-blur-2xl bg-white/5 rounded-3xl p-6 border border-white/10"
          >
            <h3 className="text-white/60 text-xs uppercase tracking-wider mb-3">
              Summary
            </h3>
            <p className="text-white text-base leading-relaxed">
              {capture.summary}
            </p>
          </motion.div>

          {/* Pattern detection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="backdrop-blur-2xl bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-3xl p-4 flex items-start gap-3"
          >
            <AlertCircle className="text-amber-400 flex-shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="text-white text-xs uppercase tracking-wider mb-1">
                Pattern
              </h3>
              <p className="text-white/90 text-sm">{capture.pattern}</p>
            </div>
          </motion.div>

          {/* Extracted actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-2xl bg-white/5 rounded-3xl p-6 border border-white/10"
          >
            <h3 className="text-white/60 text-xs uppercase tracking-wider mb-4">
              Extracted Actions
            </h3>
            <div className="space-y-3">
              {capture.actions.map((action, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Circle
                    className="text-cyan-400 flex-shrink-0 mt-1"
                    size={12}
                  />
                  <span className="text-white text-sm">{action}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Transcript (collapsible) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden"
          >
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="w-full p-6 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
              <h3 className="text-white/60 text-xs uppercase tracking-wider">
                Full Transcript
              </h3>
              {showTranscript ? (
                <ChevronUp className="text-white/60" size={20} />
              ) : (
                <ChevronDown className="text-white/60" size={20} />
              )}
            </button>

            <AnimatePresence>
              {showTranscript && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-6 pb-6"
                >
                  <p className="text-white/80 text-sm leading-relaxed">
                    {capture.transcript}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Bloom action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <h3 className="text-white/60 text-xs uppercase tracking-wider mb-4">
              Bloom Actions
            </h3>
            {actionButtons.map((button, idx) => {
              const Icon = button.icon;
              return (
                <motion.button
                  key={button.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + idx * 0.05 }}
                  className={`w-full backdrop-blur-xl bg-gradient-to-r ${button.color} bg-opacity-20 border border-white/20 rounded-2xl p-4 flex items-center gap-3 hover:scale-[1.02] transition-transform`}
                >
                  <Icon className="text-white" size={20} />
                  <span className="text-white text-sm">{button.label}</span>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
