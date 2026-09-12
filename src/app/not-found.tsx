import Link from "next/link";
import Wordmark from "@/components/Wordmark";

export default function NotFound() {
  return (
    <div className="bg-babe grain flex min-h-screen flex-col items-center justify-center px-6 text-center text-white">
      <Wordmark className="mx-auto h-[clamp(80px,13vw,140px)]" />
      <p className="font-display mt-10 text-[clamp(1.6rem,4vw,2.6rem)]">
        This one came unclasped.
      </p>
      <p className="mt-4 max-w-[36ch] text-white/80">
        The page you were after isn&rsquo;t here &mdash; but everything else
        still is.
      </p>
      <Link
        href="/"
        className="mt-10 rounded-full bg-white px-9 py-4 text-[0.78rem] tracking-[0.18em] text-ink uppercase"
      >
        Back home
      </Link>
    </div>
  );
}
