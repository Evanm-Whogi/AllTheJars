export const dynamic = "force-dynamic";

import Hero from '@/components/Hero';
import JarSelector from '@/components/JarSelector';
import { getJars } from "@/lib/actions";

export default async function Home() {
  const initialVersions = await getJars("vanilla"); // Fetch the first category before rendering the page.
  
  return (
    <>
      <section id="hero" className="py-20">
        <Hero />
      </section>

      <section id="jarSelector" className="pb-20">
        <JarSelector initialVersions={initialVersions} />
      </section>

    </>
  );
}
