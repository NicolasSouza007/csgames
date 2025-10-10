import { GameProps } from "@/utils/types/game";
import { redirect } from "next/navigation";
import { Container } from "@/components/Container";
import { Label } from "./components/label/page";
import { GameCard } from "@/components/GameCard";
import Image from "next/image";
import { Metadata } from "next";

interface PropsParams {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PropsParams): Promise<Metadata> {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`,
      { next: { revalidate: 60 } }
    );

    const data = await res.json();

    return {
      title: `${data.title} | CSGames`,
      description:
        data.description || "Descubra jogos incríveis para se divertir.",
    };
  } catch (error) {
    return {
      title: "CSGames = Descubra jogos incríveis para se divertir",
      description: "Erro ao carregar informações do jogo.",
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
          nocache: true,
        },
      },
    };
  }
}

async function getData(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`,
      { next: { revalidate: 60 } }
    );
    return res.json();
  } catch (error) {
    throw new Error("Erro ao buscar jogo");
  }
}

async function getGameSorted() {
  try {
    const res = await fetch(
      `${process.env.NEXT_API_URL}/next-api/?api=game_day`,
      { cache: "no-store" }
    );
    return res.json();
  } catch (error) {
    throw new Error("Erro ao buscar Jogo recomendado");
  }
}

export default async function Game({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data: GameProps = await getData(id);
  if (!data) {
    redirect("/");
  }

  const sortedGame: GameProps = await getGameSorted();

  return (
    <main className="w-full text-black">
      <div className=" bg-black h-80 sm:h-96  w-full relative">
        <Image
          className="max-h-96 object-cover rounded-lg opacity-75  h-80 sm:h-96 hover:opacity-100 transition-all duration-300  "
          src={data.image_url}
          alt={data.title}
          priority={true}
          fill={true}
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
        />
      </div>
      <Container>
        <h1 className="font-bold text-xl my-4">{data.title}</h1>
        <p className="">{data.description}</p>
        <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
        <div className="flex flex-wrap gap-2">
          {data.platforms.map((item) => (
            <Label name={item} key={item} />
          ))}
        </div>

        <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
        <div className="flex flex-wrap gap-2">
          {data.categories.map((item) => (
            <Label name={item} key={item} />
          ))}
        </div>

        <p className="mt-7 mb-2">
          <strong>Data de Lançamento:</strong>
          {data.release}
        </p>

        <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado:</h2>
        <div className="flex">
          <div className="flex-grow">
            <GameCard data={sortedGame} />
          </div>
        </div>
      </Container>
    </main>
  );
}
