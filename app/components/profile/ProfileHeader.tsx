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







import { useState } from "react";



import Icon from "../icons";



import { UserProfile } from "@/lib/types";



import { useAuth } from "../AuthProvider";



import { calculateTotalXP, getLevelFromXP, getRankTitle, getRankGradient } from "@/lib/level-system";







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



  const [isEditModalOpen, setIsEditModalOpen] = useState(false);



  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);



  const { signOut } = useAuth();



  const [editForm, setEditForm] = useState({



    name: profile.displayName,



    bio: profile.bio,



    location: profile.location,



    website: profile.website,



    github: profile.github,



    linkedin: profile.linkedin,



    twitter: profile.twitter,



  });



  const [saving, setSaving] = useState(false);



  const [error, setError] = useState("");



  const [success, setSuccess] = useState("");







  const handleLogout = async () => {



    try {



      await signOut();



      window.location.href = '/';



    } catch (error) {



      console.error('Error during logout:', error);



    }



  };







  const handleEditProfile = () => {



    setEditForm({



      name: profile.displayName,



      bio: profile.bio,



      location: profile.location,



      website: profile.website,



      github: profile.github,



      linkedin: profile.linkedin,



      twitter: profile.twitter,



    });



    setError("");



    setSuccess("");



    setIsEditModalOpen(true);



  };







  const handleInputChange = (field: string, value: string) => {



    setEditForm(prev => ({



      ...prev,



      [field]: value



    }));



  };







  const handleSaveProfile = async () => {



    setSaving(true);



    setError("");



    setSuccess("");







    try {



      console.log('Sending profile update request with data:', editForm);



      



      const response = await fetch('/api/profile/update', {



        method: 'PUT',



        headers: {



          'Content-Type': 'application/json',



        },



        body: JSON.stringify(editForm),



      });







      console.log('Response status:', response.status);



      console.log('Response headers:', response.headers);







      const data = await response.json();



      console.log('Response data:', data);







      if (!response.ok) {



        console.error('Server returned error:', data);



        setError(data.error || 'Профайл шинэчлэхд алдаа гарлаа');



        return;



      }







      setSuccess('Профайл амжилттай шинэчлэгдлээ!');



      



      // Refresh the page to show updated data



      setTimeout(() => {



        window.location.reload();



      }, 1000);







    } catch (error) {



      console.error('Network/client error:', error);



      setError('Профайл шинэчлэхд алдаа гарлаа');



    } finally {



      setSaving(false);



    }



  };



  return (



    <>



      {/* Fixed Navigation Header */}



      <header className="flex flex-row items-center justify-between w-full px-4 py-3 sm:px-6 sm:py-4 bg-gray-900 border-b border-gray-800 h-16 sm:h-20 fixed top-0 left-0 z-50">



        <div className="flex items-center gap-2 sm:gap-4">



          <button



            className="px-3 py-1.5 sm:px-4 sm:py-2 border border-gray-700 rounded-full bg-gray-800 text-white text-xs sm:text-sm font-medium hover:bg-gray-700 transition-colors flex items-center gap-1.5 sm:gap-2"



            onClick={() => window.history.back()}



          >



            <Icon name="ArrowLeft" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{" "}



            <span className="hidden sm:inline">Буцах</span>



          </button>



          <h1 className="font-black text-white text-lg sm:text-2xl truncate">



            {profile.isOwnProfile



              ? "Миний профайл"



              : `${profile.displayName}-н профайл`}



          </h1>



        </div>







        <div className="flex gap-2">



          <button className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-800 rounded-lg text-white text-xs sm:text-sm font-medium hover:bg-gray-700 transition-colors border border-gray-700 flex items-center gap-1.5 sm:gap-2">



            <Icon name="Share2" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{" "}



            <span className="hidden sm:inline">Хуваалцах</span>



          </button>



          {profile.isOwnProfile && (



            <button 



              onClick={() => setIsSettingsModalOpen(true)}



              className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gray-800 rounded-lg text-white text-xs sm:text-sm font-medium hover:bg-gray-700 transition-colors border border-gray-700 flex items-center gap-1.5 sm:gap-2"



            >



              <Icon name="Settings" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />{" "}



              <span className="hidden sm:inline">Тохиргоо</span>



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



                <Icon name="Camera" className="w-4 h-4 sm:w-5 sm:h-5" />



              </button>



            )}



          </div>







          {/* Banner Edit Button (own profile only) */}



          {profile.isOwnProfile && (



            <button className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors">



              <Icon name="Camera" className="w-5 h-5" />



            </button>



          )}



        </div>







        {/* Profile Information */}



        <ProfileInfo profile={profile} onEditProfile={handleEditProfile} />



      </div>



      



      {/* Edit Profile Modal */}



      {isEditModalOpen && (



        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">



          <div className="bg-gray-900 rounded-2xl border border-gray-800 w-full max-w-md max-h-[90vh] overflow-y-auto">



            <div className="p-6">



              <div className="flex items-center justify-between mb-6">



                <h2 className="text-xl font-bold text-white">Профайл засах</h2>



                <button



                  onClick={() => setIsEditModalOpen(false)}



                  className="text-gray-400 hover:text-white transition-colors"



                >



                  <Icon name="X" className="size-5" />



                </button>



              </div>



              



              <div className="space-y-4">



                <div>



                  <label className="block text-sm font-medium text-gray-300 mb-2">Харагдах нэр</label>



                  <input



                    type="text"



                    value={editForm.name}



                    onChange={(e) => handleInputChange('name', e.target.value)}



                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"



                  />



                </div>



                



                <div>



                  <label className="block text-sm font-medium text-gray-300 mb-2">Намтар</label>



                  <textarea



                    value={editForm.bio}



                    onChange={(e) => handleInputChange('bio', e.target.value)}



                    rows={3}



                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none resize-none"



                  />



                </div>



                



                <div>



                  <label className="block text-sm font-medium text-gray-300 mb-2">Байршил</label>



                  <input



                    type="text"



                    value={editForm.location}



                    onChange={(e) => handleInputChange('location', e.target.value)}



                    placeholder="Байршилаа оруулна уу"



                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"



                  />



                </div>



                



                <div>



                  <label className="block text-sm font-medium text-gray-300 mb-2">Вэбсайт</label>



                  <input



                    type="text"



                    value={editForm.website}



                    onChange={(e) => handleInputChange('website', e.target.value)}



                    placeholder="example.com"



                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"



                  />



                </div>







                <div>



                  <label className="block text-sm font-medium text-gray-300 mb-2">GitHub</label>



                  <input



                    type="text"



                    value={editForm.github}



                    onChange={(e) => handleInputChange('github', e.target.value)}



                    placeholder="username"



                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"



                  />



                </div>







                <div>



                  <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn</label>



                  <input



                    type="text"



                    value={editForm.linkedin}



                    onChange={(e) => handleInputChange('linkedin', e.target.value)}



                    placeholder="username"



                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"



                  />



                </div>







                <div>



                  <label className="block text-sm font-medium text-gray-300 mb-2">Twitter</label>



                  <input



                    type="text"



                    value={editForm.twitter}



                    onChange={(e) => handleInputChange('twitter', e.target.value)}



                    placeholder="username"



                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"



                  />



                </div>



              </div>







              {/* Error/Success Messages */}



              {error && (



                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">



                  {error}



                </div>



              )}







              {success && (



                <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm">



                  {success}



                </div>



              )}



              



              <div className="flex gap-3 mt-6">



                <button



                  onClick={() => setIsEditModalOpen(false)}



                  disabled={saving}



                  className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"



                >



                  Цуцлах



                </button>



                <button



                  onClick={handleSaveProfile}



                  disabled={saving}



                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"



                >



                  {saving ? "Хадгалж байна..." : "Өөрчлөлт хадгалах"}



                </button>



              </div>



            </div>



          </div>



        </div>



      )}







      {/* Settings Modal */}



      {isSettingsModalOpen && (



        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">



          <div className="bg-gray-900 rounded-2xl border border-gray-800 w-full max-w-md">



            <div className="p-6">



              <div className="flex items-center justify-between mb-6">



                <h2 className="text-xl font-bold text-white">Тохиргоо</h2>



                <button



                  onClick={() => setIsSettingsModalOpen(false)}



                  className="text-gray-400 hover:text-white transition-colors"



                >



                  <Icon name="X" className="size-5" />



                </button>



              </div>



              



              <div className="space-y-4">



                <button



                  onClick={handleLogout}



                  className="w-full flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors group"



                >



                  <Icon name="LogOut" className="size-5 text-red-400 group-hover:text-red-300" />



                  <span className="text-sm font-semibold text-red-400 group-hover:text-red-300">



                    Гарах



                  </span>



                </button>



              </div>



            </div>



          </div>



        </div>



      )}



    </>



  );



}







