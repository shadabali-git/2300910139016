import axios from 'axios';

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzaGFkNDYyNDNAZ21haWwuY29tIiwiZXhwIjoxNzU3NDk0MDg2LCJpYXQiOjE3NTc0OTMxODYsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI1NmQ1MzFlMC1jYjM0LTQ1MzAtYTcwZC1lYWUxNjFmYTcxZTkiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzaGFkYWIgYWxpIiwic3ViIjoiOGFlYWZjMzMtNDkyMC00YTA2LTkxMzgtZjVjZmJhYzA2MzVmIn0sImVtYWlsIjoic2hhZDQ2MjQzQGdtYWlsLmNvbSIsIm5hbWUiOiJzaGFkYWIgYWxpIiwicm9sbE5vIjoiMjMwMDkxMDEzOTAxNiIsImFjY2Vzc0NvZGUiOiJOV2t0QnUiLCJjbGllbnRJRCI6IjhhZWFmYzMzLTQ5MjAtNGEwNi05MTM4LWY1Y2ZiYWMwNjM1ZiIsImNsaWVudFNlY3JldCI6InV4WXpHYXNjUmdGc1F2a0QifQ.9QjAQNhu4Y4jAPs02Ls7or64i4IJqraS9chnSlxdnY4";
const API_URL = "http://20.244.56.144/evaluation-service/logs";

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
    const response = await axios.post(API_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${TOKEN}`
      }
    });

    console.log("Log created:", response.data);
    return response.data;

  } catch (error) {
    if (error.response) {
      // Server responded with a status other than 2xx
      console.error("Failed to send log:", error.response.status, error.response.data);
    } else if (error.request) {
      // No response received
      console.error("No response received:", error.request);
    } else {
      // Other errors
      console.error("Error setting up request:", error.message);
    }
  }
}
// test the function
Log("frontend", "info", "api", "This is a test log message.");
