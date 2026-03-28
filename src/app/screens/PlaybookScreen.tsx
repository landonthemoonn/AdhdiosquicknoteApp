import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { Brain, Zap, Target, TrendingUp, ChevronRight, ArrowLeft } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

interface PlaybookItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
}

export function PlaybookScreen() {
  const navigate = useNavigate();
  
  const playbooks: PlaybookItem[] = [
    {
      id: "1",
      title: "Quick Capture Protocol",
      description: "Best practices for capturing thoughts on the go",
      icon: Zap,
      color: "from-yellow-500 to-orange-500",
    },
    {
      id: "2",
      title: "Priority Matrix",
      description: "How Bloom categorizes NOW, NEXT, and LATER",
      icon: Target,
      color: "from-red-500 to-pink-500",
    },
    {
      id: "3",
      title: "Pattern Recognition",
      description: "Understanding recurring themes in your captures",
      icon: Brain,
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "4",
      title: "Weekly Review",
      description: "Make the most of your captured insights",
      icon: TrendingUp,
      color: "from-cyan-500 to-blue-500",
    },
  ];

  const tips = [
    "Speak naturally - Bloom understands context",
    "Tag moments during recording for instant markers",
    "Review patterns weekly to spot trends",
    "Use 'Make Smaller' to break down overwhelming tasks",
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-950 via-orange-900 to-gray-900">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 pt-12 pb-32 max-w-md mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
            >
              <ArrowLeft className="text-white" size={20} />
            </button>
            <h1 className="text-white text-3xl">Playbook</h1>
          </div>
          <p className="text-white/60 text-sm ml-14">
            Learn to master your cognitive flow
          </p>
        </motion.div>

        {/* Playbook items */}
        <div className="space-y-4 mb-8">
          {playbooks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="w-full backdrop-blur-2xl bg-white/5 rounded-3xl p-6 border border-white/10 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg`}
                  >
                    <Icon className="text-white" size={24} />
                  </div>

                  <div className="flex-1 text-left">
                    <h3 className="text-white text-base mb-1">{item.title}</h3>
                    <p className="text-white/60 text-sm">{item.description}</p>
                  </div>

                  <ChevronRight
                    className="text-white/40 group-hover:text-white/80 transition-colors flex-shrink-0"
                    size={20}
                  />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Quick tips */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="backdrop-blur-2xl bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-3xl p-6"
        >
          <h3 className="text-white text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
            <Zap size={16} className="text-cyan-400" />
            Quick Tips
          </h3>

          <div className="space-y-3">
            {tips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 mt-2" />
                <p className="text-white/80 text-sm">{tip}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6 backdrop-blur-2xl bg-white/5 rounded-3xl p-6 border border-white/10"
        >
          <h3 className="text-white/60 text-xs uppercase tracking-wider mb-4">
            Your Progress
          </h3>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-white text-2xl mb-1">0</p>
              <p className="text-white/60 text-xs">Captures</p>
            </div>
            <div>
              <p className="text-white text-2xl mb-1">0%</p>
              <p className="text-white/60 text-xs">Completed</p>
            </div>
            <div>
              <p className="text-white text-2xl mb-1">0</p>
              <p className="text-white/60 text-xs">Patterns</p>
            </div>
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}