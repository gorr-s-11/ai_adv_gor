import Link from 'next/link';
import './header.css';

export default function Header() {
  return (
    <header className="header">
      <Link href="/" className="logo">
        <span className="logo-mark" aria-hidden="true">📖</span>
        <span>Lumen Tales</span>
      </Link>

      <nav className="nav">
        <Link href="/stories">Stories</Link>
        <Link href="/comics">Comics</Link>
        <Link href="/worlds">Worlds</Link>
        <Link href="/library">Library</Link>
      </nav>

      <button className="sign-in" type="button">Sign in</button>
    </header>
  );
}