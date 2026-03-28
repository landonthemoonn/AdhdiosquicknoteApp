import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Mic, FileText, Zap, Clock, Brain, ListChecks } from "lucide-react";
import { BottomNav } from "../components/BottomNav";

interface BloomOption {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  route: string;
  angle: number;
}

export function CaptureScreen() {
  const navigate = useNavigate();
  const [isBloomActive, setIsBloomActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [touchPosition, setTouchPosition] = useState({ x: 0, y: 0 });
  const centerRef = useRef<HTMLDivElement>(null);

  const options: BloomOption[] = [
    {
      id: "voice",
      label: "Voice",
      icon: Mic,
      color: "from-amber-600 to-orange-700",
      route: "/recording",
      angle: 0,
    },
    {
      id: "note",
      label: "Note",
      icon: FileText,
      color: "from-stone-600 to-amber-700",
      route: "/note?category=NOTE",
      angle: 60,
    },
    {
      id: "now",
      label: "NOW",
      icon: Zap,
      color: "from-orange-600 to-red-700",
      route: "/note?category=NOW",
      angle: 120,
    },
    {
      id: "later",
      label: "LATER",
      icon: Clock,
      color: "from-stone-500 to-stone-700",
      route: "/note?category=LATER",
      angle: 180,
    },
    {
      id: "brain",
      label: "Brain Dump",
      icon: Brain,
      color: "from-teal-700 to-emerald-800",
      route: "/note?category=BRAIN",
      angle: 240,
    },
    {
      id: "tasks",
      label: "View Tasks",
      icon: ListChecks,
      color: "from-yellow-700 to-amber-800",
      route: "/tasks",
      angle: 300,
    },
  ];

  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsBloomActive(true);
    if (centerRef.current) {
      const rect = centerRef.current.getBoundingClientRect();
      setTouchPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isBloomActive) return;

    let clientX: number, clientY: number;
    if ("touches" in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const dx = clientX - touchPosition.x;
    const dy = clientY - touchPosition.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 50) {
      // Calculate angle
      let angle = (Math.atan2(dy, dx) * 180) / Math.PI;
      if (angle < 0) angle += 360;

      // Find closest option
      let closest = options[0];
      let minDiff = 360;

      options.forEach((option) => {
        const diff = Math.min(
          Math.abs(angle - option.angle),
          360 - Math.abs(angle - option.angle)
        );
        if (diff < minDiff) {
          minDiff = diff;
          closest = option;
        }
      });

      setSelectedOption(closest.id);
    } else {
      setSelectedOption(null);
    }
  };

  const handleTouchEnd = () => {
    if (selectedOption) {
      const option = options.find((opt) => opt.id === selectedOption);
      if (option) {
        // Navigate to the selected route
        setTimeout(() => navigate(option.route), 200);
      }
    }
    setIsBloomActive(false);
    setSelectedOption(null);
  };

  const getOptionPosition = (angle: number, radius: number) => {
    const radian = (angle * Math.PI) / 180;
    return {
      x: Math.cos(radian) * radius,
      y: Math.sin(radian) * radius,
    };
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-900">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-700 to-amber-600 rounded-full blur-3xl opacity-40" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-teal-700 to-emerald-700 rounded-full blur-3xl opacity-30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-8"
        >
          {/* Logo/Title */}
          <div className="text-center mb-4">
            <h1 className="text-6xl mb-2 bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
              Bloom
            </h1>
            <p className="text-white/60 text-sm">Calm control in chaos</p>
          </div>

          {/* Bloom interaction area */}
          <div className="relative w-80 h-80 flex items-center justify-center">
            {/* Bloom options */}
            <AnimatePresence>
              {isBloomActive &&
                options.map((option) => {
                  const Icon = option.icon;
                  const pos = getOptionPosition(option.angle, 120);
                  const isSelected = selectedOption === option.id;

                  return (
                    <motion.div
                      key={option.id}
                      initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                      animate={{
                        scale: isSelected ? 1.2 : 1,
                        x: pos.x,
                        y: pos.y,
                        opacity: 1,
                      }}
                      exit={{ scale: 0, x: 0, y: 0, opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="absolute"
                    >
                      <div
                        className={`w-16 h-16 rounded-full bg-gradient-to-br ${
                          option.color
                        } backdrop-blur-xl flex items-center justify-center shadow-2xl border ${
                          isSelected
                            ? "border-white/60 shadow-white/50"
                            : "border-white/20"
                        }`}
                      >
                        <Icon size={24} className="text-white" />
                      </div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isSelected ? 1 : 0.8 }}
                        className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
                      >
                        <span className="text-white text-xs font-medium">
                          {option.label}
                        </span>
                      </motion.div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>

            {/* Center Bloom Core Button */}
            <motion.div
              ref={centerRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleTouchStart}
              onMouseMove={handleTouchMove}
              onMouseUp={handleTouchEnd}
              onMouseLeave={() => {
                if (isBloomActive) handleTouchEnd();
              }}
              animate={{
                scale: isBloomActive ? 0.8 : 1,
              }}
              whileTap={{ scale: 0.9 }}
              className="relative cursor-pointer touch-none"
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-amber-500/50 border border-white/20">
                {/* Inner glow */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/20 to-transparent" />

                {/* Icon */}
                <motion.div
                  animate={{
                    scale: isBloomActive ? 0 : 1,
                    opacity: isBloomActive ? 0 : 1,
                  }}
                  className="relative flex flex-col items-center gap-2 text-white"
                >
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white" />
                  </div>
                  <span className="text-xs">Tap & Swipe</span>
                </motion.div>
              </div>

              {/* Outer glow effect */}
              <motion.div
                animate={{
                  opacity: isBloomActive ? 0.8 : 0.4,
                  scale: isBloomActive ? 1.3 : 1,
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 blur-2xl -z-10"
              />
            </motion.div>
          </div>

          {/* Hint text */}
          <motion.p
            animate={{ opacity: isBloomActive ? 0 : 1 }}
            className="text-white/40 text-sm text-center max-w-xs"
          >
            {isBloomActive
              ? selectedOption
                ? "Release to select"
                : "Swipe to an option"
              : "Tap and swipe to quickly capture your thoughts"}
          </motion.p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}