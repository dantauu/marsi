import { Link } from "@tanstack/react-router"
// import { useTelegram } from "../../app/providers/telegram"
// import { useState } from "react"

// interface ProfileForm {
//   name: string
//   age: string
//   bio: string
//   interests: string[]
//   lookingFor: string
// }

const Profile = () => {
  // const { webApp, user } = useTelegram()
  // const [profile, setProfile] = useState<ProfileForm>({
  //   name: user?.first_name || "",
  //   age: "",
  //   bio: "",
  //   interests: [],
  //   lookingFor: "Отношения",
  // })

  return (
    <div className="">
      <h1>This Profile</h1>
      <Link to="/search">
        <button className="">Go to Search</button>
      </Link>
    </div>
  )
}

export default Profile
