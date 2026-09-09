import useProfile from "../hooks/useProfile";

import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileForm from "../components/Profile/ProfileForm";

import "../styles/Profile.css";

const Profile = () => {
  const { user, loading, error, isEditing, setIsEditing, updateProfile } =
    useProfile();

  if (loading) {
    return (
      <div className="profile-page">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="profile-page">
        <p>{error || "Unable to load profile."}</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-page-header">
        <div>
          <h1>My Profile</h1>
          <p>View and manage your personal information.</p>
        </div>

        <button
          type="button"
          className="profile-edit-button"
          onClick={() => setIsEditing((current) => !current)}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <ProfileHeader user={user} />

      {isEditing ? (
        <ProfileForm user={user} onUpdate={updateProfile} />
      ) : (
        <div className="profile-information">
          <section className="profile-section">
            <div className="profile-section-heading">
              <h2>Personal Information</h2>
            </div>

            <div className="profile-details-grid">
              <div className="profile-detail">
                <span>First Name</span>
                <strong>{user.firstName || "—"}</strong>
              </div>

              <div className="profile-detail">
                <span>Last Name</span>
                <strong>{user.lastName || "—"}</strong>
              </div>

              <div className="profile-detail">
                <span>Date of Birth</span>
                <strong>{user.birthDate || "—"}</strong>
              </div>

              <div className="profile-detail">
                <span>Gender</span>
                <strong>{user.gender || "—"}</strong>
              </div>

              <div className="profile-detail">
                <span>Age</span>
                <strong>{user.age || "—"}</strong>
              </div>

              <div className="profile-detail">
                <span>Blood Group</span>
                <strong>{user.bloodGroup || "—"}</strong>
              </div>
            </div>
          </section>

          <section className="profile-section">
            <div className="profile-section-heading">
              <h2>Contact Information</h2>
            </div>

            <div className="profile-details-grid">
              <div className="profile-detail">
                <span>Email</span>
                <strong>{user.email || "—"}</strong>
              </div>

              <div className="profile-detail">
                <span>Phone</span>
                <strong>{user.phone || "—"}</strong>
              </div>

              <div className="profile-detail profile-detail-wide">
                <span>Address</span>
                <strong>{user.address?.address || "—"}</strong>
              </div>

              <div className="profile-detail">
                <span>City</span>
                <strong>{user.address?.city || "—"}</strong>
              </div>

              <div className="profile-detail">
                <span>State</span>
                <strong>{user.address?.state || "—"}</strong>
              </div>

              <div className="profile-detail">
                <span>Postal Code</span>
                <strong>{user.address?.postalCode || "—"}</strong>
              </div>
            </div>
          </section>

          <section className="profile-section">
            <div className="profile-section-heading">
              <h2>Employment Information</h2>
            </div>

            <div className="profile-details-grid">
              <div className="profile-detail">
                <span>Employee ID</span>
                <strong>#{user.id}</strong>
              </div>

              <div className="profile-detail">
                <span>Username</span>
                <strong>{user.username || "—"}</strong>
              </div>

              <div className="profile-detail">
                <span>Job Title</span>
                <strong>{user.company?.title || "—"}</strong>
              </div>

              <div className="profile-detail">
                <span>Department</span>
                <strong>{user.company?.department || "—"}</strong>
              </div>

              <div className="profile-detail">
                <span>Company</span>
                <strong>{user.company?.name || "—"}</strong>
              </div>

              <div className="profile-detail">
                <span>University</span>
                <strong>{user.university || "—"}</strong>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default Profile;
