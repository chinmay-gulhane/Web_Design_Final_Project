"use client";
import MenuAppBar from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import Title from "@/components/Title";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  });

  return (
    <>
      <Title title="Welcome to Husky Bites Application" variant="h1"></Title>
      {/* <h1>Welcome to Husky Bites Application</h1> */}
    </>
  );
}
