import { useState } from 'react';
import { 
  Container, 
  Typography, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText, 
  Button,
  Box
} from '@mui/material';
import { 
  ExpandMore, 
  CheckCircle, 
  Warning, 
  Report, 
  Support, 
  Lightbulb 
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const CyberbullyingGuidelines = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const sections = [
    {
      title: "What is Cyberbullying?",
      icon: <Warning sx={{ color: 'warning.main' }} />,
      content: [
        "Sending harmful or threatening messages",
        "Spreading rumors or lies online",
        "Sharing private information without consent",
        "Excluding someone intentionally from online groups"
      ]
    },
    {
      title: "How to Protect Yourself",
      icon: <Lightbulb sx={{ color: 'info.main' }} />,
      content: [
        "Never share personal information online",
        "Use strong, unique passwords",
        "Adjust privacy settings on social media",
        "Think before you post or share"
      ]
    },
    {
      title: "What to Do If You're Bullied",
      icon: <Support sx={{ color: 'primary.main' }} />,
      content: [
        "Don't respond to the bully",
        "Save evidence of the bullying",
        "Block the bully on all platforms",
        "Report the incident to platform moderators"
      ]
    },
    {
      title: "How to Help Others",
      icon: <CheckCircle sx={{ color: 'success.main' }} />,
      content: [
        "Speak up if you witness bullying",
        "Offer support to the victim",
        "Report bullying when you see it",
        "Promote kindness online"
      ]
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Typography 
          variant="h2" 
          sx={{ 
            fontWeight: 700, 
            mb: 4, 
            textAlign: 'center',
            color: 'primary.main'
          }}
        >
          Cyberbullying Guidelines
        </Typography>
      </motion.div>

      <AnimatePresence>
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
          >
            <Accordion
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{ 
                mb: 2, 
                borderRadius: 3,
                boxShadow: 3,
                '&:hover': { boxShadow: 6 }
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{ bgcolor: 'background.paper' }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {section.icon}
                  <Typography variant="h6" fontWeight={600}>
                    {section.title}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {section.content.map((item, i) => (
                    <ListItem key={i} sx={{ py: 1 }}>
                      <ListItemIcon>
                        <CheckCircle sx={{ color: 'success.main' }} />
                      </ListItemIcon>
                      <ListItemText 
                        primary={item} 
                        primaryTypographyProps={{ variant: 'body1' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        style={{ textAlign: 'center', marginTop: '2rem' }}
      >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Need Immediate Help?
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<Report />}
          sx={{ 
            borderRadius: 50,
            px: 4,
            py: 1.5,
            fontSize: '1.1rem',
            textTransform: 'none'
          }}
        >
          Report Cyberbullying
        </Button>
      </motion.div>
    </Container>
  );
};

export default CyberbullyingGuidelines;