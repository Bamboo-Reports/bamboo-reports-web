import { notFound } from "next/navigation";
import CompanyProfile from "@/views/gcc-companies/CompanyProfile";
import { UNLISTED_ROBOTS, gccDirectoryLive } from "@/config/flags";
import { buildMetadata } from "@/lib/seo";
import { companies, getCompany } from "@/lib/gccCompanies";

type Props = { params: Promise<{ slug: string }> };

// Static export: one page per company, nothing rendered on demand.
export const dynamicParams = false;

export const generateStaticParams = () => companies.map((c) => ({ slug: c.slug }));

export const generateMetadata = async ({ params }: Props) => {
  const c = getCompany((await params).slug);
  if (!c) return {};
  const cities = c.india.cities.map((city) => city.name);
  const where = cities.length > 3 ? `${cities.slice(0, 3).join(", ")} and more` : cities.join(", ");
  return buildMetadata(
    {
      title: `${c.name} India GCC Profile | Bamboo Reports`,
      description: `${c.name} has ${c.centreCount} India centre${c.centreCount === 1 ? "" : "s"} in ${where}${
        c.india.since ? `, in India since ${c.india.since}` : ""
      }. Centre types, functions and India headcount from Bamboo Reports.`,
      robots: gccDirectoryLive ? undefined : UNLISTED_ROBOTS,
    },
    `/gcc-companies/${c.slug}`,
  );
};

const Page = async ({ params }: Props) => {
  const c = getCompany((await params).slug);
  if (!c) notFound();
  return <CompanyProfile company={c} />;
};

export default Page;
