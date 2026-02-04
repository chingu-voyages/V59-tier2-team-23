import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
export default function Acordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">
            Database tables on supabase click to see
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <img src="/schema.png" />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
