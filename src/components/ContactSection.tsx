import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle2, Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, 'El nombre es obligatorio'),
  email: z.string().email('Correo electrónico no válido'),
  project: z.string().min(10, 'Cuéntanos un poco más sobre tu proyecto')
});

type FormData = z.infer<typeof formSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: data.name,
            email: data.email,
            project: data.project,
        })
      });
      
      if (response.ok) {
        setIsSuccess(true);
        reset();
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        alert("Hubo un error al enviar el formulario. Por favor, intenta de nuevo.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Hubo un error al enviar el formulario. Por favor, revisa tu conexión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-hitster-gray relative" id="contact">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm tracking-widest uppercase text-hitster-accent mb-4 font-semibold">Conversemos</h2>
          <h3 className="text-4xl md:text-5xl font-heading text-white">Haz realidad tu visión</h3>
        </div>

        <div className="bg-hitster-dark p-8 md:p-12 rounded-sm border border-gray-800 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center text-center py-16"
              >
                <div className="w-20 h-20 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h4 className="text-2xl font-heading text-white mb-2">¡Mensaje enviado!</h4>
                <p className="text-gray-400">Gracias por contactarnos. Nuestro equipo se comunicará contigo pronto.</p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)} 
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Nombre completo</label>
                    <input 
                      {...register('name')}
                      id="name"
                      type="text" 
                      className={`w-full bg-transparent border-b ${errors.name ? 'border-red-500' : 'border-gray-700'} px-0 py-3 text-white focus:outline-none focus:border-white transition-colors`}
                      placeholder="Ej. Guillermo del Toro"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Correo electrónico</label>
                    <input 
                      {...register('email')}
                      id="email"
                      type="email" 
                      className={`w-full bg-transparent border-b ${errors.email ? 'border-red-500' : 'border-gray-700'} px-0 py-3 text-white focus:outline-none focus:border-white transition-colors`}
                      placeholder="correo@ejemplo.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="project" className="block text-sm font-medium text-gray-400 mb-2">Detalles del proyecto</label>
                  <textarea 
                    {...register('project')}
                    id="project"
                    rows={4}
                    className={`w-full bg-transparent border-b ${errors.project ? 'border-red-500' : 'border-gray-700'} px-0 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none`}
                    placeholder="Describe lo que tienes en mente..."
                  />
                  {errors.project && <p className="text-red-500 text-xs mt-1">{errors.project.message}</p>}
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center gap-2 bg-white text-black px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <><Loader2 size={18} className="animate-spin" /> Enviando...</>
                    ) : (
                      <><Send size={18} className="group-hover:translate-x-1 transition-transform" /> Enviar Mensaje</>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
