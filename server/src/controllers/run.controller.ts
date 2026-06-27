import { Request, Response } from "express";
import vm from "node:vm";

export const runCode = (req: Request, res: Response) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({
      error: "Code is required.",
    });
  }

  const logs: string[] = [];

  const sandbox = {
    console: {
      log: (...args: unknown[]) => {
        logs.push(args.map(String).join(" "));
      },
    },
  };

  try {
    vm.createContext(sandbox);

    vm.runInContext(code, sandbox, {
      timeout: 3000,
    });

    return res.json({
      output: logs.join("\n"),
    });
  } catch (error) {
    return res.status(400).json({
      error: error instanceof Error ? error.message : "Execution failed.",
    });
  }
};