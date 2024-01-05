import { getDictionary } from "./dictionaries";

export default async function Home({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang);
  return (
    <main>
      <h1>Hello</h1>
    </main>
  );
}
