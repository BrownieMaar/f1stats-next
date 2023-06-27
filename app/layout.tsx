import './globals.css'
import Link from 'next/link'
import styles from "./layout.module.css"

export const metadata = {
  title: 'F1 Stats',
  description: 'An application for viewing F1 statistics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <header className={styles.header}>
          <F1Logo />
          <Link className={styles.link} href={"/constructor"}>Constructors</Link>
          <Link className={styles.link} href={"/driver"}>Drivers</Link>
          <Link className={styles.link} href={"/season"}>Seasons</Link>
        </header>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}


function F1Logo() {
  return <Link href={"/"}>
    <div style={{ paddingInline: 16 }}>
      <img src={"/f1_logo.svg"} alt="F1 Logo" height={20} /><span className="f1wide" style={{ fontSize: 27 }}><b>Stats</b></span>
    </div>
  </Link>
}