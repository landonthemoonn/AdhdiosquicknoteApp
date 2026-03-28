import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Square, Tag, ArrowLeft } from "lucide-react";

export function RecordingScreen() {
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState<string[]>([]);
  const [waveform, setWaveform] = useState<number[]>(Array(20).fill(0.3));
  const [isRecording, setIsRecording] = useState(true);

  // Auto-start recording when component mounts
  useEffect(() => {
    setIsRecording(true);
    // TODO: Integrate real audio recording API here
  }, []);

  // Simulate waveform animation (replace with real audio visualization)
  useEffect(() => {
    const interval = setInterval(() => {
      setWaveform(Array(20).fill(0).map(() => Math.random()));
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleStopRecording = () => {
    setIsRecording(false);
    navigate("/results");
  };

  const tags = [
    { label: "NOW", color: "from-red-500 to-orange-500" },
    { label: "NEXT", color: "from-yellow-500 to-amber-500" },
    { label: "LATER", color: "from-gray-400 to-gray-500" },
    { label: "NOTE", color: "from-purple-500 to-pink-500" },
    { label: "QUESTION", color: "from-cyan-500 to-blue-500" },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-red-950 via-orange-900 to-gray-900">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-full blur-3xl opacity-30 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-6 pt-12 pb-24">
        {/* Header with back button */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="text-white" size={20} />
          </button>

          {/* Recording indicator */}
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-3 h-3 rounded-full bg-red-500"
            />
            <span className="text-white/80 text-sm">Recording</span>
          </div>

          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* Waveform visualization */}
        <div className="flex items-center justify-center gap-1 h-32 mb-8">
          {waveform.map((height, i) => (
            <motion.div
              key={i}
              animate={{ scaleY: height }}
              transition={{ duration: 0.1 }}
              className="w-1 bg-gradient-to-t from-cyan-400 via-pink-400 to-purple-400 rounded-full origin-center"
              style={{ height: "100%" }}
            />
          ))}
        </div>

        {/* Live transcription */}
        <div className="flex-1 mb-8">
          <div className="backdrop-blur-2xl bg-white/5 rounded-3xl p-6 border border-white/10 min-h-[200px]">
            <AnimatePresence>
              {transcript.map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: i >= transcript.length - 5 ? 1 : 0.4,
                    y: 0,
                  }}
                  className="text-white text-lg inline-block mr-2"
                >
                  {word}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Quick tag chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <button
              key={tag.label}
              className={`px-4 py-2 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 text-white text-xs hover:bg-white/20 transition-all`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Mark moment button */}
        <button className="mb-6 px-6 py-3 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 text-white text-sm flex items-center justify-center gap-2 hover:bg-white/20 transition-all">
          <Tag size={16} />
          Mark moment
        </button>

        {/* Stop recording button */}
        <button
          onClick={handleStopRecording}
          className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-red-500/50 border border-white/20 hover:scale-95 transition-transform"
        >
          <Square size={32} className="text-white fill-white" />
        </button>
      </div>
    </div>
  );
}