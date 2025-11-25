import CTASection from "@/components/CTASection";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import PopularProducts from "@/components/PopularProducts";
import WhyChooseUs from "@/components/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <div className="space-y-10">
      <Hero></Hero>
      <Features></Features>
      <PopularProducts></PopularProducts>
      <WhyChooseUs></WhyChooseUs>
      <CTASection></CTASection>
    </div>
  );
}
