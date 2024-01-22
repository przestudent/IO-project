import SearchForm from "@/components/SearchBar/SearchForm";

export default function Home() {
  return (
    <main className="grid min-h-[100vh] w-full content-between bg-gradient-to-br from-amber-400 to-amber-900">
      <div className="pt-20">
        <div>
          <h1 className="text-center text-6xl">Czytnik Sygnatur Akt</h1>
          <h2 className="text-center text-3xl">Dla akt sądów rejonowych.</h2>
        </div>
        <SearchForm></SearchForm>
      </div>
      <footer className="p-4 text-right text-xl  underline">
        <a href="https://pl.wikipedia.org/wiki/Sygnatura_akt">
          Więcej Informacji!
        </a>
      </footer>
    </main>
  );
}
