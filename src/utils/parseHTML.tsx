import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import parse, { domToReact } from "html-react-parser";

const parseHTML = ({ html }) => {
  const options = {
    replace: (node) => {
      if (!node.name) return;

      const children = domToReact(node.children, options);

      switch (node.name) {
        // Headings
        case "h1":
          return (
            <Typography variant="h1" gutterBottom>
              {children}
            </Typography>
          );
        case "h2":
          return (
            <Typography variant="h2" gutterBottom>
              {children}
            </Typography>
          );
        case "h3":
          return (
            <Typography variant="h3" gutterBottom>
              {children}
            </Typography>
          );
        case "h4":
          return (
            <Typography variant="h4" gutterBottom>
              {children}
            </Typography>
          );
        case "h5":
          return (
            <Typography variant="h5" gutterBottom>
              {children}
            </Typography>
          );
        case "h6":
          return (
            <Typography variant="h6" gutterBottom>
              {children}
            </Typography>
          );

        // Paragraph
        case "p":
          return (
            <Typography variant="body1" paragraph>
              {children}
            </Typography>
          );

        // Small text
        case "small":
          return (
            <Typography variant="caption" component="span">
              {children}
            </Typography>
          );

        // Bold
        case "strong":
        case "b":
          return (
            <Typography component="span" fontWeight="bold">
              {children}
            </Typography>
          );

        // Italic
        case "em":
        case "i":
          return (
            <Typography component="span" fontStyle="italic">
              {children}
            </Typography>
          );

        // Underline
        case "u":
          return (
            <Typography component="span" sx={{ textDecoration: "underline" }}>
              {children}
            </Typography>
          );

        // Links
        case "a":
          return (
            <Link
              href={node.attribs?.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </Link>
          );

        // Unordered list
        case "ul":
          return (
            <Box component="ul" sx={{ pl: 3 }}>
              {children}
            </Box>
          );

        // Ordered list
        case "ol":
          return (
            <Box component="ol" sx={{ pl: 3 }}>
              {children}
            </Box>
          );

        // List item
        case "li":
          return (
            <Typography component="li" variant="body1">
              {children}
            </Typography>
          );

        // Blockquote
        case "blockquote":
          return (
            <Box
              sx={{
                borderLeft: "4px solid",
                borderColor: "divider",
                pl: 2,
                my: 2,
              }}
            >
              <Typography variant="body1" fontStyle="italic">
                {children}
              </Typography>
            </Box>
          );

        // Line break
        case "br":
          return <br />;

        default:
          return undefined;
      }
    },
  };

  return <Box>{parse(html, options)}</Box>;
};

export default parseHTML;
