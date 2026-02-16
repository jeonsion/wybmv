import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { SITE_NAME, SITE_URL } from "./site";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const rawFrom = resolvedSearchParams?.from;
  const fromParam = Array.isArray(rawFrom) ? rawFrom[0] ?? "" : rawFrom ?? "";

  if (fromParam) {
    return {
      title: "Private Valentine Link",
      description: "A private Valentine invitation link.",
      alternates: {
        canonical: "/"
      },
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false
        }
      }
    };
  }

  return {
    title: "Will You Be My Valentine? | Create a Shareable Link",
    description: "Generate a Valentine link, share it instantly, and surprise your special person with a playful interactive page.",
    alternates: {
      canonical: "/"
    }
  };
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const rawFrom = resolvedSearchParams?.from;
  const initialFrom = Array.isArray(rawFrom) ? rawFrom[0] ?? "" : rawFrom ?? "";
  const isBuilderMode = !initialFrom;
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL
  };
  const webpageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Will You Be My Valentine?",
    url: SITE_URL,
    description: "Interactive Valentine countdown and shareable valentine link generator.",
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL
    }
  };

  return (
    <>
      {isBuilderMode && (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageJsonLd) }} />
        </>
      )}
      <HomeClient initialFrom={initialFrom} />
    </>
  );
}
