
const Footer = () => {
  return (
    <>
     <footer className="bg-white border-t border-gray-200 py-4 text-center text-sm text-gray-500 mt-auto">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-bold">QuickLink</span>. Crafted with ❤️ by{" "}
        <span className="font-extrabold">Anupam</span>.
      </footer></>
  )
}

export default Footer
