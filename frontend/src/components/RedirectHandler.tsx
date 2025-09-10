import { useEffect } from "react";
import { useParams } from "react-router-dom";
import storage from "../utils/storage";
import logger from "../utils/logger";
import {Log} from '../../../logging-middleware/index';

export default function RedirectHandler() {
  const { shortCode } = useParams<{ shortCode: string }>();

  useEffect(() => {
    if (!shortCode) return;

    const data = storage.getURL(shortCode);
    if (data) {
      Log("frontend", "info", "redirect", `Redirecting to ${data.original} for short code ${shortCode}`);
      logger.info(`Redirecting to ${data.original} for short code ${shortCode}`);
      window.location.href = data.original;
    } else {
      alert("URL not found or expired!");
    }
  }, [shortCode]);

  return <p>Redirecting...</p>;
}
