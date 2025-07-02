import { getTranslations } from "next-intl/server";
import ContactForm from "./_components/contact-form";
import ContactInfo from "./_components/contact-info";

export default async function Page() {
  // Translation
  const t = await getTranslations();

  return (
    <main className="my-10 container mx-auto">
      {/* Contact title */}
      <h2 className="text-custom-rose-900 uppercase font-bold text-base font-roboto tracking-widest">
        {t("contact-us-title")}
      </h2>

      <div className="mt-8 flex gap-44 flex-wrap ">
        {/* Contact info */}
        <div className="max-w-96">
          <ContactInfo />
        </div>

        {/* Contact form */}
        <div className="flex-grow min-w-96">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
