import Image from "next/image";
import Link from "next/link";
import { LiaGamepadSolid } from "react-icons/lia";

export function Header() {
  return (
    <header className="w-full h-28 bg-[#c7d5e0] text-black px-2">
      <div className="max-w-screen-xl mx-auto flex justify-center items-center h-28 sm:justify-between">
        <nav className="flex justify-center items-center gap-4">
          <Link href="/">
            <Image
              src="/Logo.png"
              alt="Logo do site CSGAMES"
              quality={100}
              priority={true}
              width={88}
              height={48}
              className="w-full"
            />
          </Link>

          <Link href="/">Games</Link>
          <Link href="/profile">Perfil</Link>
        </nav>

        <div className="hidden sm:flex  justify-center items-center">
          <Link href="/profile">
            <LiaGamepadSolid size={34} color="#171a21"></LiaGamepadSolid>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
