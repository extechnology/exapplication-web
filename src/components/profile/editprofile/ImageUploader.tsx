import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField, FormItem } from "@/components/ui/form";
import { ProfileFormValues } from "@/schemas/profileSchema";
import { UserProfileType } from "@/services/profile/types";
import { Camera, User } from "lucide-react";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";




// Accepted image types
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB



// Props Type
type Props = {
  form: UseFormReturn<ProfileFormValues>;
  preview: string | null;
  backgroundPreview: string | null;
  userProfile?: UserProfileType;
  setPreview: (v: string | null) => void;
  setBackgroundPreview: (v: string | null) => void;

};



export default function ImageUploader({ form, preview, setPreview, backgroundPreview, setBackgroundPreview, userProfile }: Props) {



  const [avatarHover, setAvatarHover] = useState<boolean>(false);



  return (


    <Card className="border-0 bg-background shadow-none sm:shadow-sm rounded-t-none rounded-b-xl overflow-hidden pt-0 !mb-0">


      {/* Background Image Section */}
      <div className="relative w-full h-40 sm:h-72 bg-muted rounded-b-xl overflow-hidden">


        {/* Background Image */}
        <FormField
          control={form.control}
          name="background_image"
          render={({ field }) => (

            <FormItem className="w-full h-full flex flex-col items-center">

              <img
                src={backgroundPreview || "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg"}
                alt="Background"
                loading="lazy"
                className="w-full h-full object-cover rounded-b-xl"
              />

              {/* Edit Button */}
              <button
                type="button"
                onClick={() => document.getElementById("bgUpload")?.click()}
                className="absolute bottom-2 right-2 bg-black/50 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1 hover:bg-black/70 transition"
              >
                <Camera size={16} />
                Edit Cover
              </button>

              {/* Hidden Input */}
              <input
                id="bgUpload"
                type="file"
                accept="image/png, image/jpeg, image/jpg"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  // 🔥 Toast-based validations
                  if (file.size > MAX_FILE_SIZE) {
                    toast.error("Max 2MB image allowed");
                    return;
                  }

                  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                    toast.error("Only .jpg, .jpeg & .png allowed");
                    return;
                  }

                  // If valid → update field + preview
                  field.onChange(file);
                  setBackgroundPreview(URL.createObjectURL(file));
                }}
              />
            </FormItem>
          )}
        />

      </div>



      {/* Avatar + Title Section */}
      <CardHeader className="pt-0 sm:pt-10 relative ">

        {/* Avatar Positioned Overlapping Background */}
        <div className="absolute -top-24 sm:-top-24 left-1/2 -translate-x-1/2 sm:left-2 sm:translate-x-0">

          {/* Avatar Upload */}
          <FormField
            control={form.control}
            name="profile_picture"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center">

                <div
                  className="relative cursor-pointer group"
                  onMouseEnter={() => setAvatarHover(true)}
                  onMouseLeave={() => setAvatarHover(false)}
                  onClick={() => document.getElementById("avatarUpload")?.click()}
                >
                  <Avatar className="h-28 w-28 sm:h-32 sm:w-32 border-4 border-background shadow-lg rounded-full">
                    <AvatarImage
                      src={preview || "/images.png"}
                    />
                    <AvatarFallback className="text-xl sm:text-2xl">
                      {userProfile?.fullname?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  {/* Hover Overlay */}
                  <div
                    className={`absolute inset-0 bg-black/40 rounded-full flex items-center justify-center transition-opacity duration-300 ${avatarHover ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    <Camera className="text-white" size={20} />
                  </div>
                </div>

                {/* Hidden Input */}
                <input
                  id="avatarUpload"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    // 🔥 Toast validation
                    if (file.size > MAX_FILE_SIZE) {
                      toast.error("Max 2MB image allowed");
                      return;
                    }

                    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                      toast.error("Only .jpg, .jpeg & .png allowed");
                      return;
                    }

                    // Apply if valid
                    field.onChange(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                />
              </FormItem>
            )}
          />

        </div>

        {/* Title */}
        <CardTitle className="text-lg sm:text-xl mt-14 sm:mt-2 justify-start items-center gap-2 hidden sm:flex">
          <User size={18} /> Edit Profile
        </CardTitle>
        <CardDescription className="hidden sm:block">Update your public profile information</CardDescription>

      </CardHeader>

    </Card>


  )



}



