
const Header = () => {
  return (
    <div  className="flex flex-row justify-between border p-5 h-11">
      <div><span>Tokosedia</span></div>
      <div><input type="text" placeholder="Search ..." /></div>
      <div>
        <span>cart</span>
        <span>favorite</span>
        <span>profile</span>
      </div>
    </div>
  )
}

export default Header