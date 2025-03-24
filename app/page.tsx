import { Header } from "./components/landing/Header";
import { Hero } from "./components/landing/Hero";


export default function Home() {
  return (
    <div className="w-screen min-h-screen bg-linear-60 from-blue-800 via-red-800 to-orange-400  py-4">
      <Header/>
      <Hero/>
    </div>
  );
}
