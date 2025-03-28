import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body against schema
      const contactData = insertContactSchema.parse(req.body);
      
      // Store the contact request
      const result = await storage.createContactRequest(contactData);
      
      res.status(201).json({
        success: true,
        message: "Contact request submitted successfully",
        id: result.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: validationError.details
        });
      } else {
        console.error("Error submitting contact request:", error);
        res.status(500).json({
          success: false,
          message: "Failed to submit contact request"
        });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
