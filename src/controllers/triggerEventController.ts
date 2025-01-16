import { Request, Response } from "express";

export const triggerEventController = {
	triggerEvent: async (req: Request, res: Response) => {
		res.status(200).json({ message: "triggerEvent" });
	},
};

