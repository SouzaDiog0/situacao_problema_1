import { useState } from "react";

export interface Profile {
  name: string;
  avatar: string;
}

export const AVATARS = ["👩‍🚀", "👨‍🚀", "🧑‍🚀", "👾", "🤖", "🦸"];

const STORAGE_KEY = "blocos-para-todos-profile";

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const saveProfile = (name: string, avatar: string) => {
    const p: Profile = { name: name.trim() || "Comandante", avatar };
    setProfile(p);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
    } catch {}
  };

  return { profile, saveProfile };
};
