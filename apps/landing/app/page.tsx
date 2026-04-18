"use client";

import { useState } from "react";
import { translations, type Language } from "./translations";

const bandColors = [
  "from-emerald-500 to-teal-500",
  "from-blue-500 to-cyan-500",
  "from-indigo-500 to-violet-500",
  "from-purple-500 to-pink-500",
];

const bandRanges = ["5 → 6.5", "6 → 7", "7 → 8", "8 → 9"];
const bandRangesNp = ["५ → ६.५", "६ → ७", "७ → ८", "८ → ९"];

const featureIcons = ["✍️", "🎙️", "📖", "🎧", "📈", "🗓️"];

const stepGradients = [
  "from-blue-500 to-blue-600",
  "from-indigo-500 to-indigo-600",
  "from-violet-500 to-violet-600",
  "from-purple-500 to-purple-600",
];

const teamAccents = [
  "from-blue-500 to-indigo-500",
  "from-emerald-500 to-teal-500",
  "from-amber-500 to-orange-500",
  "from-violet-500 to-fuchsia-500",
];

const teamImages: (string | null)[] = [
  "/team/saroj.jpeg",
  "/team/sachit.jpeg",
  "/team/sudesh.jpeg",
  "/team/prakat.jpeg",
];

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <img
      src="/hmilogo.png"
      alt="HelpMyIELTS Logo"
      className={className}
    />
  );
}

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang];
  const bands = lang === "np" ? bandRangesNp : bandRanges;

  return (
    <div className="flex flex-col min-h-full">
      {/* ─── Navbar ─── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100/80">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 group shrink-0">
            <LogoMark className="w-8 h-8 text-blue-600 transition-transform group-hover:scale-105" />
            <span className="text-xl font-bold tracking-tight text-slate-900 hidden sm:block">
              Help<span className="text-blue-600">My</span>IELTS
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
            <a href="#features" className="hover:text-slate-900 transition-colors">{t.nav.features}</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">{t.nav.howItWorks}</a>
            <a href="#team" className="hover:text-slate-900 transition-colors">{t.nav.team}</a>
            <a href="#testimonials" className="hover:text-slate-900 transition-colors">{t.nav.results}</a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Desktop Language toggle */}
            <div className="hidden md:flex items-center rounded-full border border-slate-200 bg-white p-0.5 text-[10px] font-bold">
              <button
                onClick={() => setLang("en")}
                className={`px-2.5 py-1 rounded-full transition-colors ${lang === "en" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang("np")}
                className={`px-2.5 py-1 rounded-full transition-colors ${lang === "np" ? "bg-slate-900 text-white" : "text-slate-500 hover:text-slate-900"}`}
              >
                नेपाली
              </button>
            </div>

            <a
              href="https://app.helpmyielts.com"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 transition-all shadow-sm active:scale-95"
            >
              <span className="hidden xs:inline">{t.nav.getStarted}</span>
              <span className="xs:hidden">Get started</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* ─── Mobile Menu Overlay ─── */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
          <nav className="absolute top-0 right-0 bottom-0 w-[280px] bg-white shadow-2xl flex flex-col p-8 slide-in-right">
            <div className="flex items-center justify-between mb-10">
              <LogoMark className="w-8 h-8 text-blue-600" />
              <button onClick={() => setIsMenuOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-col gap-6 text-lg font-semibold text-slate-900 mb-auto">
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors">{t.nav.features}</a>
              <a href="#how-it-works" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors">{t.nav.howItWorks}</a>
              <a href="#team" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors">{t.nav.team}</a>
              <a href="#testimonials" onClick={() => setIsMenuOpen(false)} className="hover:text-blue-600 transition-colors">{t.nav.results}</a>
            </div>

            <div className="pt-8 border-t border-slate-100 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500">Language / भाषा</span>
                <div className="flex items-center rounded-full border border-slate-200 bg-white p-0.5 text-xs font-bold">
                  <button onClick={() => setLang("en")} className={`px-4 py-1.5 rounded-full transition-colors ${lang === "en" ? "bg-slate-900 text-white" : "text-slate-500"}`}>EN</button>
                  <button onClick={() => setLang("np")} className={`px-4 py-1.5 rounded-full transition-colors ${lang === "np" ? "bg-slate-900 text-white" : "text-slate-500"}`}>नेपाली</button>
                </div>
              </div>
              <a
                href="https://app.helpmyielts.com"
                className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2"
              >
                {t.nav.signIn}
              </a>
            </div>
          </nav>
        </div>
      )}

      <main className="flex-1">
        {/* ─── Hero ─── */}
        <section className="hero-gradient relative overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl" />

          <div className="max-w-6xl mx-auto px-6 pt-20 sm:pt-28 pb-24 sm:pb-32 text-center relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/80 px-4 py-1.5 text-xs font-semibold text-blue-700 mb-8 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              {t.hero.badge}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15] max-w-4xl mx-auto">
              {t.hero.title1}{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                {t.hero.titleHighlight}
              </span>{" "}
              {t.hero.title2}
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.helpmyielts.com"
                className="group inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-sm font-semibold text-white hover:from-blue-500 hover:to-indigo-500 transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
              >
                {t.hero.ctaPrimary}
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/80 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-slate-700 hover:bg-white hover:border-slate-300 transition-all shadow-sm"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </section>

        {/* ─── Stats ─── */}
        <section className="border-b border-slate-100 bg-white">
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { value: "10,000+", label: t.stats.learners, icon: "👥" },
                { value: "Band 7+", label: t.stats.score, icon: "🎯" },
                { value: "50,000+", label: t.stats.tests, icon: "📝" },
                { value: "4.9/5", label: t.stats.rating, icon: "⭐" },
              ].map(({ value, label, icon }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl mb-2">{icon}</div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {value}
                  </div>
                  <div className="mt-1 text-sm text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Band Score Journey ─── */}
        <section className="bg-slate-50/50 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-14 max-w-3xl mx-auto">
              <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">
                {t.bands.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {t.bands.title}
              </h2>
              <p className="text-slate-500 leading-relaxed">
                {t.bands.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {bands.map((band, i) => {
                const level = t.bands.levels[i];
                return (
                  <div
                    key={band}
                    className="group relative rounded-2xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${bandColors[i]}`} />
                    <div className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r ${bandColors[i]} bg-clip-text text-transparent`}>
                      {band}
                    </div>
                    <div className="mt-3 text-sm font-semibold text-slate-900">
                      {level.descriptor}
                    </div>
                    <div className="mt-1 text-xs text-slate-500 leading-relaxed">
                      {level.useCase}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section id="features" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">
                {t.features.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {t.features.title}
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">{t.features.subtitle}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.features.items.map(({ title, desc }, i) => (
                <div
                  key={title}
                  className="group rounded-2xl border border-slate-100 bg-white p-7 hover:border-slate-200 hover:shadow-xl hover:shadow-slate-100/50 transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                    {featureIcons[i]}
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mb-2">{title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── How It Works ─── */}
        <section id="how-it-works" className="bg-slate-50 py-24">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">
                {t.howItWorks.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                {t.howItWorks.title}
              </h2>
            </div>

            <div className="relative">
              <div className="absolute left-8 top-12 bottom-12 w-px bg-gradient-to-b from-blue-200 via-indigo-200 to-purple-200 hidden sm:block" />
              <div className="flex flex-col gap-10">
                {t.howItWorks.steps.map(({ title, desc }, i) => (
                  <div key={title} className="flex gap-6 sm:gap-8 items-start">
                    <div className={`shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${stepGradients[i]} flex items-center justify-center text-white font-bold text-lg shadow-lg relative z-10`}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="pt-2">
                      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
                      <p className="text-slate-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Team ─── */}
        <section id="team" className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">
                {t.team.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {t.team.title}
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto">{t.team.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {t.team.members.map(({ name, role }, i) => {
                const image = teamImages[i];
                const initial = name.trim().charAt(0);
                return (
                  <div
                    key={name}
                    className="group rounded-2xl border border-slate-100 bg-white p-6 text-center hover:shadow-xl hover:shadow-slate-100/50 hover:border-slate-200 transition-all hover:-translate-y-1"
                  >
                    <div className="relative w-28 h-28 mx-auto mb-5">
                      {image ? (
                        <img
                          src={image}
                          alt={name}
                          className="w-28 h-28 rounded-full object-cover ring-4 ring-white shadow-md"
                        />
                      ) : (
                        <div className={`w-28 h-28 rounded-full bg-gradient-to-br ${teamAccents[i]} flex items-center justify-center text-white text-4xl font-bold shadow-md ring-4 ring-white`}>
                          {initial}
                        </div>
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-slate-900 mb-1">{name}</h3>
                    <p className="text-sm text-slate-500">{role}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Testimonials ─── */}
        <section id="testimonials" className="py-24 bg-slate-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block text-xs font-semibold text-blue-600 uppercase tracking-[0.2em] mb-4">
                {t.testimonials.eyebrow}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                {t.testimonials.title}
              </h2>
              <p className="text-slate-500 max-w-lg mx-auto">{t.testimonials.subtitle}</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.testimonials.items.map(({ name, from, score, text }) => (
                <div
                  key={name}
                  className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">&ldquo;{text}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{name}</div>
                      <div className="text-xs text-slate-400">{from}</div>
                    </div>
                    <div className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                      {score}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900" />
          <div className="max-w-4xl mx-auto px-6 py-24 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{t.cta.title}</h2>
            <p className="text-blue-200/80 mb-10 max-w-lg mx-auto text-lg">{t.cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://app.helpmyielts.com"
                className="inline-flex items-center justify-center rounded-full bg-white px-10 py-4 text-base font-semibold text-slate-900 hover:bg-blue-50 transition-all shadow-xl"
              >
                {t.cta.primary}
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-10 py-4 text-base font-semibold text-white hover:bg-white/10 transition-all"
              >
                {t.cta.secondary}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-slate-900 text-slate-400">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <LogoMark className="w-7 h-7 text-blue-400" />
                <span className="text-lg font-bold text-white">
                  Help<span className="text-blue-400">My</span>IELTS
                </span>
              </div>
              <p className="text-sm leading-relaxed">{t.footer.tagline}</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">{t.footer.product}</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">{t.nav.features}</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">{t.nav.howItWorks}</a></li>
                <li><a href="#team" className="hover:text-white transition-colors">{t.nav.team}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">{t.footer.resources}</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.tips}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.guide}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.plans}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white mb-4">{t.footer.contact}</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="mailto:support@helpmyielts.com" className="hover:text-white transition-colors">
                    support@helpmyielts.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            <span>© {new Date().getFullYear()} HelpMyIELTS. {t.footer.rights}</span>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">{t.footer.privacy}</a>
              <a href="#" className="hover:text-white transition-colors">{t.footer.terms}</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
