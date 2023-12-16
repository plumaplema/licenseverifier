import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { generateRandomCode } from "../../lib/randomcode";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { build } = req.query;

    //check if build is already registered
    const buildExists = await prisma.license.findFirst({
      where: {
        build: build as string,
      },
    });

    //if exists, return error
    if (buildExists) {
      return res.status(400).json({
        success: false,
        message: "This build is already registered",
      });
    }

    // Generate a random code
    const code = generateRandomCode();
    
    // Save the license to the database
    await prisma.license.create({
      data: {
        code,
        build: build as string,
        status: false
      },
    });

    res.status(200).json({ success: true, code });
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
