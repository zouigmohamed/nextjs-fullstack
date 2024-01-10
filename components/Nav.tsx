import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";

function Nav() {
  return (
    <nav className="flex items-center justify-between container mt-2">
      <ModeToggle />
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </nav>
  );
}

export default Nav;
