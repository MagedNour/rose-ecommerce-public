import AboutUsHeaderPage from "../(homepage)/_components/about-us/about-us";
import Information from "../(homepage)/_components/information/information";
import Testimonails from "../(homepage)/_components/testimonials/testimonials";
import Companies from "../(homepage)/_components/trusted-companies/companies";
import InstagramRose from "./_components/instagram-rose";
import OurTeam from "./_components/our-team";

export default function Page() {
  return (
    <main>
      {/*  About-us */}
      <AboutUsHeaderPage />

      {/* Testimonails */}
      <Testimonails />

      {/* Our Team */}
      <OurTeam />

      {/* Information */}
      <Information />

      {/* Instagram */}
      <InstagramRose />

      {/* Trusted companies */}
      <Companies />
    </main>
  );
}
