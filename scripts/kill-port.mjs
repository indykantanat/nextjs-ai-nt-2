// Frees the dev port before `next dev` starts, so a leftover dev server
// doesn't trigger "Another next dev server is already running."
// Runs as the `predev` npm hook. Override the port with PORT=3005 npm run dev.
import { execFileSync } from "node:child_process";

const port = Number(process.env.PORT) || 3000;

function listenerPids() {
  if (process.platform === "win32") {
    const out = execFileSync("netstat", ["-ano", "-p", "TCP"], {
      encoding: "utf8",
    });
    const pids = out
      .split(/\r?\n/)
      .map((line) => line.trim().split(/\s+/))
      // proto, local address, foreign address, state, pid
      .filter(([, local, , , pid]) => local?.endsWith(`:${port}`) && Number(pid) > 0)
      .map(([, , , , pid]) => Number(pid));
    return [...new Set(pids)];
  }

  const out = execFileSync("lsof", ["-ti", `tcp:${port}`, "-sTCP:LISTEN"], {
    encoding: "utf8",
  });
  return [...new Set(out.split(/\s+/).filter(Boolean).map(Number))];
}

let pids = [];
try {
  pids = listenerPids().filter((pid) => pid !== process.pid);
} catch {
  // netstat/lsof missing or nothing bound — nothing to free.
}

for (const pid of pids) {
  try {
    if (process.platform === "win32") {
      // /T kills the process tree, so Next's workers go with it.
      execFileSync("taskkill", ["/PID", String(pid), "/T", "/F"], {
        stdio: "ignore",
      });
    } else {
      process.kill(pid, "SIGKILL");
    }
    console.log(`- Freed port ${port} (killed PID ${pid})`);
  } catch {
    console.warn(`- Could not kill PID ${pid} on port ${port}; continuing.`);
  }
}
