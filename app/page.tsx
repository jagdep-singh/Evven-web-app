import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const navigation = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const features = [
  {
    title: "Shared expense tracking",
    description:
      "Invite friends, roommates, or travel partners and keep every charge visible in one shared space.",
  },
  {
    title: "Auto balance calculations",
    description:
      "Let EvenUp do the math: see who owes what instantly and eliminate awkward settling conversations.",
  },
  {
    title: "Fast settlements",
    description:
      "Create payment plans, record reimbursements, and close out group expenses in minutes.",
  },
];

const useCases = [
  {
    title: "Roommates",
    description: "Split rent, utilities, groceries, and shared subscriptions without confusion.",
  },
  {
    title: "Trips",
    description: "Manage travel costs, activity tickets, and shared meals with real-time clarity.",
  },
  {
    title: "Events",
    description: "Keep wedding gifts, dinners, and group outings balanced across every participant.",
  },
];

const testimonials = [
  {
    quote:
      "EvenUp made our travel planning so much easier. No more calculating who paid for what — everything is clear and fair.",
    name: "Maya R.",
    role: "Travel group organizer",
  },
  {
    quote:
      "My roommates love it. We finally stayed on top of utilities and groceries without uncomfortable money talks.",
    name: "Jordan L.",
    role: "College student",
  },
];

const faqs = [
  {
    question: "Can I use EvenUp for recurring expenses?",
    answer:
      "Yes. You can track subscriptions, monthly bills, and repeated payments with flexible split options.",
  },
  {
    question: "Is my data shared securely?",
    answer:
      "Your expense history is stored securely and only visible to the people in your group.",
  },
  {
    question: "Do I need to pay to start?",
    answer:
      "You can get started for free with the basic plan and upgrade only when your group needs advanced reporting.",
  },
];

