import { Link } from "react-router-dom";

export default function HeroPage() {
  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center">

      <Link to="/login" className="mb-10">
        <img
          src="/assets/logo_demeter.webp"
          alt="Demeter Logo"
          className="w-48 h-48 object-contain"
        />
      </Link>

      <h1 className="text-4xl md:text-5xl font-serif font-bold text-black text-center max-w-3xl">
        GROW YOUR EXPORT BUSINESS WITH TRUSTED INSPECTION
      </h1>
    </div>
  );
}
