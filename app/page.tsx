import Link from "next/link";
import ClickAwayDemo from "./components/ClickAwayDemo";

export default function Home() {

  return (
    <div>
      <header>
        <Link href="/shiritori">Shiritori</Link>
      </header>
      <ClickAwayDemo />
    </div>
  );
}
