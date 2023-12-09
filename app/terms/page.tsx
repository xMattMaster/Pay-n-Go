"use client"
import * as React from 'react';
import { Theme } from '@mui/material/styles';
import { SxProps } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import AppBar from './../components/appbar';
import Footer from './../components/footer'
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { TaskAlt, Speed, SavingsOutlined, Padding } from '@mui/icons-material';
import { ThemeProvider } from '@mui/material/styles';
import { getDesignTokens } from './../theme';


const prosItem: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

export default function Home() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <ThemeProvider theme={getDesignTokens(prefersDarkMode ? 'dark' : 'light')}>
      <CssBaseline />
      <Grid container spacing={2} disableEqualOverflow>
        <Grid xs={12}>
          {AppBar()}
        </Grid>

        <Grid xs={12}>
            <Box sx={{ m: 4 }}>
                <Typography component="h3" variant="h3" color="inherit">
                    {'Terms and Conditions'}
                </Typography>
                <Typography variant="h5" gutterBottom>
                    {'Last updated: December 7, 2023'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'Please read these terms and conditions carefully before using Our Service.'}
                </Typography>
                <Typography variant="h5" sx={{ my: 2 }} gutterBottom>
                    {'Interpretation and Definitions'}
                </Typography>
                <Typography variant="h6">
                    {'Interpretation'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'The words of which the initial letter is capitalized have meanings defined '}
                    {'under the following conditions. The following definitions shall have the '}
                    {'same meaning regardless of whether they appear in singular or in plural.'}
                </Typography>
                <Typography variant="h6">
                    {'Definitions'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'For the purposes of these Terms and Conditions:'}
                </Typography>
                <ul style={{ listStyleType: "circle", paddingLeft: 40 }}>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            <strong>{'Affiliate'}</strong>
                            {' means an entity that controls, is controlled '}
                            {'by or is under common control with a party, where "control" means '}
                            {'ownership of 50% or more of the shares, equity interest or other '}
                            {'securities entitled to vote for election of directors or other managing '}
                            {'authority.'}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            <strong>{'Country'}</strong>
                            {' refers to: Italy.'}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            <strong>{'Company'}</strong>
                            {' (referred to as either "the Company", "We", '}
                            {'"Us" or "Our" in this Agreement) refers to Pay n\' Go.'}
                        </Typography>
                    </li>    
                    <li>    
                        <Typography variant="body1" gutterBottom>
                            <strong>{'Device'}</strong>
                            {' means any device that can access the Service '}
                            {'such as a computer, a cellphone or a digital tablet.'}
                        </Typography>
                    </li>
                    <li>                        
                        <Typography variant="body1" gutterBottom>
                            <strong>{'Service'}</strong>
                            {' refers to the Website.'}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            <strong>{'Terms and Conditions'}</strong>
                            {' (also referred as "Terms") mean '}
                            {'these Terms and Conditions that form the entire agreement between You '}
                            {'and the Company regarding the use of the Service.'}
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            <strong>{'Third-party Social Media Service'}</strong>
                            {' means any services or content (including data, information, products '}
                            {'or services) provided by a third-party that may be displayed, included '}
                            {'or made available by the Service.'}
                        </Typography>
                    </li>
                    <li>    
                        <Typography variant="body1" gutterBottom>
                            <strong>{'Website'}</strong>
                            {' refers to Pay n\' Go, accessible from '}
                            <Link href="https://basidati.netsons.org" rel="describes">{'https://basidati.netsons.org'}</Link>
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            <strong>{'You'}</strong>
                            {' means the individual accessing or using the '}
                            {'Service, or the company, or other legal entity on behalf of which such '}
                            {'individual is accessing or using the Service, as applicable.'}
                        </Typography>
                    </li>
                </ul>
                <Typography variant="h5" sx={{ my: 2 }} gutterBottom>
                    {'Acknowledgment'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'These are the Terms and Conditions governing the use of this Service and the '}
                    {'agreement that operates between You and the Company. These Terms and '}
                    {'Conditions set out the rights and obligations of all users regarding the use '}
                    {'of the Service.'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'Your access to and use of the Service is conditioned on Your acceptance of '}
                    {'and compliance with these Terms and Conditions. These Terms and Conditions '}
                    {'apply to all visitors, users and others who access or use the Service.'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'By accessing or using the Service You agree to be bound by these Terms and '}
                    {'Conditions. If You disagree with any part of these Terms and Conditions then '}
                    {'You may not access the Service.'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'You represent that you are over the age of 18. The Company does not permit '}
                    {'those under 18 to use the Service.'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'Your access to and use of the Service is also conditioned on Your acceptance '}
                    {'of and compliance with the Privacy Policy of the Company. Our Privacy Policy '}
                    {'describes Our policies and procedures on the collection, use and disclosure '}
                    {'of Your personal information when You use the Application or the Website and '}
                    {'tells You about Your privacy rights and how the law protects You. Please '}
                    {'read Our Privacy Policy carefully before using Our Service.'}
                </Typography>
                <Typography variant="h5" sx={{ my: 2 }} gutterBottom>
                    {'Links to Other Websites'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'Our Service may contain links to third-party web sites or services that are '}
                    {'not owned or controlled by the Company.'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'The Company has no control over, and assumes no responsibility for, the '}
                    {'content, privacy policies, or practices of any third party web sites or '}
                    {'services. You further acknowledge and agree that the Company shall not be '}
                    {'responsible or liable, directly or indirectly, for any damage or loss caused '}
                    {'or alleged to be caused by or in connection with the use of or reliance on '}
                    {'any such content, goods or services available on or through any such web '}
                    {'sites or services.'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'We strongly advise You to read the terms and conditions and privacy policies '}
                    {'of any third-party web sites or services that You visit.'}
                </Typography>
                <Typography variant="h5" sx={{ my: 2 }} gutterBottom>
                    {'Termination'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'We may terminate or suspend Your access immediately, without prior notice or '}
                    {'liability, for any reason whatsoever, including without limitation if You '}
                    {'breach these Terms and Conditions.'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'Upon termination, Your right to use the Service will cease immediately.'}
                </Typography>
                <Typography variant="h5" sx={{ my: 2 }} gutterBottom>
                    {'Limitation of Liability'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'Notwithstanding any damages that You might incur, the entire liability of '}
                    {'the Company and any of its suppliers under any provision of this Terms and '}
                    {'Your exclusive remedy for all of the foregoing shall be limited to the '}
                    {'amount actually paid by You through the Service or 0 Euros if You haven\'t '}
                    {'purchased anything through the Service.'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'To the maximum extent permitted by applicable law, in no event shall the '}
                    {'Company or its suppliers be liable for any special, incidental, indirect, or '}
                    {'consequential damages whatsoever (including, but not limited to, damages for '}
                    {'loss of profits, loss of data or other information, for business '}
                    {'interruption, for personal injury, loss of privacy arising out of or in any '}
                    {'way related to the use of or inability to use the Service, third-party '}
                    {'software and/or third-party hardware used with the Service, or otherwise in '}
                    {'connection with any provision of this Terms), even if the Company or any '}
                    {'supplier has been advised of the possibility of such damages and even if the '}
                    {'remedy fails of its essential purpose.'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'Some states do not allow the exclusion of implied warranties or limitation '}
                    {'of liability for incidental or consequential damages, which means that some '}
                    {'of the above limitations may not apply. In these states, each party\'s '}
                    {'liability will be limited to the greatest extent permitted by law.'}
                </Typography>
                <Typography variant="h5" sx={{ my: 2 }} gutterBottom>
                    {'Account, password and security'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'Our Service requires you to open an account, you must complete the registration '}
                    {'process by providing us with adequate information as prompted by the registration '}
                    {'form. This information must not be private or contain personal information, since '}
                    {'it will not be protected by any particoular means of defence. You also will choose '}
                    {'a password and a user name, both of which must meet the previous criteria, since '}
                    {'they will be stored in plain text in a database for educational purposes only. '}
                    {'You are entirely responsible for providing us with private information or real '}
                    {'security information linked to one or more of your personal accounts. You agree '}
                    {'to notify Us immediately of any registration mistakenly made with real credentials. '}
                    {'We will not be liable for any loss that you may incur as a result of someone '}
                    {'else using your password or account, either with or without your knowledge.'}
                </Typography>
                <Typography variant="h5" sx={{ my: 2 }} gutterBottom>
                    {'Database enrichment'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'It is permitted to publish material on the site, provided that it does not contain '}
                    {'any personal information and the content is not unlawful (i.e. obscene, abusive, '}
                    {'threatening, defamatory, does not violate privacy, intellectual property rights '}
                    {'or is not otherwise offensive to Us and/or third parties or objectionable and is '}
                    {'not or does not contain viruses, political propaganda, commercial solicitation, '}
                    {'chain letters, mass e-mail or any other form of spamming). We reserve the right '}
                    {'(but have no obligation to act) to remove or edit any such content. If you believe '}
                    {'that any content contains a defamatory statement or that your intellectual property '}
                    {'right has been violated by information on the site, please contact us.'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'If you decide to post any content on the site, you grant Us (i) a non-exclusive, '}
                    {'royalty-free license to use, reproduce, publish, make available, translate and '}
                    {'modify such content throughout the world (including the right to sub-license to '}
                    {'third parties) and (ii) the right to use the name you use in connection with such '}
                    {'content. Your moral copyright rights are reserved. You may delete your content from '}
                    {'public viewing at any time.'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'You declare and guarantee that you have, personally or otherwise, the ownership '}
                    {'or in any case the availability of all rights relating to the content of what you '}
                    {'publish; that the use of the content and materials you provide does not contain '}
                    {'your or third parties\' personal information, and that such use does not cause '}
                    {'harm to third parties. You undertake to hold Pay n\' Go harmless from all legal '}
                    {'actions brought by third parties against Pay n\' Go, arising out of or in any way '}
                    {'connected with the content and materials provided by you.'}
                </Typography>
                <Typography variant="h5" sx={{ my: 2 }} gutterBottom>
                    {'"AS IS" and "AS AVAILABLE" Disclaimer'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'The Service is provided to You "AS IS" and "AS AVAILABLE" and with all '}
                    {'faults and defects without warranty of any kind. To the maximum extent '}
                    {'permitted under applicable law, the Company, on its own behalf and on behalf '}
                    {'of its Affiliates and its and their respective licensors and service '}
                    {'providers, expressly disclaims all warranties, whether express, implied, '}
                    {'statutory or otherwise, with respect to the Service, including all implied '}
                    {'warranties of merchantability, fitness for a particular purpose, title and '}
                    {'non-infringement, and warranties that may arise out of course of dealing, '}
                    {'course of performance, usage or trade practice. Without limitation to the '}
                    {'foregoing, the Company provides no warranty or undertaking, and makes no '}
                    {'representation of any kind that the Service will meet Your requirements, '}
                    {'achieve any intended results, be compatible or work with any other software, '}
                    {'applications, systems or services, operate without interruption, meet any '}
                    {'performance or reliability standards or be error free or that any errors or '}
                    {'defects can or will be corrected.'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'Without limiting the foregoing, neither the Company nor any of the company\'s '}
                    {'provider makes any representation or warranty of any kind, express or '}
                    {'implied: (i) as to the operation or availability of the Service, or the '}
                    {'information, content, and materials or products included thereon; (ii) that '}
                    {'the Service will be uninterrupted or error-free; (iii) as to the accuracy, '}
                    {'reliability, or currency of any information or content provided through the '}
                    {'Service; or (iv) that the Service, its servers, the content, or e-mails sent '}
                    {'from or on behalf of the Company are free of viruses, scripts, trojan '}
                    {'horses, worms, malware, timebombs or other harmful components.'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'Some jurisdictions do not allow the exclusion of certain types of warranties '}
                    {'or limitations on applicable statutory rights of a consumer, so some or all '}
                    {'of the above exclusions and limitations may not apply to You. But in such a '}
                    {'case the exclusions and limitations set forth in this section shall be '}
                    {'applied to the greatest extent enforceable under applicable law.'}
                </Typography>
                <Typography variant="h5" sx={{ my: 2 }} gutterBottom>
                    {'Governing Law'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'The laws of the Country, excluding its conflicts of law rules, shall govern '}
                    {'this Terms and Your use of the Service. Your use of the Application may also '}
                    {'be subject to other local, state, national, or international laws.'}
                </Typography>
                <Typography variant="h5" sx={{ my: 2 }} gutterBottom>
                    {'Disputes Resolution'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'If You have any concern or dispute about the Service, You agree to first try '}
                    {'to resolve the dispute informally by contacting the Company.'}
                </Typography>
                <Typography variant="h5" sx={{ my: 2 }} gutterBottom>
                    {'For European Union (EU) Users'}
                </Typography>
                <Typography variant="body1"gutterBottom>
                    {'If You are a European Union consumer, you will benefit from any mandatory '}
                    {'provisions of the law of the country in which you are resident in.'}
                </Typography>
                <Typography variant="h5" sx={{ my: 2 }} gutterBottom>
                    {'United States Legal Compliance'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'You represent and warrant that (i) You are not located in a country that is '}
                    {'subject to the United States government embargo, or that has been designated '}
                    {'by the United States government as a "terrorist supporting" country, and '}
                    {'(ii) You are not listed on any United States government list of prohibited '}
                    {'or restricted parties.'}
                </Typography>
                <Typography variant="h5" sx={{ my: 2 }} gutterBottom>
                    {'Severability and Waiver'}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    {'Severability'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'If any provision of these Terms is held to be unenforceable or invalid, such '}
                    {'provision will be changed and interpreted to accomplish the objectives of '}
                    {'such provision to the greatest extent possible under applicable law and the '}
                    {'remaining provisions will continue in full force and effect.'}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    {'Waiver'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'Except as provided herein, the failure to exercise a right or to require '}
                    {'performance of an obligation under these Terms shall not effect a party\'s '}
                    {'ability to exercise such right or require such performance at any time '}
                    {'thereafter nor shall the waiver of a breach constitute a waiver of any '}
                    {'subsequent breach.'}
                </Typography>
                <Typography variant="h5" sx={{ my: 2 }} gutterBottom>
                    {'Translation Interpretation'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'These Terms and Conditions may have been translated if We have made them '}
                    {'available to You on our Service. You agree that the original English text '}
                    {'shall prevail in the case of a dispute.'}
                </Typography>
                <Typography variant="h5" sx={{ my: 2 }} gutterBottom>
                    {'Changes to These Terms and Conditions'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'We reserve the right, at Our sole discretion, to modify or replace these '}
                    {'Terms at any time. If a revision is material We will make reasonable efforts '}
                    {'to provide at least 30 days\' notice prior to any new terms taking effect. '}
                    {'What constitutes a material change will be determined at Our sole '}
                    {'discretion.'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'By continuing to access or use Our Service after those revisions become '}
                    {'effective, You agree to be bound by the revised terms. If You do not agree '}
                    {'to the new terms, in whole or in part, please stop using the website and the '}
                    {'Service.'}
                </Typography>
                <Typography variant="h5" sx={{ my: 2 }} gutterBottom>
                    {'Contact Us'}
                </Typography>
                <Typography variant="body1" gutterBottom>
                    {'If you have any questions about these Terms and Conditions, You can contact '}
                    {'us:'}
                </Typography>
                <ul style={{ listStyleType: "circle", paddingLeft: 40 }}>
                    <li>
                        <Typography variant="body1" gutterBottom>
                            {'By email: '}
                            <Link href="mailto:68701124+xMattMaster@users.noreply.github.com" rel="author">
                                {'68701124+xMattMaster@users.noreply.github.com'}
                            </Link>
                        </Typography>
                    </li>
                </ul>
            </Box>
        </Grid>

        <Grid xs={12}>
          {Footer()}
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
