import { motion } from 'motion/react';

export function ImpactSection() {
  return (
    <section className="py-32 px-6 md:px-12 bg-hitster-dark relative z-30">
      <div className="max-w-4xl mx-auto">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-2xl md:text-4xl lg:text-5xl font-heading font-medium leading-tight md:leading-snug text-gray-200 text-justify"
        >
          <span className="text-white block mb-6">Creamos imágenes que trascienden.</span>
          <span className="text-gray-400">Nos dedicamos a la producción audiovisual de alto nivel. Lo que nos hace diferentes es el <strong className="text-white font-normal">talento inigualable de nuestros directores</strong>, visionarios que transforman cada encuadre en una obra de arte.</span>
        </motion.p>
      </div>
    </section>
  );
}
