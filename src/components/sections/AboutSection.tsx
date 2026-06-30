import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Artist {
  name: string;
  genres: string[];
  image: string;
  url: string;
}

interface Track {
  name: string;
  artist: string;
  image: string;
  url: string;
  playedAt: string;
}

const AboutSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [artists, setArtists] = useState<Artist[] | null>(null);
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [lastTrack, setLastTrack] = useState<Track | null>(null);

  // Pull the top 5 from the Vercel serverless function (keeps secrets server-side).
  useEffect(() => {
    let cancelled = false;
    fetch('/api/spotify/top-artists')
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        setArtists(data.artists || []);
        setStatus('ok');
      })
      .catch(() => {
        if (!cancelled) setStatus('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // The most recently played track. Best-effort; failures just hide the card.
  useEffect(() => {
    let cancelled = false;
    fetch('/api/spotify/recently-played')
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((data) => {
        if (!cancelled && data.track) setLastTrack(data.track);
      })
      .catch(() => {
        /* silently hide the last-played card */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-line',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.1 }
      );
      gsap.to('.about-ghost', {
        yPercent: 45,
        ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate track rows in once they arrive.
  useEffect(() => {
    if (status !== 'ok') return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.track-row',
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, [status]);

  return (
    <div ref={sectionRef} className="relative overflow-hidden min-h-screen">
      <div
        className="about-ghost absolute top-[6%] left-0 right-0 text-center font-bold tracking-tighter select-none pointer-events-none text-[20vw] leading-none text-transparent opacity-40"
        style={{ WebkitTextStroke: '1px rgba(162,89,255,0.2)' }}
      >
        ABOUT
      </div>

      <div className="relative max-w-[1100px] mx-auto px-6 lg:px-12 pt-24 lg:pt-32 pb-32">
        {/* Header */}
        <div className="about-line font-mono text-accent text-xs tracking-[0.4em] mb-6">
          ABOUT // WORK IN PROGRESS
        </div>
        <h1 className="about-line text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[0.95] mb-6">
          UNDER
          <br />
          <span className="text-accent">CONSTRUCTION</span>
        </h1>
        <div className="about-line w-16 h-1 bg-accent mb-8" />
        <p className="about-line text-gray-300 text-base lg:text-xl max-w-2xl leading-relaxed mb-16">
          This section is still being built, but in the meantime here's my music
          taste to give you a feel of who I am.
        </p>

        {/* Last played track */}
        {lastTrack && (
          <div className="about-line mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accent" />
              </span>
              <span className="font-mono text-xs tracking-[0.3em] text-gray-400">
                LAST PLAYED ON SPOTIFY
              </span>
            </div>
            <a
              href={lastTrack.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-target group flex items-center gap-4 bg-dark-card/60 backdrop-blur-sm border border-dark-border hover:border-accent/60 p-3 transition-colors duration-300 max-w-xl"
            >
              <div className="w-16 h-16 overflow-hidden bg-dark-border shrink-0 ring-1 ring-dark-border group-hover:ring-accent/60 transition-all duration-300">
                {lastTrack.image && (
                  <img
                    src={lastTrack.image}
                    alt={lastTrack.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-semibold truncate group-hover:text-accent transition-colors duration-200">
                  {lastTrack.name}
                </div>
                <div className="text-gray-400 text-sm truncate">
                  {lastTrack.artist}
                </div>
              </div>
              <svg
                className="w-5 h-5 text-gray-600 group-hover:text-accent shrink-0 transition-colors duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="square" strokeWidth={2} d="M14 5l7 7-7 7M21 12H3" />
              </svg>
            </a>
          </div>
        )}

        {/* Spotify top 5 */}
        <div className="about-line flex items-center gap-3 mb-8">
          <svg className="w-6 h-6 text-accent" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.561.3z" />
          </svg>
          <span className="font-mono text-xs tracking-[0.3em] text-gray-400">
            MY TOP 5 ARTISTS ON SPOTIFY
          </span>
        </div>

        <div className="space-y-3">
          {status === 'loading' &&
            Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 bg-dark-card/60 border border-dark-border p-3"
              >
                <div className="w-6 text-center font-mono text-gray-600">{i + 1}</div>
                <div className="w-16 h-16 rounded-full bg-dark-border animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/2 bg-dark-border animate-pulse" />
                  <div className="h-2.5 w-1/3 bg-dark-border animate-pulse" />
                </div>
              </div>
            ))}

          {status === 'ok' &&
            artists &&
            artists.map((artist, i) => (
              <a
                key={`${artist.name}-${i}`}
                href={artist.url}
                target="_blank"
                rel="noopener noreferrer"
                className="track-row cursor-target group flex items-center gap-4 bg-dark-card/60 backdrop-blur-sm border border-dark-border hover:border-accent/60 p-3 transition-colors duration-300"
              >
                <div className="w-6 text-center font-mono text-lg text-accent group-hover:scale-125 transition-transform duration-300">
                  {i + 1}
                </div>
                <div className="w-16 h-16 rounded-full overflow-hidden bg-dark-border shrink-0 ring-1 ring-dark-border group-hover:ring-accent/60 transition-all duration-300">
                  {artist.image && (
                    <img
                      src={artist.image}
                      alt={artist.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-semibold truncate group-hover:text-accent transition-colors duration-200">
                    {artist.name}
                  </div>
                  {artist.genres.length > 0 && (
                    <div className="text-gray-400 text-sm truncate capitalize">
                      {artist.genres.slice(0, 2).join(' · ')}
                    </div>
                  )}
                </div>
                <svg
                  className="w-5 h-5 text-gray-600 group-hover:text-accent shrink-0 transition-colors duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="square" strokeWidth={2} d="M14 5l7 7-7 7M21 12H3" />
                </svg>
              </a>
            ))}

          {status === 'error' && (
            <div className="border border-dark-border bg-dark-card/60 p-6 font-mono text-sm text-gray-400">
              <span className="text-accent">{'// '}</span>
              Couldn't load Spotify right now. The live site pulls these straight
              from my account.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
