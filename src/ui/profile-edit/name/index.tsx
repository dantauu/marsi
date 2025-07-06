export const NameEdit = ({ ...field }) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Введите имя"
        className="w-full h-[50px] border rounded-[5px] px-4 text-[20px] font-ManropeM "
        {...field}
      />
    </div>
  )
}