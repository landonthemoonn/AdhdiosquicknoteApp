import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, Camera, Video, RotateCw, Circle } from "lucide-react";

export function PhotoScreen() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [mode, setMode] = useState<"photo" | "video">("photo");
  const [capturedMedia, setCapturedMedia] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // TODO: Replace with real camera access
  // This is a placeholder for camera functionality
  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      // TODO: Implement real camera access
      // const stream = await navigator.mediaDevices.getUserMedia({
      //   video: { facingMode: 'environment' },
      //   audio: mode === 'video'
      // });
      // if (videoRef.current) {
      //   videoRef.current.srcObject = stream;
      //   streamRef.current = stream;
      // }
      console.log("Camera would start here");
    } catch (error) {
      console.error("Camera access error:", error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const capturePhoto = () => {
    // TODO: Implement real photo capture
    // const video = videoRef.current;
    // const canvas = canvasRef.current;
    // if (video && canvas) {
    //   const context = canvas.getContext('2d');
    //   canvas.width = video.videoWidth;
    //   canvas.height = video.videoHeight;
    //   context?.drawImage(video, 0, 0);
    //   const imageData = canvas.toDataURL('image/jpeg');
    //   setCapturedMedia(imageData);
    // }
    console.log("Photo captured - ready for AI transcription");
    setCapturedMedia("photo-placeholder");
  };

  const startVideoRecording = () => {
    // TODO: Implement real video recording
    // const mediaRecorder = new MediaRecorder(streamRef.current!);
    // mediaRecorder.start();
    setIsRecording(true);
    console.log("Video recording started");
  };

  const stopVideoRecording = () => {
    // TODO: Stop recording and save video
    setIsRecording(false);
    console.log("Video recording stopped - ready for AI transcription");
    setCapturedMedia("video-placeholder");
  };

  const handleCapture = () => {
    if (mode === "photo") {
      capturePhoto();
    } else {
      if (isRecording) {
        stopVideoRecording();
      } else {
        startVideoRecording();
      }
    }
  };

  const handleSave = () => {
    // TODO: Send to AI for transcription/analysis
    // This would call an AI API to analyze the photo/video and extract text
    console.log("Sending to AI for transcription...");
    navigate("/results");
  };

  const handleRetake = () => {
    setCapturedMedia(null);
    if (mode === "video") {
      setIsRecording(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-950 via-stone-900 to-neutral-900">
      {/* Gradient mesh background */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-orange-700 to-amber-600 rounded-full blur-3xl opacity-40 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-teal-700 to-emerald-700 rounded-full blur-3xl opacity-30 animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-screen">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-12 pb-4">
          <button
            onClick={() => navigate("/")}
            className="p-2 rounded-full backdrop-blur-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all"
          >
            <ArrowLeft className="text-white" size={20} />
          </button>

          {!capturedMedia && (
            <div className="flex gap-2 backdrop-blur-xl bg-white/10 rounded-full p-1 border border-white/20">
              <button
                onClick={() => setMode("photo")}
                className={`px-4 py-2 rounded-full transition-all ${
                  mode === "photo"
                    ? "bg-white/20 text-white"
                    : "text-white/60"
                }`}
              >
                <Camera size={20} />
              </button>
              <button
                onClick={() => setMode("video")}
                className={`px-4 py-2 rounded-full transition-all ${
                  mode === "video"
                    ? "bg-white/20 text-white"
                    : "text-white/60"
                }`}
              >
                <Video size={20} />
              </button>
            </div>
          )}

          <div className="w-10" /> {/* Spacer for alignment */}
        </div>

        {/* Camera viewfinder / Preview */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="relative w-full max-w-md aspect-[3/4] rounded-3xl overflow-hidden backdrop-blur-2xl bg-white/5 border border-white/10">
            {/* TODO: Replace with actual camera feed */}
            {!capturedMedia ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="text-white/40 mx-auto mb-4" size={64} />
                    <p className="text-white/60 text-sm">
                      Camera preview (requires device access)
                    </p>
                  </div>
                </div>
                {isRecording && (
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 px-3 py-2 rounded-full"
                  >
                    <Circle className="fill-white text-white" size={12} />
                    <span className="text-white text-xs font-medium">REC</span>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-emerald-900/40 to-teal-900/40">
                <div className="text-center">
                  <Camera className="text-emerald-400 mx-auto mb-4" size={64} />
                  <p className="text-white text-sm">
                    {mode === "photo" ? "Photo" : "Video"} captured!
                  </p>
                  <p className="text-white/60 text-xs mt-2">
                    Ready for AI transcription
                  </p>
                </div>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        </div>

        {/* Controls */}
        <div className="px-6 pb-12">
          {!capturedMedia ? (
            <div className="flex items-center justify-center gap-8">
              {/* Capture button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleCapture}
                className="relative"
              >
                <div
                  className={`w-20 h-20 rounded-full border-4 border-white flex items-center justify-center ${
                    isRecording ? "bg-red-600" : "bg-white/20"
                  }`}
                >
                  {mode === "video" && isRecording ? (
                    <div className="w-6 h-6 bg-white rounded-sm" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-white" />
                  )}
                </div>
                <div className="absolute inset-0 rounded-full bg-white/50 blur-xl -z-10" />
              </motion.button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleRetake}
                className="px-8 py-4 rounded-2xl backdrop-blur-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <RotateCw size={20} />
                <span>Retake</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleSave}
                className="px-8 py-4 rounded-2xl backdrop-blur-xl bg-gradient-to-r from-emerald-600 to-teal-600 border border-emerald-400/30 text-white hover:from-emerald-500 hover:to-teal-500 transition-all"
              >
                Save & Transcribe
              </motion.button>
            </div>
          )}

          <p className="text-white/40 text-xs text-center mt-6">
            {!capturedMedia
              ? mode === "photo"
                ? "Tap to capture a photo"
                : isRecording
                ? "Tap to stop recording"
                : "Tap to start recording"
              : "AI will extract text and actions from your media"}
          </p>
        </div>
      </div>
    </div>
  );
}
