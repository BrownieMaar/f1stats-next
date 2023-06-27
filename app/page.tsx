import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div>HomePage</div>
      <p>Check ot the <b>
        <Link href="/driver">drivers</Link>
      </b>.</p>

    </div>
  )
}
