import "../../public/assets/scss/app.scss";
import { dir } from "i18next";
import { I18nProvider } from "./i18n/i18n-context";
import { detectLanguage } from "./i18n/server";
import { GoogleAnalytics } from "@next/third-parties/google";
import LanguageProvider from "@/helper/languageContext/LanguageProvider";
import { Public_Sans, Poppins } from 'next/font/google';
import Script from "next/script";

const publicSans = Public_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--public-sans',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--poppins',
});

export async function generateMetadata() {
  // fetch data
  const themeOption = await fetch(`${process.env.URL}/themeOptions`)
    .then((res) => res.json())
    .catch((err) => console.log("err", err));
  return {
    metadataBase: new URL(process.env.URL),
    title: themeOption?.options?.seo?.meta_tags,
    description: themeOption?.options?.seo?.meta_description,
    icons: {
      icon: themeOption?.options?.logo?.favicon_icon?.original_url,
    },
    openGraph: {
      title: themeOption?.options?.seo?.og_title,
      description: themeOption?.options?.seo?.og_description,
      images: [themeOption?.options?.seo?.og_image?.original_url, []],
    },
  };
}

export default async function CustomLayout({ children }) {
  const settings = await fetch(`${process.env.URL}/settings`)
    .then((res) => res.json())
    .catch((err) => console.log("err", err));
  const lng = await detectLanguage();
  return (
    <I18nProvider language={lng}>
      <LanguageProvider initialLanguage={lng}>
        <html lang={lng} dir={dir(lng)} className={`${publicSans.variable} ${poppins.variable}`}>
          <head>
            <GoogleAnalytics
              gaId={
                settings?.values?.analytics?.google_analytics?.measurement_id
              }
            />
          </head>
          <body suppressHydrationWarning={true}>
            {children}
            <Script
              id="facebook-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${settings?.values?.analytics?.facebook_pixel?.pixel_id}');
              fbq('track', 'PageView');
              `,
              }}
            />
          </body>
        </html>
      </LanguageProvider>
    </I18nProvider>
  );
}