export default function HomePage() {
  return (
    <main className="bg-[var(--evenup-background)] text-[var(--evenup-text-primary)]">
      <div className="absolute inset-x-0 top-0 h-40 bg-sky-50/30 blur-3xl" />

      <header className="relative z-10 border-b border-[var(--evenup-border)] bg-[rgba(255,255,255,.92)]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.26em] text-[var(--evenup-text-primary)]">
            <Image
              src="/EvenUp-white.svg"
              alt="EvenUp"
              width={70}
              height={70}
              className="invert"
              priority
            />
            EvenUp
          </Link>
          

          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <a key={item.href} href={item.href} className="text-sm text-[var(--evenup-text-muted)] transition hover:text-[var(--evenup-text-primary)]">
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/signup">
              <Button className="rounded-full px-5 py-2.5 text-sm">Start free</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden px-6 py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="section-label">Expense sharing made simple</p>
            <h1 className="mt-6 max-w-3xl text-5xl font-heading tracking-[-0.05em] sm:text-6xl">
              Keep shared costs fair, clear, and totally handled.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--evenup-text-muted)] sm:text-lg">
              EvenUp gives groups a single place to log shared expenses, calculate balances automatically, and settle up without awkward money talk.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/signup">
                <Button className="rounded-full px-8 py-3">Get started free</Button>
              </Link>
              <a href="https://github.com/jagdep-singh/EvenUp" target="_blank" rel="noreferrer">
                <Button variant="outline" className="rounded-full px-8 py-3">View on GitHub</Button>
              </a>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[28px] border border-[var(--evenup-border)] bg-white p-6 shadow-sm">
                <p className="text-sm text-[var(--evenup-text-muted)]">Avg. time saved</p>
                <p className="mt-3 text-3xl font-semibold">25%</p>
              </div>
              <div className="rounded-[28px] border border-[var(--evenup-border)] bg-white p-6 shadow-sm">
                <p className="text-sm text-[var(--evenup-text-muted)]">Groups onboarded</p>
                <p className="mt-3 text-3xl font-semibold">1.2k+</p>
              </div>
              <div className="rounded-[28px] border border-[var(--evenup-border)] bg-white p-6 shadow-sm">
                <p className="text-sm text-[var(--evenup-text-muted)]">Settlements closed</p>
                <p className="mt-3 text-3xl font-semibold">3.4k+</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-48 rounded-l-[80px] bg-sky-100/70 blur-3xl lg:block" />
            <div className="rounded-[36px] border border-[var(--evenup-border)] bg-white p-8 shadow-[0_40px_120px_rgba(15,23,42,0.08)] sm:p-10">
              <div className="space-y-6">
                <div className="rounded-3xl bg-sky-50 p-6">
                  <p className="text-sm uppercase tracking-[0.22em] text-[var(--evenup-text-muted)]">Group balance</p>
                  <p className="mt-3 text-3xl font-semibold">You owe $54.30</p>
                  <p className="mt-3 text-sm leading-6 text-[var(--evenup-text-muted)]">Dinner, rideshares, and snacks all reconciled for your group.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-3xl border border-[var(--evenup-border)] bg-[var(--evenup-surface)] p-5">
                    <p className="text-sm text-[var(--evenup-text-muted)]">Paid</p>
                    <p className="mt-3 text-xl font-semibold">$182.40</p>
                  </div>
                  <div className="rounded-3xl border border-[var(--evenup-border)] bg-[var(--evenup-surface)] p-5">
                    <p className="text-sm text-[var(--evenup-text-muted)]">Due</p>
                    <p className="mt-3 text-xl font-semibold">$128.10</p>
                  </div>
                </div>

                <div className="rounded-3xl border border-[var(--evenup-border)] bg-white p-5">
                  <div className="flex items-center justify-between text-sm text-[var(--evenup-text-muted)]">
                    <span>Jane · July 18</span>
                    <span>+ $24.00</span>
                  </div>
                  <p className="mt-3 font-semibold">Groceries split</p>
                  <p className="mt-2 text-sm text-[var(--evenup-text-muted)]">Shared by 4 people. Settled instantly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="border-t border-[var(--evenup-border)] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="section-label">Problem</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Stop letting shared costs slow your plans.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[var(--evenup-text-muted)]">
              When friends, roommates, or travel companions pay upfront, tracking and settling expenses becomes a chore. That uncertainty leads to delayed reimbursements, awkward conversations, and wasted time.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-[28px] border border-[var(--evenup-border)] bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-4 text-[var(--evenup-text-muted)] leading-7">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-[var(--evenup-surface)] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="section-label">Solution</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Everything your group needs to split costs and settle up.
              </h2>
              <p className="mt-6 text-lg leading-8 text-[var(--evenup-text-muted)]">
                Add expenses, assign who paid, choose how to split, and watch balances update automatically. No spreadsheets, no missing receipts, no surprises.
              </p>
            </div>

            <div className="grid gap-6">
              <article className="rounded-[32px] border border-[var(--evenup-border)] bg-white p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--evenup-text-muted)]">Track</p>
                <h3 className="mt-4 text-2xl font-semibold">Capture every expense</h3>
                <p className="mt-3 text-[var(--evenup-text-muted)] leading-7">
                  Log payments instantly, categorize bills, and add notes so your group always knows who paid what.
                </p>
              </article>
              <article className="rounded-[32px] border border-[var(--evenup-border)] bg-white p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--evenup-text-muted)]">Split</p>
                <h3 className="mt-4 text-2xl font-semibold">Split it your way</h3>
                <p className="mt-3 text-[var(--evenup-text-muted)] leading-7">
                  Choose split methods for each expense and let EvenUp handle exact shares for each person.
                </p>
              </article>
              <article className="rounded-[32px] border border-[var(--evenup-border)] bg-white p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--evenup-text-muted)]">Settle</p>
                <h3 className="mt-4 text-2xl font-semibold">Close the loop</h3>
                <p className="mt-3 text-[var(--evenup-text-muted)] leading-7">
                  Review group balances, send settlement reminders, and record reimbursements with a few clicks.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-3">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="rounded-[32px] border border-[var(--evenup-border)] bg-white p-8 shadow-sm">
                <h3 className="text-2xl font-semibold">{useCase.title}</h3>
                <p className="mt-4 text-[var(--evenup-text-muted)] leading-7">{useCase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--evenup-surface)] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="section-label">Testimonials</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              People trust EvenUp to keep their groups balanced.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.name} className="rounded-[36px] border border-[var(--evenup-border)] bg-white p-8 shadow-sm">
                <p className="text-lg leading-8 text-[var(--evenup-text-primary)]">“{testimonial.quote}”</p>
                <footer className="mt-6 text-sm text-[var(--evenup-text-muted)]">
                  <strong className="block font-semibold text-[var(--evenup-text-primary)]">{testimonial.name}</strong>
                  {testimonial.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="section-label">Pricing</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Plans for solo starters and active groups.
            </h2>
            <p className="mt-6 text-lg leading-8 text-[var(--evenup-text-muted)]">
              Start free, and scale when your group needs budget history, advanced summaries, and premium support.
            </p>
          </div>

          <div className="mt-12 grid gap-6 xl:grid-cols-3">
            <div className="rounded-[36px] border border-[var(--evenup-border)] bg-white p-8 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--evenup-text-muted)]">Basic</p>
              <p className="mt-6 text-5xl font-semibold">Free</p>
              <p className="mt-4 text-sm text-[var(--evenup-text-muted)]">Perfect for small groups that need simple shared expense tracking.</p>
              <div className="mt-8 space-y-3 text-left text-[var(--evenup-text-muted)]">
                <p>Unlimited groups</p>
                <p>Automatic balances</p>
                <p>Expense history</p>
              </div>
              <Link href="/signup" className="mt-8 inline-flex w-full justify-center">
                <Button className="w-full rounded-full px-6 py-3">Start free</Button>
              </Link>
            </div>
            <div className="rounded-[36px] border border-[var(--evenup-border)] bg-white p-8 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--evenup-text-muted)]">Pro</p>
              <p className="mt-6 text-5xl font-semibold">$9/mo</p>
              <p className="mt-4 text-sm text-[var(--evenup-text-muted)]">Advanced tools for frequent groups and ongoing shared budgets.</p>
              <div className="mt-8 space-y-3 text-left text-[var(--evenup-text-muted)]">
                <p>Detailed reports</p>
                <p>Advanced split rules</p>
                <p>Priority support</p>
              </div>
              <Link href="/signup" className="mt-8 inline-flex w-full justify-center">
                <Button className="w-full rounded-full px-6 py-3">Choose Pro</Button>
              </Link>
            </div>
            <div className="rounded-[36px] border border-[var(--evenup-border)] bg-white p-8 text-center shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--evenup-text-muted)]">Team</p>
              <p className="mt-6 text-5xl font-semibold">Custom</p>
              <p className="mt-4 text-sm text-[var(--evenup-text-muted)]">Designed for clubs, co-ops, and larger groups with dedicated workflow needs.</p>
              <div className="mt-8 space-y-3 text-left text-[var(--evenup-text-muted)]">
                <p>Group management</p>
                <p>Custom split templates</p>
                <p>Team admin tools</p>
              </div>
              <Link href="/signup" className="mt-8 inline-flex w-full justify-center">
                <Button className="w-full rounded-full px-6 py-3">Contact us</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="bg-[var(--evenup-surface)] px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="section-label">FAQ</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Answers to common questions.
            </h2>
          </div>

          <div className="mt-12 space-y-5">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-[32px] border border-[var(--evenup-border)] bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold">{faq.question}</h3>
                <p className="mt-4 text-[var(--evenup-text-muted)] leading-7">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl rounded-[40px] bg-[var(--evenup-accent-hero)] px-8 py-16 text-white shadow-[0_40px_120px_rgba(15,23,42,0.16)] sm:px-12">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-center">
            <div>
              <p className="section-label text-white/80">Ready to settle up?</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Make group expenses effortless today.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
                Join groups who trust EvenUp to keep every shared expense transparent, fair, and easy to resolve.
              </p>
            </div>
            <div className="flex items-center justify-start gap-4">
              <Link href="/signup">
                <Button className="rounded-full bg-white text-[var(--evenup-accent-hero)] px-8 py-3">Start free</Button>
              </Link>
              <a href="https://github.com/jagdep-singh/EvenUp" target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-semibold text-white/90 underline underline-offset-4">
                Explore the code
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--evenup-border)] bg-[rgba(255,255,255,.95)] px-6 py-10 text-[var(--evenup-text-muted)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="font-semibold text-[var(--evenup-text-primary)]">EvenUp</p>
            <p className="text-sm">Split expenses cleanly with groups, trips, and roommates.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <Link href="/signup" className="hover:text-[var(--evenup-text-primary)]">Sign up</Link>
            <a href="https://github.com/jagdep-singh/EvenUp" target="_blank" rel="noreferrer" className="hover:text-[var(--evenup-text-primary)]">GitHub</a>
            <a href="#faq" className="hover:text-[var(--evenup-text-primary)]">FAQ</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
