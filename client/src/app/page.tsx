"use client";
import Layout from "@/components/Layout/Layout";
import Title from "@/components/Title";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login")
  })

  return (
    <>
      <Layout>

      <Title title="Welcome to Husky Bites Application" variant="h1"></Title>
      {/* <h1>Welcome to Husky Bites Application</h1> */}
      </Layout>
    </>
  );
}
