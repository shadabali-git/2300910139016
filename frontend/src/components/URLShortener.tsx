import { useState } from "react";
import {
    TextField,
    Button,
    Container,
    Typography,
    Card,
    CardContent,
    Box,
} from "@mui/material";
import { validateURL, generateShortCode } from "../utils/urlUtils";
import storage from "../utils/storage";
import logger from "../utils/logger";
import { Link } from "react-router-dom";

export default function URLShortener() {
    const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");

    const handleShorten = () => {
        if (!validateURL(url)) { alert("Invalid URL"); return; }
        const shortCode = generateShortCode();
        const data = { original: url, shortCode, createdAt: Date.now() };
        storage.saveURL(shortCode, data);
        logger.info(`Shortened URL: ${url} -> ${shortCode}`);
        setShortUrl(`${window.location.origin}/${shortCode}`);
    };

    return (
        <Container
            maxWidth="sm"
            sx={{ display: "flex", justifyContent: "center", mt: 6 }}
        >
            <Card sx={{ width: "100%", p: 2, boxShadow: 3, borderRadius: 3 }}>
                <CardContent>
                    <Typography
                        variant="h4"
                        align="center"
                        gutterBottom
                        sx={{ fontWeight: "bold", color: "primary.main" }}
                    >
                         URL Shortener
                    </Typography>

                    <Box display="flex" gap={2} mt={2}>
                        <TextField
                            fullWidth
                            label="Enter a long URL"
                            variant="outlined"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleShorten}
                            sx={{ minWidth: "120px" }}
                        >
                            Shorten
                        </Button>
                    </Box>

                    {shortUrl && (
                        <Box mt={3} textAlign="center">
                            <Typography variant="h6" sx={{ fontWeight: 500 }}>
                                Your Shortened URL:
                            </Typography>
                            <Typography variant="body1" color="secondary">
                                <a
                                    href={shortUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: "none", color: "#1976d2" }}
                                >
                                    {shortUrl}
                                </a>
                            </Typography>
                        </Box>
                    )}
                </CardContent>
            </Card>
            <div>
                <Link to="/stats" style={{ textDecoration: "none" }}>
                    Go to stats
                </Link>
            </div>
        </Container>
    );
}
