import User from "../models/userModel.js";
import handleAsyncError from "../middlewares/handleAsyncError.js";
import Lead from "../models/leadModel.js";
import sendEmail from "../utils/sendEmail.js";
import dotenv from "dotenv";
dotenv.config();

export const createLead = handleAsyncError(async (req, res) => {
    try {
        const lead = await Lead.create(req.body);
        await sendEmail({
            email: process.env.SMTP_EMAIL,
            subject: "New Lead",
            message: `New lead created: ${lead}`,
        });
        res.status(201).json(lead);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export const updateLead = handleAsyncError(async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export const deleteLead = handleAsyncError(async (req, res) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);
        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export const getLeadById = handleAsyncError(async (req, res) => {
    try {
        const lead = await Lead.findById(req.params.id);
        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export const getLeads = handleAsyncError(async (req, res) => {
    try {
        const leads = await Lead.find();
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});