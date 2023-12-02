<<<<<<< Updated upstream
=======
"use client";

import Title from "@/components/Title";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

>>>>>>> Stashed changes
import Title from "@/components/Title";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return (
    <>
      <Title title="Welcome to Husky Bites Application" variant="h1"></Title>
      {/* <h1>Welcome to Husky Bites Application</h1> */}
    </>
  );
}
