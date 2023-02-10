const Header = () => {
  return (
    <div className="min-h-[10vh] bg-primaryDark sticky top-0 z-50 flex items-center justify-between px-3">
      <h1 className="text-2xl py-3">Alarms</h1>
      <span className="text-sm place-self-end">
        Sound Effect from{" "}
        <a
          href="https://pixabay.com/sound-effects/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=music&amp;utm_content=55690"
          target="_blank"
          rel="noreferrer"
        >
          <b className="font-bold">Pixabay</b>
        </a>
      </span>
    </div>
  )
}

export default Header
