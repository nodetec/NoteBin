import Editor from "./components/editor/Editor";
import Footer from "./components/footer/Footer";
import RecentNotes from "./components/posts/RecentNotes";

export default function HomePage() {
  return (
    <main className="mx-auto w-full flex-1">
      <RecentNotes />
      <Editor />
      <Footer />
    </main>
  );
}
