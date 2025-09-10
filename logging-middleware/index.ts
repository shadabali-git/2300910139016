const TOKEN: string =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaGFkNDYyNDNAZ21haWwuY29tIiwiZXhwIjoxNzU3NDk0MDg2LCJpYXQiOjE3NTc0OTMxODYsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI1NmQ1MzFlMC1jYjM0LTQ1MzAtYTcwZC1lYWUxNjFmYTcxZTkiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzaGFkYWIgYWxpIiwic3ViIjoiOGFlYWZjMzMtNDkyMC00YTA2LTkxMzgtZjVjZmJhYzA2MzVmIn0sImVtYWlsIjoic2hhZDQ2MjQzQGdtYWlsLmNvbSIsIm5hbWUiOiJzaGFkYWIgYWxpIiwicm9sbE5vIjoiMjMwMDkxMDEzOTAxNiIsImFjY2Vzc0NvZGUiOiJOV2t0QnUiLCJjbGllbnRJRCI6IjhhZWFmYzMzLTQ5MjAtNGEwNi05MTM4LWY1Y2ZiYWMwNjM1ZiIsImNsaWVudFNlY3JldCI6InV4WXpHYXNjUmdGc1F2a0QifQ.9QjAQNhu4Y4jAPs02Ls7or64i4IJqraS9chnSlxdnY4";

const API_URL: string = "http://20.244.56.144/evaluation-service/logs";

const VALID_STACKS = ["frontend"] as const;
const VALID_LEVELS = ["debug", "info", "warn", "error", "fatal"] as const;
const VALID_PACKAGES = [
  "api",
  "component",
  "hook",
  "page",
  "state",
  "style",
  "auth",
  "config",
  "middleware",
  "utils",
] as const;

// Define strict types
type Stack = typeof VALID_STACKS[number];
type Level = typeof VALID_LEVELS[number];
type Package = typeof VALID_PACKAGES[number];

interface LogPayload {
  stack: Stack;
  level: Level;
  package: Package;
  message: string;
}

export async function Log(
  stack: string,
  level: string,
  pkg: string,
  message: string
): Promise<any | void> {
  if (!VALID_STACKS.includes(stack as Stack)) {
    console.error(`Invalid stack: ${stack}`);
    return;
  }
  if (!VALID_LEVELS.includes(level as Level)) {
    console.error(`Invalid level: ${level}`);
    return;
  }
  if (!VALID_PACKAGES.includes(pkg as Package)) {
    console.error(`Invalid package: ${pkg}`);
    return;
  }

  const payload: LogPayload = { stack: stack as Stack, level: level as Level, package: pkg as Package, message };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Log created:", data);
    return data;
  } catch (error: any) {
    console.error("Failed to send log:", error.message ?? error);
  }
}

// Example test call
Log("frontend", "info", "api", "This is a test log message.");
