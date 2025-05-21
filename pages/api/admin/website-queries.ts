import { NextApiRequest,NextApiResponse } from "next";
import userQueries from "../../../models/User_Queries"; // adjust path as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const queries = await userQueries.findAll({
      attributes: ["id", "fullName", "contactNo", "emailId", "query", "createdAt", "updatedAt"],
    });

    return res.status(200).json({ queries });
  } catch (error) {
    console.error("Failed to fetch queries:", error);
    return res.status(500).json({ message: "Server error..." });
  }
 
}