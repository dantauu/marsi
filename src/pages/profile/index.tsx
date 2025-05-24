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
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <a
          href="https://t.me/Marsi_Best_bot?startapp=fullscreen"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            padding: "15px 30px",
            fontSize: "18px",
            backgroundColor: "#0078E7",
            color: "#fff",
            borderRadius: "8px",
            textDecoration: "none",
          }}
        >
          Открыть Web App
        </a>
      </div>
    </div>
  )
}

export default Profile
