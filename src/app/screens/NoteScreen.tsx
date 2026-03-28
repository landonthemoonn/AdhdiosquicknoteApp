import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Check, FileText } from "lucide-react";

export function NoteScreen() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "NOTE";
  const [note, setNote] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus the textarea when component mounts
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleSave = () => {
    if (note.trim()) {
      // TODO: Save the note to API/database here
      navigate("/tasks");
    }
  };

  const getCategoryColor = () => {
    switch (category) {
      case "NOW":
        return "from-orange-600 to-red-700";
      case "LATER":
        return "from-stone-500 to-stone-700";
      case "BRAIN":
        return "from-teal-700 to-emerald-800";
      default:
        return "from-stone-600 to-amber-700";
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-900">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-700 to-amber-600 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-teal-700 to-emerald-700 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 pt-12 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="text-white" size={20} />
          </button>

          <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getCategoryColor()} backdrop-blur-xl border border-white/20 flex items-center gap-2`}>
            <FileText size={16} className="text-white" />
            <span className="text-white text-sm font-medium">{category}</span>
          </div>

          <button
            onClick={handleSave}
            disabled={!note.trim()}
            className={`p-2 rounded-full backdrop-blur-xl border border-white/20 transition-all ${
              note.trim()
                ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:scale-105"
                : "bg-white/10 opacity-50"
            }`}
          >
            <Check className="text-white" size={20} />
          </button>
        </div>

        {/* Note input */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 backdrop-blur-2xl bg-white/5 rounded-3xl border border-white/10 p-6 flex flex-col"
        >
          <textarea
            ref={textareaRef}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Start typing your thoughts..."
            className="flex-1 bg-transparent text-white text-base placeholder-white/40 outline-none resize-none"
          />

          <div className="text-white/40 text-xs mt-4">
            {note.length} characters
          </div>
        </motion.div>

        {/* Quick actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-center text-white/40 text-sm"
        >
          Type freely - Bloom will organize it for you
        </motion.div>
      </div>
    </div>
  );
}