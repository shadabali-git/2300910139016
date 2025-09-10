import { useEffect, useState } from "react";
import { Container, Typography, List, ListItem } from "@mui/material";
import storage, {type UrlData  } from "../utils/storage";

export default function Statistics() {
  const [urls, setUrls] = useState<UrlData[]>([]);

  useEffect(() => {
    setUrls(storage.getAll());
  }, []);

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>
      <List>
        {urls.map((item, idx) => (
          <ListItem key={idx}>
            {item.original} → {window.location.origin}/{item.shortCode}
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
