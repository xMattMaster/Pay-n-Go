import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { IubendaProvider, IubendaCookieSolutionBannerConfigInterface } from '@mep-agency/next-iubenda'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Pay n' Go",
  description: "On your way to success"
}

const iubendaBannerConfig: IubendaCookieSolutionBannerConfigInterface = {
  siteId: 3357361,
  cookiePolicyId: 32137593,
  lang: 'it',
  countryDetection: true,
  enableGdpr: true,
  gdprAppliesGlobally: true,
  perPurposeConsent: true,
  enableUspr: true,
  enableLgpd: true,
  lgpdAppliesGlobally: false,
  askConsentAtCookiePolicyUpdate: true,
  floatingPreferencesButtonDisplay: 'bottom-right',
  privacyPolicyUrl: 'https://www.iubenda.com/privacy-policy/32137593',
  whitelabel: false,
  banner:{
    acceptButtonDisplay: true,
    rejectButtonDisplay :true,
    closeButtonDisplay: false,
    //continueWithoutAcceptingButtonDisplay: true,
    explicitWithdrawal :true,
    customizeButtonDisplay :true,
    listPurposes: true,
    showPurposesToggles: true,
    logo: 'https://basidati.netsons.org/logo_name_dark.svg',
    position: 'float-bottom-center',
    backgroundOverlay: true,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        <IubendaProvider bannerConfig={iubendaBannerConfig}>
          {children}
        </IubendaProvider>
        <Script key="iubenda_autoblocking" src={`//cs.iubenda.com/autoblocking/3357361.js`} type="text/javascript" />
      </body>
    </html>
  )
}