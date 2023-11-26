import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
export default function Home() {
  const logoutHandler = () => {
    signOut();
  };
  const loginHandler = () => {
    signIn("github");
  };
  const { data,status } = useSession();
  console.log(data);

  return (
    <div>
      <h1>Next Auth - Credintails</h1>
      {status === "authenticated" ? (
        <>
          <button>
            <Link href="/dashboard">Dashboard</Link>
          </button>
          <button onClick={logoutHandler}>Sign Out</button>
        </>
      ) : null}
      {status === "unauthenticated" ? (
        <>
          <button>
            <Link href="/signup">Sign Up</Link>
          </button>
          <button>
            <Link href="/signin">Sign In</Link>
          </button>
        </>
      ) : null}
      <button onClick={loginHandler}>Login with GitHub</button>
    </div>
  );
}
