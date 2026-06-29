// ============================================
// PROSTRUCTURE ENGINEERING LTD
// src/components/layout/Footer/Footer.jsx
// Black footer — 4 columns + dynamic copyright bar
// Col 1: Logo + description + socials
// Col 2: Quick Links
// Col 3: Services
// Col 4: Contact details
// ============================================

import logo from '@assets/images/logo.png'
import navLinks from '@data/navLinks'
import contact, { social } from '@data/contact'
import styles from './Footer.module.css'

// ── Services list (mirrors services data labels) ──────────────
const FOOTER_SERVICES = [
  { label: 'Construction',                  href: '#services' },
  { label: 'Waterproofing & Humidity',      href: '#services' },
  { label: 'Plumbing',                      href: '#services' },
  { label: 'Electrical Installation',       href: '#services' },
  { label: 'Maintenance & Repairing',       href: '#services' },
  { label: 'Supply Services',               href: '#services' },
]

// ── Contact icon components ───────────────────────────────────
function PhoneIcon() {
  return (
    <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  )
}

function MapPinIcon() {
  return (
    <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  )
}

// ── Social icons ──────────────────────────────────────────────
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
    </svg>
  )
}

// ── Footer component ──────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>

      {/* ── Main 4-column area ─────────────── */}
      <div className={styles.main}>

        {/* Col 1: Logo + description + socials */}
        <div className={styles.col}>
          <a href="#home" className={styles.logoWrap} aria-label="Prostructure Engineering — home">
            <img src={logo} alt="Prostructure Engineering Ltd" className={styles.logoImg} />
          </a>
          <p className={styles.description}>
            A professional engineering and construction company delivering reliable, high-quality building solutions across Rwanda — built to last, designed with precision.
          </p>
          <div className={styles.socials} role="list" aria-label="Social media links">
            <a
              href={social.linkedin}
              className={styles.socialBtn}
              aria-label="Prostructure on LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
            >
              <LinkedInIcon />
            </a>
            <a
              href={social.instagram}
              className={styles.socialBtn}
              aria-label="Prostructure on Instagram"
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>

        {/* Col 2: Quick Links */}
        <div className={styles.col}>
          <h3 className={styles.colHeading}>Quick Links</h3>
          <ul className={styles.linkList}>
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={link.href} className={styles.linkItem}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Services */}
        <div className={styles.col}>
          <h3 className={styles.colHeading}>Our Services</h3>
          <ul className={styles.linkList}>
            {FOOTER_SERVICES.map((s) => (
              <li key={s.label}>
                <a href={s.href} className={styles.linkItem}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact */}
        <div className={styles.col}>
          <h3 className={styles.colHeading}>Get In Touch</h3>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <MapPinIcon />
              <span className={styles.contactText}>{contact.address}</span>
            </li>
            <li className={styles.contactItem}>
              <PhoneIcon />
              <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className={styles.contactLink}>
                {contact.phone}
              </a>
            </li>
            <li className={styles.contactItem}>
              <EmailIcon />
              <a href={`mailto:${contact.email}`} className={styles.contactLink}>
                {contact.email}
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* ── Bottom copyright bar ────────────── */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span className={styles.copyright}>
            &copy; {year} Prostructure Engineering Ltd. All rights reserved.
          </span>
          <span className={styles.builtBy}>
            Built by{' '}
            <a
              href="https://brightlink.rw"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.builtByLink}
            >
              BrightLink
            </a>
          </span>
        </div>
      </div>

    </footer>
  )
}