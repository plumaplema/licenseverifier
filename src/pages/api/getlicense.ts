
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { build } = req.query;

  try {
    const license = await prisma.license.findFirst({
      where: {
        build: build as string,
      },
    });

    if (!license) {
      return res.status(404).json({ error: 'License not found' });
    }

    return res.status(200).json({ license: license.code, status: license.status  });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
