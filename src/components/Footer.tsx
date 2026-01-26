import { Contributors, ResourceLinks } from "../components";

export default function Footer() {
  return (
    <footer className="gap-4 p-6 bg-gray-800 mt-auto text-white">
      <h2 className="mb-2 flex justify-center text-2xl">Meet our Team</h2>
      <Contributors />
      <ResourceLinks />
    </footer>
  );
}
