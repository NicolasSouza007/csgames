import { GameProps } from "@/utils/types/game";
import { Container } from "@/components/Container";
import { Input } from "@/components/Input";
import { GameCard } from "@/components/GameCard";

async function getData(title: string) {
  const decodeTitle = decodeURI(title);

  try {
    const res = await fetch(
      `${
        process.env.NEXT_API_URL
      }/next-api/?api=game&title=${encodeURIComponent(decodeTitle)}`
    );
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function Search({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;

  const games: GameProps[] = await getData(title);

  return (
    <main className="w-full text-black">
      <Container>
        <Input />
        <h1 className="font-bold text-xl mt-8 mb-5">
          Veja oque encontramos na nossa base:
        </h1>

        {!games && <p className="text-gray-500">Nenhum jogo encontrado</p>}

        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {games && games.map((item) => <GameCard key={item.id} data={item} />)}
        </section>
      </Container>
    </main>
  );
}
