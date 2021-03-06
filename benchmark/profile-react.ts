#!/usr/bin/env node
import * as sucrase from "../src/index";
import {loadReactFiles} from "./loadReactFiles";

async function main(): Promise<void> {
  console.log(
    `Profiling Sucrase on the React codebase. Make sure you have Chrome DevTools for Node open.`,
  );
  const reactFiles = await loadReactFiles();
  // tslint:disable-next-line no-any
  (console as any).profile("Sucrase React");
  for (const {code, path} of reactFiles) {
    sucrase.transform(code, {
      transforms: ["jsx", "imports", "flow"],
      filePath: path,
    });
  }
  // tslint:disable-next-line no-any
  (console as any).profileEnd("Sucrase React");
}

if (require.main === module) {
  main().catch((e) => {
    console.error(e);
    process.exitCode = 1;
  });
}
