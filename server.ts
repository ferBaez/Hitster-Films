import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API routes FIRST
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, project } = req.body;
      
      if (!process.env.RESEND_API_KEY) {
         return res.status(500).json({ error: "Missing RESEND_API_KEY environment variable" });
      }

      const resend = new Resend(process.env.RESEND_API_KEY);

      const data = await resend.emails.send({
        from: 'Contacto Hitster <onboarding@resend.dev>',
        to: ['baez@hitster.page'],
        subject: `Nuevo mensaje de contacto de ${name} via Web`,
        html: `
          <h3>Nuevo mensaje de contacto</h3>
          <p><strong>Nombre:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Mensaje/Proyecto:</strong></p>
          <p>${project}</p>
        `
      });

      res.status(200).json({ success: true, data });
    } catch (error) {
      console.error("Resend Error:", error);
      res.status(500).json({ error: "Hubo un error al enviar el correo" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
