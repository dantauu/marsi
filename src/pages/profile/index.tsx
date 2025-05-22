import { Link } from "@tanstack/react-router"
import { useTelegram } from "../../app/providers/telegram"
import { useState } from "react"

interface ProfileForm {
  name: string
  age: string
  bio: string
  interests: string[]
  lookingFor: string
}

const Profile = () => {
  const { webApp, user } = useTelegram()
  const [profile, setProfile] = useState<ProfileForm>({
    name: user?.first_name || "",
    age: "",
    bio: "",
    interests: [],
    lookingFor: "Отношения",
  })

  const [currentInterest, setCurrentInterest] = useState("")

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    })
  }

  const addInterest = () => {
    if (currentInterest && !profile.interests.includes(currentInterest)) {
      setProfile({
        ...profile,
        interests: [...profile.interests, currentInterest],
      })
      setCurrentInterest("")
    }
  }

  const removeInterest = (interest: string) => {
    setProfile({
      ...profile,
      interests: profile.interests.filter((item) => item !== interest),
    })
  }

  const handleSubmit = () => {
    // Здесь будет отправка данных в бот
    if (webApp) {
      webApp.MainButton.setText("Перейти к поиску").show()
    }

    // После заполнения профиля переходим к поиску
    window.location.href = "/search"
  }

  return (
    <div className="max-w-md mx-auto p-4">
      {user && (
        <div className="bg-blue-100 p-3 rounded-lg mb-4 text-blue-800">
          <p className="font-semibold">
            Привет, {user.username || user.first_name}!
          </p>
          <p className="text-sm">Telegram ID: {user.id}</p>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Мой профиль</h1>

      <div className="space-y-4">
        <div>
          <label className="block mb-1">Имя</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Ваше имя"
          />
        </div>

        <div>
          <label className="block mb-1">Возраст</label>
          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Ваш возраст"
          />
        </div>

        <div>
          <label className="block mb-1">О себе</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Расскажите о себе"
            rows={4}
          />
        </div>

        <div>
          <label className="block mb-1">Интересы</label>
          <div className="flex">
            <input
              type="text"
              value={currentInterest}
              onChange={(e) => setCurrentInterest(e.target.value)}
              className="flex-1 p-2 border rounded-l"
              placeholder="Добавить интерес"
            />
            <button
              onClick={addInterest}
              className="bg-blue-500 text-white px-4 py-2 rounded-r"
            >
              +
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="bg-gray-200 px-2 py-1 rounded flex items-center"
              >
                {interest}
                <button
                  onClick={() => removeInterest(interest)}
                  className="ml-1 text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <label className="block mb-1">Я ищу</label>
          <select
            name="lookingFor"
            value={profile.lookingFor}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Отношения">Отношения</option>
            <option value="Дружбу">Дружбу</option>
            <option value="Общение">Общение</option>
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-green-500 text-white py-2 rounded mt-4"
        >
          Сохранить профиль
        </button>
      </div>

      <div className="mt-4 text-center">
        <Link to="/search" className="text-blue-500">
          Перейти к поиску
        </Link>
      </div>
    </div>
  )
}

export default Profile
