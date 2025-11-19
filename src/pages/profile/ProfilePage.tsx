import ProfileForm from "@/components/profile/ProfileForm";
import useAuth from "@/hooks/auth/useAuth";
import Spinner from "@/ui/Spinner";

function ProfilePage() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Spinner />;
  if (user) return <ProfileForm data={user} />;
}

export default ProfilePage;
