import Reveal from './Reveal'
import { profile } from '../data/content'

export default function About() {
  return (
    <section id="about" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-ice">01 — About</p>
          <h2 className="mb-6 font-display text-2xl font-semibold text-text md:text-3xl">
            Systems-minded, delivery-focused.
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-text-muted">
            {profile.summary} Based in {profile.location}, currently ITIL Foundation and
            Practitioner certified, working toward the ServiceNow CSA. The work spans two
            registers: configuring and automating the ITSM/LMS platforms that keep
            organizations running, and building full-stack applications when the problem calls
            for custom software rather than platform configuration.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
