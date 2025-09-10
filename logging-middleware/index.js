// logging-middleware/index.js
// given token 
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaGFkNDYyNDNAZ21haWwuY29tIiwiZXhwIjoxNzU3NDkyMDAwLCJpYXQiOjE3NTc0OTExMDAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIxMWMwYThmZS0wNGY1LTRkN2EtOGExYi1lNjI4OWMwYTkwYzAiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzaGFkYWIgYWxpIiwic3ViIjoiOGFlYWZjMzMtNDkyMC00YTA2LTkxMzgtZjVjZmJhYzA2MzVmIn0sImVtYWlsIjoic2hhZDQ2MjQzQGdtYWlsLmNvbSIsIm5hbWUiOiJzaGFkYWIgYWxpIiwicm9sbE5vIjoiMjMwMDkxMDEzOTAxNiIsImFjY2Vzc0NvZGUiOiJOV2t0QnUiLCJjbGllbnRJRCI6IjhhZWFmYzMzLTQ5MjAtNGEwNi05MTM4LWY1Y2ZiYWMwNjM1ZiIsImNsaWVudFNlY3JldCI6InV4WXpHYXNjUmdGc1F2a0QifQ.TH9lJQJIxrJiPyha6WDg_pRsadTLUyzMB9eDrNQXles"
const API_URL = "http://20.244.56.144/evaluation-service/logs";

// Allowed values
const VALID_STACKS = ["frontend"];
const VALID_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const VALID_PACKAGES = [
  "api", "component", "hook", "page", "state", "style",
  "auth", "config", "middleware", "utils" 
];

export async function Log(stack, level, pkg, message) {
  if (!VALID_STACKS.includes(stack)) {
    console.error(`Invalid stack: ${stack}`);
    return;
  }
  if (!VALID_LEVELS.includes(level)) {
    console.error(`Invalid level: ${level}`);
    return;
  }
  if (!VALID_PACKAGES.includes(pkg)) {
    console.error(`Invalid package: ${pkg}`);
    return;
  }

  const payload = { stack, level, package: pkg, message };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error("Failed to send log:", response.status, response.statusText);
      return;
    }

    const data = await response.json();
    console.log("Log created:", data);
    return data;
  } catch (error) {
    console.error("Error sending log:", error);
  }
}