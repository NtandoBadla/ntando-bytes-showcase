const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {currentYear} Ntando Badla. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="mailto:ntandobadla@example.com"
              className="text-sm hover:text-accent transition-colors"
            >
              Email
            </a>
            <a
              href="https://github.com/ntando-badla"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-accent transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/ntando-badla"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-accent transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
