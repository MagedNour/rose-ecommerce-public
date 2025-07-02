'use client';
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";


const companies = [
  {
    id: 1,
    name: "Cocounty",
    logo: "/assets/images/trusted/image1.png",
  },
  {
    id: 2,
    name: "Gymshark",
    logo: "/assets/images/trusted/image2.png",
  },
  {
    id: 3,
    name: "Tudonge",
    logo: "/assets/images/trusted/image3.png",
  },
  {
    id: 4,
    name: "Nejmet",
    logo: "/assets/images/trusted/image4.png",
  },
  {
    id: 5,
    name: "Monka",
    logo: "/assets/images/trusted/image5.png",
  },
  {
    id: 6,
    name: "Pappy",
    logo: "/assets/images/trusted/image6.png",
  },
]

export default function TrustedBySection() {
  const t = useTranslations(); // Initialize translations

  const [isMobile, setIsMobile] = useState(false)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const visibleCompanies = isMobile && !showAll ? companies.slice(0, 4) : companies

  return (
    <Card className="container mx-auto w-full bg-[#ffecf2] my-10 rounded-lg border-none py-8 md:py-12 px-4 shadow-none">
      <div>
        {/* Heading with translations */}
        <h2 className="text-center font-bold text-xl sm:text-2xl md:text-3xl text-neutral-800 mb-6 md:mb-10">
          <span className="inline-block relative">
            {t("trusted-by-over")} <span className="text-pink-500">4.5k+</span> {t("companies")}
            <span className="absolute -bottom-1 left-0 right-0 h-0.5 w-full bg-pink-600"></span>
          </span>
        </h2>

        {/* Logo grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 items-center justify-items-center">
          {visibleCompanies.map((company) => (
            <div
              key={company.id}
              className="w-full max-w-[120px] md:max-w-[160px] h-10 md:h-16 flex items-center justify-center"
            >
              <div className="relative w-full h-full">
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  fill
                  className="opacity-60 grayscale hover:opacity-80 hover:grayscale-0 transition-all duration-300"
                  style={{ objectFit: "contain" }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* View All Brands button with proper translations */}
        {isMobile && companies.length > 3 && (
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => setShowAll(!showAll)}
              className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-full flex items-center gap-2 transition-all"
            >
              {showAll ? t('show-less-0') : t('view-all-brands')}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}