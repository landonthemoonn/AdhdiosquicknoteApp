import { useNavigate, useLocation } from "react-router";
import { Mic, ListChecks, BookOpen } from "lucide-react";

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 pb-6 px-6 pointer-events-none">
      <div className="max-w-md mx-auto pointer-events-auto">
        <nav className="flex items-center justify-around px-8 py-4 rounded-full backdrop-blur-2xl bg-white/10 border border-white/20 shadow-lg shadow-black/10">
          <button
            onClick={() => navigate("/tasks")}
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive("/tasks") ? "text-white" : "text-white/60"
            }`}
          >
            <ListChecks size={24} />
            <span className="text-xs">Tasks</span>
          </button>

          <button
            onClick={() => navigate("/")}
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive("/") || isActive("/recording") || isActive("/results")
                ? "text-white"
                : "text-white/60"
            }`}
          >
            <div
              className={`p-3 rounded-full ${
                isActive("/") || isActive("/recording") || isActive("/results")
                  ? "bg-gradient-to-br from-cyan-400 via-pink-400 to-purple-400 shadow-lg shadow-pink-500/50"
                  : "bg-white/10"
              }`}
            >
              <Mic size={24} />
            </div>
            <span className="text-xs">Capture</span>
          </button>

          <button
            onClick={() => navigate("/playbook")}
            className={`flex flex-col items-center gap-1 transition-all ${
              isActive("/playbook") ? "text-white" : "text-white/60"
            }`}
          >
            <BookOpen size={24} />
            <span className="text-xs">Playbook</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
