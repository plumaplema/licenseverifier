import { NextApiRequest, NextApiResponse } from "next";
import handler from "./src/pages/api/register";

// Mock the dependencies
jest.mock("@prisma/client", () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => {
      return {
        license: {
          findFirst: jest.fn().mockResolvedValue(null),
          create: jest.fn().mockResolvedValue({ code: 'randomCode', build: 'testBuild' }),
        },
      };
    }),
  };
});

jest.mock("./src/lib/randomcode", () => {
  return {
    generateRandomCode: jest.fn().mockReturnValue('randomCode'),
  };
});

describe("handler", () => {
  let req: NextApiRequest;
  let res: NextApiResponse;

  beforeEach(() => {
    req = {
      method: "POST",
      body: { build: "testBuildgg" },
    } as NextApiRequest;

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new license", async () => {
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ success: true, code: 'randomCode' });
  });
});