/**



 * Profile Information Section



 *



 * Displays user details, bio, and social links.



 */



function ProfileInfo({ profile, onEditProfile }: { 



  profile: UserProfile; 



  onEditProfile?: () => void;



}) {



  return (



    <div className="pt-16 sm:pt-20 px-4 sm:px-8 pb-8 flex flex-col space-y-4">



      {/* Name, Rank, and Edit Button */}



      <div className="flex items-center gap-2 sm:gap-3 flex-wrap">



        <h2 className="text-2xl sm:text-3xl font-black text-white">



          {profile.displayName}



        </h2>



        <span className="bg-linear-to-r from-yellow-400 to-orange-500 text-black px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1 sm:gap-1.5">



          ⭐ {profile.rank}



        </span>



        {profile.isOwnProfile && (



          <button 



            onClick={onEditProfile}



            className="flex justify-center items-center size-6 sm:size-8 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg text-white font-bold hover:bg-linear-to-r hover:from-purple-500 hover:to-pink-500 transition-all"



          >



            <Icon name="Pen" className="size-3 sm:size-4" />



          </button>



        )}



      </div>







      {/* Username, Location, and Join Date */}



      <div className="flex flex-col gap-2 text-gray-400 text-xs sm:text-sm">



        <div className="flex gap-2 sm:gap-4 flex-wrap">



          <span className="flex items-center gap-1 sm:gap-1.5">



            <Icon name="Globe" className="w-3.5 h-3.5 sm:w-4 sm:h-4" />



            <span className="truncate">



              {profile.location !== "Not specified"



                ? profile.location



                : profile.email}



            </span>



          </span>



          <span className="flex items-center gap-1 sm:gap-1.5">



            <Icon name="Globe" className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Нэгдсэн:{" "}



            {profile.joinDate}



          </span>



        </div>



      </div>







      {/* Bio Section */}



      <div>



        <p className="text-base sm:text-lg font-black">Намтар</p>



        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">



          {profile.bio}



        </p>



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



          <Icon name="Globe" className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />



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



          <Icon name="Github" className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300" />



        </a>



      )}



      {profile.linkedin && (



        <a



          href={`https://linkedin.com/in/${profile.linkedin}`}



          target="_blank"



          rel="noopener noreferrer"



          className="bg-gray-800 p-2 sm:p-2.5 rounded-lg hover:bg-gray-700 transition-colors"



        >



          <Icon



            name="Linkedin"



            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300"



          />



        </a>



      )}



      {profile.twitter && (



        <a



          href={`https://twitter.com/${profile.twitter}`}



          target="_blank"



          rel="noopener noreferrer"



          className="bg-gray-800 p-2 sm:p-2.5 rounded-lg hover:bg-gray-700 transition-colors"



        >



          <Icon



            name="Twitter"



            className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300"



          />



        </a>



      )}



    </div>



  );



}



