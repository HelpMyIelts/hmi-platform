export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-semibold tracking-tight text-slate-900">
            HelpMyIELTS
          </span>
          <nav className="hidden sm:flex items-center gap-8 text-sm text-slate-600">
            <a href="#features" className="hover:text-slate-900 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">How it works</a>
          </nav>
          <a
            href="https://app.helpmyielts.com"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
          >
            Get started
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-xs font-medium text-slate-600 mb-8">
            AI-powered IELTS preparation
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 leading-tight max-w-3xl mx-auto">
            Achieve your target{" "}
            <span className="text-blue-600">IELTS band score</span>
          </h1>
          <p className="mt-6 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Personalised feedback on Writing and Speaking, timed practice tests,
            and expert strategies — everything you need to reach Band 7, 8 or 9.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://app.helpmyielts.com"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3.5 text-sm font-semibold text-white hover:bg-blue-500 transition-colors shadow-sm"
            >
              Start practising free
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-8 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              See how it works
            </a>
          </div>
        </section>

        {/* Band score indicators */}
        <section className="bg-slate-50 py-14">
          <div className="max-w-6xl mx-auto px-6">
            <p className="text-center text-sm font-medium text-slate-400 uppercase tracking-widest mb-10">
              Trusted across all skill levels
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { band: "5 → 6.5", label: "Academic upgrade" },
                { band: "6 → 7", label: "University entry" },
                { band: "7 → 8", label: "Professional visa" },
                { band: "8 → 9", label: "Expert mastery" },
              ].map(({ band, label }) => (
                <div key={band} className="rounded-2xl bg-white border border-slate-100 p-6 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">{band}</div>
                  <div className="mt-1 text-sm text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="max-w-6xl mx-auto px-6 py-24">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-4">
            Everything you need to succeed
          </h2>
          <p className="text-slate-500 text-center mb-16 max-w-xl mx-auto">
            A complete preparation system built around the official IELTS exam format.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "AI Writing Feedback",
                desc: "Submit Task 1 and Task 2 essays and receive detailed band-score feedback on coherence, lexical resource, grammar and task achievement within seconds.",
                icon: "✍️",
              },
              {
                title: "Speaking Practice",
                desc: "Record your responses to Part 1, 2 and 3 questions. Get pronunciation, fluency and vocabulary feedback with suggested model answers.",
                icon: "🎙️",
              },
              {
                title: "Timed Reading Tests",
                desc: "Full academic and general reading passages with all question types — matching headings, true/false/not given, sentence completion and more.",
                icon: "📖",
              },
              {
                title: "Listening Simulations",
                desc: "Authentic listening practice across all four sections with instant answer analysis and explanations for every question.",
                icon: "🎧",
              },
              {
                title: "Progress Tracking",
                desc: "Visualise your band score trajectory across modules over time and identify exactly where to focus your study sessions.",
                icon: "📈",
              },
              {
                title: "Expert Study Plans",
                desc: "Structured 4, 8 or 12-week plans curated by certified IELTS examiners, tailored to your current level and target date.",
                icon: "🗓️",
              },
            ].map(({ title, desc, icon }) => (
              <div key={title} className="rounded-2xl border border-slate-100 bg-white p-7 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl mb-4">{icon}</div>
                <h3 className="text-base font-semibold text-slate-900 mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="bg-slate-50 py-24">
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-slate-900 text-center mb-16">
              How it works
            </h2>
            <div className="flex flex-col gap-12">
              {[
                {
                  step: "01",
                  title: "Take a diagnostic test",
                  desc: "Complete a short assessment across all four skills. We establish your current band score baseline and identify your weakest areas.",
                },
                {
                  step: "02",
                  title: "Follow your personalised plan",
                  desc: "Your study schedule is built around your target exam date and band score. Each session is focused, efficient and measurable.",
                },
                {
                  step: "03",
                  title: "Practice and get instant feedback",
                  desc: "Submit practice tasks and receive AI-powered feedback aligned to official IELTS marking criteria — available 24/7.",
                },
                {
                  step: "04",
                  title: "Track your progress",
                  desc: "Watch your predicted band score rise over time. Know exactly when you are ready for exam day.",
                },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-8 items-start">
                  <div className="shrink-0 text-4xl font-bold text-slate-100 w-16 text-right">{step}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
                    <p className="text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Ready to achieve your band score?
          </h2>
          <p className="text-slate-500 mb-10 max-w-lg mx-auto">
            Join thousands of IELTS candidates improving their scores with HelpMyIELTS.
          </p>
          <a
            href="https://app.helpmyielts.com"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-10 py-4 text-base font-semibold text-white hover:bg-blue-500 transition-colors shadow-sm"
          >
            Start for free today
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-100 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <span className="font-medium text-slate-600">HelpMyIELTS</span>
          <span>© {new Date().getFullYear()} HelpMyIELTS. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
