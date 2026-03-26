import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Circle, Zap, Clock, Brain, ChevronRight } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

interface ActionItem {
  id: string;
  text: string;
  category: "NOW" | "NEXT" | "LATER" | "NOTE";
}

export function ResultsScreen() {
  const navigate = useNavigate();

  const actions: ActionItem[] = [
    { id: "1", text: "Call the client about project deadline", category: "NOW" },
    { id: "2", text: "Check if the reports are ready", category: "NOW" },
    { id: "3", text: "Remind Sarah about the meeting", category: "NEXT" },
    { id: "4", text: "Follow up on email responses", category: "NEXT" },
    { id: "5", text: "Review quarterly goals", category: "LATER" },
    { id: "6", text: "Schedule team retrospective", category: "LATER" },
    { id: "7", text: "Client seemed stressed about timeline", category: "NOTE" },
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "NOW":
        return <Circle className="fill-red-500 text-red-500" size={8} />;
      case "NEXT":
        return <Circle className="fill-yellow-500 text-yellow-500" size={8} />;
      case "LATER":
        return <Circle className="fill-gray-400 text-gray-400" size={8} />;
      case "NOTE":
        return <Brain className="text-purple-400" size={16} />;
      default:
        return null;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "NOW":
        return "from-red-500/20 to-orange-500/20 border-red-500/30";
      case "NEXT":
        return "from-yellow-500/20 to-amber-500/20 border-yellow-500/30";
      case "LATER":
        return "from-gray-400/20 to-gray-500/20 border-gray-400/30";
      case "NOTE":
        return "from-purple-500/20 to-pink-500/20 border-purple-500/30";
      default:
        return "from-white/10 to-white/5 border-white/20";
    }
  };

  const groupedActions = {
    NOW: actions.filter((a) => a.category === "NOW"),
    NEXT: actions.filter((a) => a.category === "NEXT"),
    LATER: actions.filter((a) => a.category === "LATER"),
    NOTE: actions.filter((a) => a.category === "NOTE"),
  };

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
          <div className="flex items-center gap-2 mb-2">
            <Zap className="text-cyan-400" size={20} />
            <h2 className="text-white text-sm">Organized in 2.3s</h2>
          </div>
          <h1 className="text-white text-2xl">Your clarity</h1>
        </motion.div>

        {/* Action categories */}
        <div className="space-y-6">
          {Object.entries(groupedActions).map(([category, items], idx) => (
            items.length > 0 && (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Category header */}
                <div className="flex items-center gap-2 mb-3">
                  {getCategoryIcon(category)}
                  <h3 className="text-white text-xs uppercase tracking-wider opacity-80">
                    {category}
                  </h3>
                </div>

                {/* Action cards */}
                <div className="space-y-2">
                  {items.map((item, itemIdx) => (
                    <motion.button
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + itemIdx * 0.05 }}
                      onClick={() => navigate(`/expanded/${item.id}`)}
                      className={`w-full backdrop-blur-xl bg-gradient-to-r ${getCategoryColor(
                        category
                      )} border rounded-2xl p-4 flex items-center justify-between group hover:scale-[1.02] transition-transform`}
                    >
                      <span className="text-white text-sm text-left">
                        {item.text}
                      </span>
                      <ChevronRight
                        className="text-white/40 group-hover:text-white/80 transition-colors"
                        size={20}
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )
          ))}
        </div>

        {/* New capture button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          onClick={() => navigate("/")}
          className="mt-8 w-full py-4 rounded-full backdrop-blur-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/20 text-white hover:bg-white/20 transition-all"
        >
          New capture
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
