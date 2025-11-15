import Hero from '@/components/Hero';
import Apidoc from '@/components/Apidoc'

export default async function apidoc() {
    return (
    <>
      <section id="hero" className="py-20">
        <Hero />
      </section>
      
      <section id="apidoc" className="py-20">
        <Apidoc />
      </section>
    </>
    )
}