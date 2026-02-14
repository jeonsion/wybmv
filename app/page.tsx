import HomeClient from "./HomeClient";

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const rawFrom = resolvedSearchParams?.from;
  const initialFrom = Array.isArray(rawFrom) ? rawFrom[0] ?? "" : rawFrom ?? "";

  return <HomeClient initialFrom={initialFrom} />;
}
