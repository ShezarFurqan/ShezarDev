import ServicesPage from "@/components/ServicesPage";

export const metadata = {
  title: "Services | Shezar.dev",
  description:
    "Website development, e-commerce development and custom web applications by Shezar, an independent full-stack developer.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return <ServicesPage />;
}