const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-300/30 py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full text-center">
            <span className="text-lg font-semibold">&copy; {currentYear} ohana-nikki. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
