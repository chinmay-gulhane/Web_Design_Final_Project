import MenuAppBar from "../Header/Header";
import Footer from "../Footer/Footer";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MenuAppBar />
      {children}
      <Footer />
    </>
  );
}
