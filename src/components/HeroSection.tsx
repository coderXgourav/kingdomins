import { useState, useRef, useCallback } from "react";
import { Search, Mic, MicOff, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { t } from "@/lib/i18n";
import heroVideo from "@/assets/city-skyline-landscape.mp4";

const categoryPills = ["Luxury", "Apartment", "Villa", "Penthouse", "Commercial"];
const cities = ["London", "Dubai", "Riyadh", "New York", "Turkey"];

interface HeroSectionProps {
  language: string;
}

export default function HeroSection({ language }: HeroSectionProps) {
  const navigate = useNavigate();
  const [searchType, setSearchType] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [searchPrice, setSearchPrice] = useState("");
  const [searchBedrooms, setSearchBedrooms] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceText, setVoiceText] = useState("");
  const recognitionRef = useRef<any>(null);
  const isListeningRef = useRef(false);

  // Voice search via Web Speech API
  const handleVoiceSearch = useCallback(() => {
    if (isListeningRef.current) {
      // Stop listening
      isListeningRef.current = false;
      setIsListening(false);
      recognitionRef.current?.stop();
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice search is not supported in your browser. Try Chrome or Edge.");
      return;
    }

    if (!recognitionRef.current) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("");

        setVoiceText(transcript);
        setSearchType(transcript);

        if (event.results[event.results.length - 1].isFinal) {
          // Auto-search after final result
          setTimeout(() => {
            isListeningRef.current = false;
            setIsListening(false);
          }, 500);
        }
      };

      recognition.onend = () => {
        isListeningRef.current = false;
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
        isListeningRef.current = false;
        setIsListening(false);
        if (event.error === "not-allowed") {
          alert("Microphone access denied. Please allow microphone in browser settings.");
        }
      };

      recognitionRef.current = recognition;
    }

    isListeningRef.current = true;
    setIsListening(true);
    setVoiceText("");
    recognitionRef.current.start();
  }, []);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchType) params.set("q", searchType);
    if (searchLocation) params.set("city", searchLocation);
    if (searchPrice) params.set("price", searchPrice);
    if (searchBedrooms) params.set("beds", searchBedrooms);
    navigate(`/properties?${params.toString()}`);
  };

  const handlePillClick = (pill: string) => {
    setSearchType(pill);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden text-[hsl(40,54%,97%)]">
      {/* Background image */}
      <div className="absolute inset-0">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover animate-[kenBurns_25s_ease-in-out_infinite_alternate]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(214,40%,8%,0.7)] via-[hsl(214,40%,10%,0.15)] to-transparent" />
      </div>

      {/* Main content - left aligned */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 lg:px-10 pb-0">
        {/* Headline */}
        <h1
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[0.95] mb-6 max-w-4xl"
          style={{ animation: "fadeInUp 1s ease-out 0.2s forwards", opacity: 0 }}
        >
          {t("hero.title1", language)}{" "}
          <span className="italic text-[hsl(0,0%,100%)]">{t("hero.title2", language)}</span>
        </h1>

        {/* Subtitle */}
        <p
          className="font-body text-base sm:text-lg text-[hsl(40,54%,80%)] max-w-lg mb-12"
          style={{ animation: "fadeInUp 1s ease-out 0.4s forwards", opacity: 0 }}
        >
          {t("hero.subtitle", language)}
        </p>
      </div>

      {/* Search panel at bottom — overlapping */}
      <div className="relative z-20 max-w-[1440px] mx-auto w-full px-4 sm:px-6 lg:px-10 -mt-2 mb-[-40px] sm:mb-[-80px]">
        <div
          className="bg-card rounded-2xl shadow-2xl shadow-foreground/10 p-6 sm:p-8 border border-border"
          style={{ animation: "fadeInUp 1s ease-out 0.6s forwards", opacity: 0 }}
        >
          {/* Header with voice search */}
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-xl sm:text-2xl text-foreground">Find the best place</h3>
            <button
              onClick={handleVoiceSearch}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-body font-semibold transition-all ${
                isListening
                  ? "bg-destructive text-destructive-foreground animate-pulse"
                  : "bg-accent text-accent-foreground hover:opacity-90"
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              {isListening ? "Listening..." : "Voice Search"}
            </button>
          </div>

          {/* Voice feedback */}
          {isListening && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-accent/10 border border-accent/20 flex items-center gap-3">
              <div className="flex gap-1">
                <span className="w-1.5 h-4 bg-accent rounded-full animate-[pulse_0.8s_ease-in-out_infinite]" />
                <span className="w-1.5 h-6 bg-accent rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.15s]" />
                <span className="w-1.5 h-3 bg-accent rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.3s]" />
                <span className="w-1.5 h-5 bg-accent rounded-full animate-[pulse_0.8s_ease-in-out_infinite_0.45s]" />
              </div>
              <span className="font-body text-sm text-accent">
                {voiceText || "Speak now — e.g. \"Luxury villa in Dubai\""}
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
            {/* Looking for */}
            <div>
              <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Looking for</label>
              <input
                type="text"
                placeholder="e.g. Villa, Penthouse..."
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-body text-sm placeholder:text-muted-foreground/60 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-xs font-body font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block">Location</label>
              <div className="relative">
                <select
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground font-body text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="">All Locations</option>
                  {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Search button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-body font-semibold magnetic-hover shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                Search
              </button>
            </div>
          </div>

          {/* Quick filters row - hidden on small mobile */}
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex flex-wrap items-center gap-2 flex-1">
              <span className="text-xs font-body text-muted-foreground font-semibold">Quick:</span>
              {cities.map((f) => (
                <button
                  key={f}
                  onClick={() => setSearchLocation(f)}
                  className={`px-3.5 py-1.5 rounded-full border text-xs font-body transition-colors ${
                    searchLocation === f
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border text-muted-foreground hover:border-primary hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
