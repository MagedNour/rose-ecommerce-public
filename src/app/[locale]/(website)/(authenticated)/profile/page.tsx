import React from "react";
import ProfileForm from "./_components/profile-form";
import { fetchUserData } from "@/lib/apis/profile.api";

export default async function ProfilePage() {
  // Variables
  const userData = (await fetchUserData()) || [];

  return (
    <main className="flex  justify-center items-center py-40">
      {/* Profile Form */}
      <ProfileForm initialData={userData} />
    </main>
  );
}
