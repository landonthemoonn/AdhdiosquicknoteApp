import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Circle, CheckCircle2, ChevronRight, ArrowLeft } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

interface Task {
  id: string;
  text: string;
  category: "NOW" | "NEXT" | "LATER";
  completed: boolean;
  timestamp: string;
}

export function TasksScreen() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      text: "Call the client about project deadline",
      category: "NOW",
      completed: false,
      timestamp: "2 min ago",
    },
    {
      id: "2",
      text: "Check if the reports are ready",
      category: "NOW",
      completed: false,
      timestamp: "2 min ago",
    },
    {
      id: "3",
      text: "Remind Sarah about the meeting",
      category: "NEXT",
      completed: false,
      timestamp: "2 min ago",
    },
    {
      id: "4",
      text: "Follow up on email responses",
      category: "NEXT",
      completed: true,
      timestamp: "1 hour ago",
    },
    {
      id: "5",
      text: "Review quarterly goals",
      category: "LATER",
      completed: false,
      timestamp: "3 hours ago",
    },
    {
      id: "6",
      text: "Schedule team retrospective",
      category: "LATER",
      completed: false,
      timestamp: "3 hours ago",
    },
  ]);

  const [filter, setFilter] = useState<"ALL" | "NOW" | "NEXT" | "LATER">("ALL");

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "NOW":
        return "text-red-400";
      case "NEXT":
        return "text-yellow-400";
      case "LATER":
        return "text-gray-400";
      default:
        return "text-white";
    }
  };

  const filteredTasks =
    filter === "ALL" ? tasks : tasks.filter((t) => t.category === filter);

  const filters = ["ALL", "NOW", "NEXT", "LATER"];

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
            <h1 className="text-white text-3xl">Tasks</h1>
          </div>
          <p className="text-white/60 text-sm ml-14">
            {tasks.filter((t) => !t.completed).length} active tasks
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-6 overflow-x-auto pb-2"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as typeof filter)}
              className={`px-4 py-2 rounded-full text-xs whitespace-nowrap transition-all ${
                filter === f
                  ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white border border-white/20"
                  : "backdrop-blur-xl bg-white/10 text-white/60 border border-white/20 hover:bg-white/20"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* Task list */}
        <div className="space-y-3">
          {filteredTasks.map((task, idx) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`backdrop-blur-2xl bg-white/5 rounded-2xl p-4 border border-white/10 ${
                task.completed ? "opacity-50" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => toggleTask(task.id)}
                  className="flex-shrink-0 mt-0.5"
                >
                  {task.completed ? (
                    <CheckCircle2
                      className="text-green-400 fill-green-400"
                      size={20}
                    />
                  ) : (
                    <Circle className="text-white/40" size={20} />
                  )}
                </button>

                <div className="flex-1">
                  <p
                    className={`text-white text-sm mb-1 ${
                      task.completed ? "line-through" : ""
                    }`}
                  >
                    {task.text}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${getCategoryColor(task.category)}`}>
                      {task.category}
                    </span>
                    <span className="text-white/40 text-xs">•</span>
                    <span className="text-white/40 text-xs">
                      {task.timestamp}
                    </span>
                  </div>
                </div>

                <ChevronRight className="text-white/40 flex-shrink-0" size={20} />
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTasks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-white/40">No tasks in this category</p>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}