import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Container, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import { getFAQQuestions } from '../../features/customerUser/faqQuestion/faqQuestionSlice';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from 'react-router';
import serviceIllustration from '../../assets/images/fits-services.svg';


// Styled Accordion components to match the design
const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    //   '&:not(:last-child)': {
    //     borderBottom: 0,
    //   },
    '&::before': {
        display: 'none',
    },
    borderRadius: '12px',
    marginBottom: '16px',

}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={props.expanded ?
            <Box sx={{ width: '24px', height: '24px', backgroundColor: '#f46b12', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                <RemoveIcon sx={{ fontSize: 16 }} />
            </Box>
            :
            <Box sx={{ width: '24px', height: '24px', backgroundColor: '#fff1e5', border: '1px solid #ffe0c7', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#df5908' }}>
                <AddIcon sx={{ fontSize: 16 }} />
            </Box>
        }
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: 'white',
    //   flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(0deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    //   padding: '16px 24px',
    borderRadius: '12px',
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: '16px 24px',
    backgroundColor: '#f4f6f9',
    borderTop: '1px solid rgba(23, 54, 93, .08)',
    borderRadius: '0 0 12px 12px',
}));

// Define a custom theme
const theme = createTheme({
    typography: {
        fontFamily: 'Inter, sans-serif',
        h4: {
            fontWeight: 700,
        },
        h6: {
            fontWeight: 600,
        },
        body1: {
            color: '#4B5563',
        },
        body2: {
            color: '#4B5563',
        },
    },
    palette: {
        primary: {
            main: '#17365d',
        },
        secondary: {
            main: '#f46b12',
        },
        divider: '#D1D5DB',
    },
});


function FaqPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const lang = useSelector((state) => state.language.lang);
    const { faqQuestions } = useSelector((state) => state.faqQuestion);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        dispatch(getFAQQuestions());
    }, [dispatch]);


    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: '#f4f6f9',
                    p: { xs: 2, sm: 4, md: 6 },
                    fontFamily: 'Inter, sans-serif',
                }}
            >
                <Container maxWidth="lg" sx={{ py: 6 }}>
                    {/* Top Section */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        mb: 6,
                        p: 4,
                        backgroundColor: '#fff',
                        borderRadius: 4,
                        boxShadow: '0 12px 32px rgba(23,54,93,.06)',
                        // borderRadius: '16px',
                        // boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        gap: 4
                    }}>
                        {/* Text Content */}
                        <Box sx={{ flexGrow: 1, maxWidth: { md: '60%' } }}>
                            <Typography variant="h4" component="h2" sx={{ color: theme.palette.secondary.main, mb: 2 }}>
                                {lang === 'en' ? 'Frequently Asked Questions' : 'အကြွေးဝယ်လျှောက်ထားရာတွင် မေးလေ့ရှိသော မေးခွန်းများ'}
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                {lang === 'en' ? 'Got more questions? Feel free to contact us for more information.' : 'မေးခွန်းများရှိပါသလား? ပိုမိုသိရှိလိုပါက ကျွန်ုပ်တို့အား ဆက်သွယ်ရန် မမေ့ပါနှင့်။'}
                            </Typography>
                            <Button
                                onClick={() => navigate('/contact')}
                                variant="outlined"
                                sx={{
                                    textTransform: 'none',
                                    borderColor: theme.palette.secondary.main,
                                    color: theme.palette.secondary.main,
                                    borderRadius: '8px',
                                    py: 1,
                                    px: 3,
                                    '&:hover': {
                                        borderColor: theme.palette.secondary.main,
                                        backgroundColor: '#fff1e5'
                                    },
                                }}
                            >
                                {lang === "en" ? "Contact us" : "ဆက်သွယ်ရန်"}
                                <Box component="span" sx={{ ml: 1, fontSize: '20px' }}>&rarr;</Box>
                            </Button>
                        </Box>
                        {/* Illustration Image */}
                        <Box sx={{ flexShrink: 0, maxWidth: { xs: '100%', md: '300px' } }}>
                            <img src={serviceIllustration} alt="" style={{ width: '100%', height: 'auto' }} />
                        </Box>
                    </Box>
                    {/* FAQ & Contact Section */}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 4,
                        alignItems: 'flex-start',

                    }}>
                        {/* Left side: FAQ illustration */}
                        <Box sx={{ maxWidth: { md: '50%' }, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img src={serviceIllustration} alt="" style={{ width: '100%', maxWidth: '300px', height: 'auto', objectFit: 'contain' }} />
                        </Box>
                        {/* Right side: FAQ list */}
                        <Box sx={{ flex: 1 }}>
                            {faqQuestions.map((item, index) => (
                                <Accordion
                                    key={index}
                                    expanded={expanded === `panel${index}`}
                                    onChange={handleChange(`panel${index}`)}
                                >
                                    <AccordionSummary
                                        aria-controls={`panel${index}-content`}
                                        id={`panel${index}-header`}
                                        expanded={expanded === `panel${index}`}
                                        style={{ backgroundColor: expanded === `panel${index}` ? '#fff8f1' : 'white' }}
                                    >
                                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{item[`question_${lang}`]}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails >
                                        <List disablePadding>
                                            {item.answers.map((answer, answerIndex) => (
                                                <ListItem key={answerIndex} disableGutters alignItems="flex-start" sx={{ mb: answerIndex < item.answers.length - 1 ? 1.5 : 0 }}>
                                                    <ListItemIcon sx={{ minWidth: 32, }}>
                                                        <FiberManualRecordIcon sx={{ fontSize: 8, color: '#f46b12' }} />
                                                    </ListItemIcon>
                                                    <ListItemText sx={{ borderBottom: answerIndex < item.answers.length - 1 ? '1px solid #e4e9ef' : 'none', pb: answerIndex < item.answers.length - 1 ? 1.5 : 0 }}>
                                                        <Typography variant="body2" sx={{ color: '#4B5563', fontSize: '0.95rem', lineHeight: 1.6 }}>{answer[`answer_${lang}`]}</Typography>
                                                    </ListItemText>
                                                </ListItem>
                                            ))}
                                        </List>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    </Box>
                    {/* Contact Information Section */}
                    <Box
                        sx={{
                            mt: 6,
                            p: 4,
                            backgroundColor: "#17365d",
                            color: "white",
                            borderRadius: 4,
                            display: "flex",
                            flexDirection: "column",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            gap: 4,
                        }}
                    >
                        {/* Hot Line */}
                        <Box sx={{ display: "flex", alignItems: "center", minWidth: "250px" }}>
                            <Box component="span" sx={{ fontSize: "24px", mr: 2 }}>
                                &#128222;
                            </Box>
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {lang === "en" ? "Hot Line:" : "အရေးပေါ်ဖုန်းနံပါတ်"}
                                </Typography>
                                <Typography variant="body2">
                                    +959443734550, +959443734551, +95944373455
                                </Typography>
                            </Box>
                        </Box>

                        {/* Head Office */}
                        <Box sx={{ display: "flex", alignItems: "flex-start", minWidth: "250px" }}>
                            <Box component="span" sx={{ fontSize: "24px", mr: 2, mt: "4px" }}>
                                &#127974;
                            </Box>
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {lang === "en" ? "Head Office:" : "ရုံးချုပ် လိပ်စာ"}
                                </Typography>
                                <Typography variant="body2">
                                    {lang === "en"
                                        ? "No.53, Strand Road, between Bo Son Pat street and 32nd street, Pabedan township, Yangon."
                                        : "အမှတ် (၅၃)၊ စတန်းလမ်း၊ ဗိုလ်စံပတ်လမ်းနှင့် ၃၂ လမ်းကြား၊ ပန်းဘဲတန်းမြို့နယ်၊ ရန်ကုန်။"}
                                </Typography>
                            </Box>
                        </Box>

                        {/* Email Address */}
                        <Box sx={{ display: "flex", alignItems: "center", minWidth: "250px" }}>
                            <Box component="span" sx={{ fontSize: "24px", mr: 2 }}>
                                &#128231;
                            </Box>
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {lang === "en" ? "Email Address:" : "အီးမေးလ်လိပ်စာ"}
                                </Typography>
                                <Typography variant="body2">enquiry@momofinance.com.mm</Typography>
                            </Box>
                        </Box>

                        {/* Business Hour */}
                        <Box sx={{ display: "flex", alignItems: "center", minWidth: "250px" }}>
                            <Box component="span" sx={{ fontSize: "24px", mr: 2 }}>
                                &#128337;
                            </Box>
                            <Box>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                                    {lang === "en" ? "Business Hour:" : "လုပ်ငန်းချိန်"}
                                </Typography>
                                <Typography variant="body2">
                                    {lang === "en"
                                        ? "Monday to Saturday\n8:30 AM to 4:30 PM"
                                        : "တနင်္လာနေ့မှ စနေနေ့အထိ\nနံနက် ၈:၃၀ မှ ညနေ ၄:၃၀ အထိ"}
                                </Typography>
                            </Box>
                        </Box>
                    </Box>


                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default FaqPage;
