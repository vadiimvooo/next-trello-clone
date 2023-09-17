import {Header} from "@/components/Header";
import 'tailwindcss/tailwind.css';
import {Board} from "@/components/Board";

export default function Home() {
  return (
    <main>
      {/*Header*/}
        <Header />
      {/*Board*/}
        <Board />
    </main>
  )
}

