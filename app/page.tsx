"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

type Position = { x: number; y: number };
type Countdown = { days: number; hours: number; minutes: number; seconds: number };

type TenorGif = {
  postId: string;
  aspectRatio: string;
};

const noGifEmbeds: TenorGif[] = [
  { postId: "12756433236776117962", aspectRatio: "1" },
  { postId: "14413441628212659223", aspectRatio: "1.15385" },
  { postId: "3042225354493309845", aspectRatio: "1.245" },
  { postId: "19453917", aspectRatio: "1.00629" },
  { postId: "9431944348187876211", aspectRatio: "0.975904" }
];

const successPostId = "8495720813740986394";
const githubUrl = "https://github.com/jeonsion";

const noMessages = [
  "Please reconsider...",
  "I can ask one more time...",
  "The Yes button is getting bigger.",
  "Are you really sure about No?",
  "Last chance. The No button is running away!"
];

const emptyCountdown: Countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function getNextValentineCountdown(): Countdown {
  const now = new Date();
  const thisYearTarget = new Date(now.getFullYear(), 1, 14, 0, 0, 0, 0);
  const target = now > thisYearTarget ? new Date(now.getFullYear() + 1, 1, 14, 0, 0, 0, 0) : thisYearTarget;
  const diff = Math.max(0, target.getTime() - now.getTime());

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function createShareId(length = 8): string {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const bytes = new Uint8Array(length);

  if (typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function") {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < length; i += 1) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
  }

  let result = "";
  for (let i = 0; i < length; i += 1) {
    result += alphabet[bytes[i] % alphabet.length];
  }

  return result;
}

export default function HomePage() {
  const searchParams = useSearchParams();
  const fromParam = (searchParams.get("from") || "").trim();

  const [noCount, setNoCount] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState<Position | null>(null);
  const [showFanfare, setShowFanfare] = useState(false);

  const [nameInput, setNameInput] = useState("");
  const [generatedName, setGeneratedName] = useState("");
  const [generatedId, setGeneratedId] = useState("");
  const [origin, setOrigin] = useState("");
  const [copied, setCopied] = useState<"valentine" | "none">("none");
  const [countdown, setCountdown] = useState<Countdown>(emptyCountdown);
  const [hearts, setHearts] = useState<
    Array<{ id: number; left: number; delay: number; duration: number; size: number }>
  >([]);
  const [confetti, setConfetti] = useState<
    Array<{ id: number; left: number; delay: number; duration: number; size: number; symbol: string }>
  >([]);

  useEffect(() => {
    setOrigin(window.location.origin);
    setCountdown(getNextValentineCountdown());

    setHearts(
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        left: Math.floor(Math.random() * 96),
        delay: Math.floor(Math.random() * 8),
        duration: 8 + Math.floor(Math.random() * 5),
        size: 14 + Math.floor(Math.random() * 14)
      }))
    );

    setConfetti(
      Array.from({ length: 54 }, (_, i) => ({
        id: i,
        left: Math.floor(Math.random() * 96),
        delay: Math.random() * 0.9,
        duration: 1.8 + Math.random() * 1.3,
        size: 22 + Math.floor(Math.random() * 20),
        symbol: ["🎉", "✨", "💖", "🎊"][i % 4]
      }))
    );

    const timer = window.setInterval(() => {
      setCountdown(getNextValentineCountdown());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const gifStageIndex = Math.min(noCount, noGifEmbeds.length - 1);
  const messageStageIndex = Math.min(Math.max(noCount - 1, 0), noMessages.length - 1);
  const isFinalNoStage = noCount >= noGifEmbeds.length;
  const isEscapeStage = isFinalNoStage && !accepted;
  const yesScale = isFinalNoStage ? 1 : Math.min(1 + noCount * 0.18, 2.2);
  const noScale = Math.max(1 - noCount * 0.14, 0.35);

  const senderName = fromParam || generatedName || "Someone";

  const valentineLink =
    generatedName && generatedId
      ? `${origin || ""}/?from=${encodeURIComponent(generatedName)}&id=${encodeURIComponent(generatedId)}`
      : "";

  const moveNoButton = () => {
    if (!isEscapeStage) return;
    const x = Math.floor(Math.random() * 78) + 2;
    const y = Math.floor(Math.random() * 56) + 6;
    setNoPos({ x, y });
  };

  const resetGame = () => {
    setAccepted(false);
    setNoCount(0);
    setNoPos(null);
    setShowFanfare(false);
  };

  const copyText = async (text: string) => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied("valentine");
      window.setTimeout(() => setCopied("none"), 1600);
    } catch {
      setCopied("none");
    }
  };

  const createLink = () => {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    setGeneratedName(trimmed);
    setGeneratedId(createShareId(8));
  };

  const isBuilderMode = !fromParam;

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-pink-200 via-pink-100 to-fuchsia-200 px-5 py-8">
      <nav className="absolute left-0 right-0 top-0 z-20 px-4 pt-4 sm:px-8">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-2xl border border-pink-200/80 bg-white/70 px-4 py-2 backdrop-blur-sm">
          <a href="/" className="font-script text-2xl text-rosepink">
            Valentine
          </a>
          <div className="flex items-center gap-2">
            <a href="/" className="rounded-full border border-pink-300 bg-white px-4 py-1.5 text-sm font-bold text-pink-700">
              Main Page
            </a>
            <a href="/" className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-4 py-1.5 text-sm font-bold text-white">
              Create Link
            </a>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-slate-300 bg-slate-700 px-4 py-1.5 text-sm font-bold text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>

      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="pointer-events-none absolute text-pink-400/60 animate-float"
          style={{
            left: `${heart.left}%`,
            bottom: "-20px",
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`
          }}
        >
          💗
        </span>
      ))}

      {isBuilderMode && !generatedName && (
        <section className="relative z-10 mt-14 w-full max-w-2xl rounded-[34px] border border-pink-200/80 bg-pink-50/90 p-6 text-center shadow-candy backdrop-blur-sm sm:p-10">
          <h1 className="font-script text-[2.4rem] text-rosepink sm:text-[3.6rem]">Valentine Countdown</h1>
          <p className="mt-3 text-base font-semibold text-pink-800 sm:text-lg">Time left until next Valentine&apos;s Day</p>

          <div className="mt-5 grid grid-cols-4 gap-3 text-center">
            <div className="rounded-2xl bg-white/80 p-3">
              <p className="text-2xl font-extrabold text-pink-700 sm:text-4xl">{pad(countdown.days)}</p>
              <p className="text-xs font-bold text-pink-500 sm:text-sm">DAYS</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-3">
              <p className="text-2xl font-extrabold text-pink-700 sm:text-4xl">{pad(countdown.hours)}</p>
              <p className="text-xs font-bold text-pink-500 sm:text-sm">HOURS</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-3">
              <p className="text-2xl font-extrabold text-pink-700 sm:text-4xl">{pad(countdown.minutes)}</p>
              <p className="text-xs font-bold text-pink-500 sm:text-sm">MIN</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-3">
              <p className="text-2xl font-extrabold text-pink-700 sm:text-4xl">{pad(countdown.seconds)}</p>
              <p className="text-xs font-bold text-pink-500 sm:text-sm">SEC</p>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-pink-200 bg-white/85 p-4 sm:p-5">
            <p className="text-sm font-bold text-pink-700 sm:text-base">Create your Valentine link</p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your name"
                className="w-full rounded-full border border-pink-200 bg-white px-5 py-3 text-base font-semibold text-pink-900 outline-none placeholder:text-pink-300 focus:border-pink-400"
              />
              <button
                type="button"
                onClick={createLink}
                className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-3 text-base font-extrabold text-white"
              >
                Create Valentine Link
              </button>
            </div>
          </div>
        </section>
      )}

      {isBuilderMode && generatedName && (
        <section className="relative z-10 mt-14 w-full max-w-3xl rounded-[34px] border border-pink-200/80 bg-pink-50/90 p-6 text-center shadow-candy backdrop-blur-sm sm:p-10">
          <h1 className="font-script text-[2.4rem] text-rosepink sm:text-[3.6rem]">Your Link is Ready!</h1>
          <p className="mt-2 text-base font-semibold text-pink-800 sm:text-lg">Share this magical link with your special someone</p>

          <div className="mt-6 rounded-3xl border border-pink-200 bg-white/90 p-4 text-left sm:p-5">
            <p className="text-lg font-extrabold text-pink-900">💞 Valentine Link (Share this)</p>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                readOnly
                value={valentineLink}
                className="w-full rounded-2xl border border-pink-200 bg-pink-50 px-4 py-3 text-base font-semibold text-pink-900"
              />
              <button
                type="button"
                onClick={() => copyText(valentineLink)}
                className="rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 px-5 py-3 text-base font-extrabold text-white"
              >
                Copy
              </button>
            </div>
            <div className="mt-3">
              <a
                href={valentineLink}
                target="_blank"
                className="inline-block rounded-full bg-violet-500 px-5 py-2 text-sm font-bold text-white"
                rel="noreferrer"
              >
                Preview Link
              </a>
            </div>
          </div>

          <p className="mt-4 min-h-5 text-sm font-bold text-pink-700">{copied === "valentine" && "Valentine link copied!"}</p>

          <button
            type="button"
            onClick={() => {
              setGeneratedName("");
              setGeneratedId("");
              setNameInput("");
            }}
            className="mt-1 rounded-full border border-pink-300 bg-white px-5 py-2 text-sm font-bold text-pink-700"
          >
            Create Another Link
          </button>
        </section>
      )}

      {!isBuilderMode && (
        <section className="relative z-10 mt-14 w-full max-w-3xl rounded-[34px] border border-pink-200/80 bg-pink-50/85 p-5 text-center shadow-candy backdrop-blur-sm sm:p-7">
          <p className="mb-2 text-base font-bold text-pink-900 sm:text-[2rem]">
            Hey there! <span className="rounded-md bg-sky-100 px-2 py-0.5 text-fuchsia-700">{senderName}</span> has a question for
            you...
          </p>

          <h1 className="font-script text-[2rem] leading-tight text-rosepink sm:text-[3.2rem]">Will You Be My Valentine?</h1>

          <p className="mt-2 text-sm text-pink-700 sm:text-base">Please click just once 💌</p>

          <div className="mx-auto mt-4 w-full max-w-[360px]">
            {noGifEmbeds.map((gif, idx) => (
              <div key={gif.postId} className={!accepted && idx === gifStageIndex ? "block" : "hidden"}>
                <div
                  className="tenor-gif-embed"
                  data-postid={gif.postId}
                  data-share-method="host"
                  data-aspect-ratio={gif.aspectRatio}
                  data-width="100%"
                >
                  <a href="https://tenor.com/">No reaction GIF</a>
                </div>
              </div>
            ))}

            <div className={accepted ? "block" : "hidden"}>
              <div
                className="tenor-gif-embed"
                data-postid={successPostId}
                data-share-method="host"
                data-aspect-ratio="1"
                data-width="100%"
              >
                <a href="https://tenor.com/">Success GIF</a>
              </div>
            </div>
          </div>

          <p className="mt-4 min-h-6 text-sm font-semibold text-pink-700 sm:text-base">
            {accepted ? "Yay! Thank you 💖" : noCount > 0 ? noMessages[messageStageIndex] : ""}
          </p>

          <div className="relative mt-4 min-h-28">
            <button
              type="button"
              onClick={() => {
                setAccepted(true);
                setShowFanfare(true);
                window.setTimeout(() => setShowFanfare(false), 2700);
              }}
              className={`rounded-full bg-gradient-to-r from-pink-500 to-rose-500 font-extrabold text-white shadow-lg transition ${
                isFinalNoStage ? "px-12 py-6 text-6xl sm:text-7xl" : "px-9 py-3 text-xl"
              }`}
              style={{
                transform: `scale(${accepted ? 1.08 : yesScale})`,
                width: isFinalNoStage ? "50vw" : undefined,
                minWidth: isFinalNoStage ? "320px" : undefined,
                maxWidth: isFinalNoStage ? "760px" : undefined
              }}
            >
              Yes ✨
            </button>

            {!accepted && (
              <button
                type="button"
                onClick={() => setNoCount((prev) => prev + 1)}
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                className="rounded-full bg-slate-400 px-7 py-2.5 text-lg font-bold text-white transition"
                style={{
                  transform: `scale(${noScale})`,
                  opacity: Math.max(0.3, 1 - noCount * 0.13),
                  position: isEscapeStage ? "absolute" : "relative",
                  left: isEscapeStage ? `${noPos?.x ?? 72}%` : undefined,
                  top: isEscapeStage ? `${noPos?.y ?? 5}%` : undefined
                }}
              >
                No 😢
              </button>
            )}
          </div>

          {accepted && (
            <div className="mt-2 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={resetGame}
                className="rounded-full border border-pink-300 bg-white px-6 py-2 text-base font-bold text-pink-700"
              >
                Restart
              </button>
              <a href="/" className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-6 py-2 text-base font-bold text-white">
                Back To Main
              </a>
            </div>
          )}
        </section>
      )}

      {showFanfare && (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
          {confetti.map((item) => (
            <span
              key={item.id}
              className="fanfare-piece absolute"
              style={{
                left: `${item.left}%`,
                top: "72%",
                animationDelay: `${item.delay}s`,
                animationDuration: `${item.duration}s`,
                fontSize: `${item.size}px`
              }}
            >
              {item.symbol}
            </span>
          ))}
        </div>
      )}

      <Script src="https://tenor.com/embed.js" strategy="lazyOnload" />
    </main>
  );
}
