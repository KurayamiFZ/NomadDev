/**
 * Profile Header Component - GameDev Academy Platform
 * 
 * Displays the main profile header with avatar, user info, and actions.
 * Handles both own profile and other users' profiles.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {UserProfile} props.profile - User profile data
 * @param {Function} props.onNavigate - Navigation callback
 * @returns {JSX.Element} Profile header section
 */

"use client";

import { Camera, Globe, Github, Linkedin, Twitter, Pen, ArrowLeft, Share2, Settings } from "lucide-react";
import { UserProfile } from "@/lib/types";

interface ProfileHeaderProps {
  profile: UserProfile;
  onNavigate: (destination: string) => void;
}

/**
 * Profile Header Component
 * 
 * Renders the fixed header with navigation, user info, and action buttons.
 * Includes avatar, banner, and social links.
 */
export function ProfileHeader({ profile, onNavigate }: ProfileHeaderProps) {
  return (
    <>
      {/* Fixed Navigation Header */}
      <header className="flex flex-row items-center justify-between w-full px-6 py-4 bg-gray-900 border-b border-gray-800 h-20 fixed top-0 left-0 z-50">
        <div className="flex items-center gap-4">
          <button
            className="px-4 py-2 border border-gray-700 rounded-full bg-gray-800 text-white text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-2"
            onClick={() => onNavigate("/home")}
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <h1 className="font-black text-white text-2xl">
            {profile.isOwnProfile ? "My Profile" : `${profile.displayName}'s Profile`}
          </h1>
        </div>

        <div className="flex gap-3">
          <button className="px-4 py-2 bg-gray-800 rounded-lg text-white text-sm font-medium hover:bg-gray-700 transition-colors border border-gray-700 flex items-center gap-2">
            <Share2 className="w-4 h-4" /> Share
          </button>
          {profile.isOwnProfile && (
            <button className="px-4 py-2 bg-gray-800 rounded-lg text-white text-sm font-medium hover:bg-gray-700 transition-colors border border-gray-700 flex items-center gap-2">
              <Settings className="w-4 h-4" /> Settings
            </button>
          )}
        </div>
      </header>

      {/* Profile Card with Banner and Avatar */}
      <div className="w-11/12 max-w-6xl mx-auto bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
        {/* Banner Background */}
        <div className="h-48 bg-linear-to-r from-purple-600 via-pink-500 to-purple-600 relative">
          {/* User Avatar */}
          <div className="absolute -bottom-16 left-8 w-32 h-32 rounded-2xl border-4 border-black bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-6xl font-black shadow-xl">
            {profile.avatarInitial}
            {profile.isOwnProfile && (
              <button className="absolute bottom-0 right-0 w-10 h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white hover:bg-purple-500 transition-colors border-2 border-black">
                <Camera className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Banner Edit Button (own profile only) */}
          {profile.isOwnProfile && (
            <button className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors">
              <Camera className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Profile Information */}
        <ProfileInfo profile={profile} />
      </div>
    </>
  );
}

/**
 * Profile Information Section
 * 
 * Displays user details, bio, and social links.
 */
function ProfileInfo({ profile }: { profile: UserProfile }) {
  return (
    <div className="pt-20 px-8 pb-8 flex flex-col space-y-4">
      {/* Name, Rank, and Edit Button */}
      <div className="flex items-center gap-3 flex-wrap">
        <h2 className="text-3xl font-black text-white">{profile.displayName}</h2>
        <span className="bg-linear-to-r from-yellow-400 to-orange-500 text-black px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5">
          ⭐ {profile.rank}
        </span>
        {profile.isOwnProfile && (
          <button className="flex justify-center items-center size-8 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold hover:bg-linear-to-r hover:from-purple-500 hover:to-pink-500 transition-all">
            <Pen className="size-4" />
          </button>
        )}
      </div>

      {/* Username, Location, and Join Date */}
      <div className="flex flex-col gap-2 text-gray-400 text-sm">
        <div className="flex gap-4 flex-wrap">
          <span className="flex items-center gap-1.5">
            <Globe className="w-4 h-4" /> {profile.location !== 'Not specified' ? profile.location : profile.email}
          </span>
          <span className="flex items-center gap-1.5">
            <Globe className="w-4 h-4" /> Joined {profile.joinDate}
          </span>
        </div>
      </div>

      {/* Bio Section */}
      <div>
        <p className="text-lg font-black">Bio</p>
        <p className="text-gray-300 text-base leading-relaxed">{profile.bio}</p>
      </div>

      {/* Social Links */}
      <SocialLinks profile={profile} />
    </div>
  );
}

/**
 * Social Links Component
 * 
 * Renders social media links and website.
 */
function SocialLinks({ profile }: { profile: UserProfile }) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      {profile.website && (
        <a
          href={`https://${profile.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-1.5"
        >
          <Globe className="w-4 h-4" /> {profile.website}
        </a>
      )}
      {profile.github && (
        <a
          href={`https://github.com/${profile.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 p-2.5 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Github className="w-5 h-5 text-gray-300" />
        </a>
      )}
      {profile.linkedin && (
        <a
          href={`https://linkedin.com/in/${profile.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 p-2.5 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Linkedin className="w-5 h-5 text-gray-300" />
        </a>
      )}
      {profile.twitter && (
        <a
          href={`https://twitter.com/${profile.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 p-2.5 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Twitter className="w-5 h-5 text-gray-300" />
        </a>
      )}
    </div>
  );
}
