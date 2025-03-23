import { Header } from "./components/landing/Header";
import { Hero } from "./components/landing/Hero";


export default function Home() {
  return (
    <div className="w-screen min-h-screen bg-radial-[at_50%_75%] from-secondary via-zinc-800 to-primary to-90% py-4">
      <Header/>
      <Hero/>
    </div>
  );
}
