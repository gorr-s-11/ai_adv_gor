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
        <Link href="/adventures">My Adventures</Link> 
      </nav>
    </header>
  );
}