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
      <header className="flex flex-row items-center justify-between w-full px-4 py-3 sm:px-6 sm:py-4 bg-gray-900 border-b border-gray-800 h-16 sm:h-20 fixed top-0 left-0 z-50">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-700 rounded-full bg-gray-800 text-white text-xs sm:text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-1.5 sm:gap-2"
            onClick={() => onNavigate("/home")}
          >
            <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Back</span>
          </button>
          <h1 className="font-black text-white text-lg sm:text-2xl truncate">
            {profile.isOwnProfile ? "My Profile" : `${profile.displayName}'s Profile`}
          </h1>
        </div>

        <div className="flex gap-2">
          <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-800 rounded-lg text-white text-xs sm:text-sm font-medium hover:bg-gray-700 transition-colors border border-gray-700 flex items-center gap-1.5 sm:gap-2">
            <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Share</span>
          </button>
          {profile.isOwnProfile && (
            <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-800 rounded-lg text-white text-xs sm:text-sm font-medium hover:bg-gray-700 transition-colors border border-gray-700 flex items-center gap-1.5 sm:gap-2">
              <Settings className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden sm:inline">Settings</span>
            </button>
          )}
        </div>
      </header>

      {/* Profile Card with Banner and Avatar */}
      <div className="w-11/12 max-w-6xl mx-auto mt-20 sm:mt-24 bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-gray-800">
        {/* Banner Background */}
        <div className="h-48 bg-linear-to-r from-purple-600 via-pink-500 to-purple-600 relative">
          {/* User Avatar */}
          <div className="absolute -bottom-12 sm:-bottom-16 left-4 sm:left-8 w-24 h-24 sm:w-32 sm:h-32 rounded-2xl border-4 border-black bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-4xl sm:text-6xl font-black shadow-xl">
            {profile.avatarInitial}
            {profile.isOwnProfile && (
              <button className="absolute bottom-0 right-0 w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-purple-600 flex items-center justify-center text-white hover:bg-purple-500 transition-colors border-2 border-black">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5" />
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
    <div className="pt-16 sm:pt-20 px-4 sm:px-8 pb-8 flex flex-col space-y-4">
      {/* Name, Rank, and Edit Button */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
        <h2 className="text-2xl sm:text-3xl font-black text-white">{profile.displayName}</h2>
        <span className="bg-linear-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-1.5">
          ⭐ {profile.rank}
        </span>
        {profile.isOwnProfile && (
          <button className="flex justify-center items-center size-6 sm:size-8 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold hover:bg-linear-to-r hover:from-purple-500 hover:to-pink-500 transition-all">
            <Pen className="size-3 sm:size-4" />
          </button>
        )}
      </div>

      {/* Username, Location, and Join Date */}
      <div className="flex flex-col gap-2 text-gray-400 text-xs sm:text-sm">
        <div className="flex gap-2 sm:gap-4 flex-wrap">
          <span className="flex items-center gap-1 sm:gap-1.5">
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> 
            <span className="truncate">{profile.location !== 'Not specified' ? profile.location : profile.email}</span>
          </span>
          <span className="flex items-center gap-1 sm:gap-1.5">
            <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Joined {profile.joinDate}
          </span>
        </div>
      </div>

      {/* Bio Section */}
      <div>
        <p className="text-base sm:text-lg font-black">Bio</p>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{profile.bio}</p>
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
    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
      {profile.website && (
        <a
          href={`https://${profile.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm truncate max-w-50 sm:max-w-none"
        >
          <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" /> 
          <span className="truncate">{profile.website}</span>
        </a>
      )}
      {profile.github && (
        <a
          href={`https://github.com/${profile.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 p-2 sm:p-2.5 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Github className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
        </a>
      )}
      {profile.linkedin && (
        <a
          href={`https://linkedin.com/in/${profile.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 p-2 sm:p-2.5 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
        </a>
      )}
      {profile.twitter && (
        <a
          href={`https://twitter.com/${profile.twitter}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gray-800 p-2 sm:p-2.5 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />
        </a>
      )}
    </div>
  );
}
