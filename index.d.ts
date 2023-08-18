function dumpSymbolsSync(filePath: string, cb: (e: Error, b: Buffer) => void): void;
function dumpSymbols(filePath: string): Promise<Buffer>;
