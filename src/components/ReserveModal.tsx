import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ProductSelection = {
  title: string;
  priceINR: string;
  image: string;
};

export function ReserveModal({
  isOpen,
  onClose,
  initialProduct,
}: {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: ProductSelection | null;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Mumbai");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            data-cursor
            data-cursor-label="CLOSE"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", stiffness: 220, damping: 25 }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-3xl border border-white/15 bg-card p-6 shadow-[0_30px_90px_rgba(0,0,0,0.85)] sm:p-9"
          >
            {/* Ambient Gold Glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

            <button
              onClick={onClose}
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:bg-white/15 hover:text-foreground"
              aria-label="Close modal"
              data-cursor
            >
              ✕
            </button>

            {!isSubmitted ? (
              <div>
                <span className="font-mono text-[0.65rem] uppercase tracking-[0.38em] text-accent">
                  Private Showroom Access
                </span>
                <h3 className="mt-2 font-display text-2xl font-light text-foreground sm:text-3xl">
                  Reserve Your Preview
                </h3>
                {initialProduct && (
                  <div className="mt-4 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3.5">
                    <img
                      src={initialProduct.image}
                      alt={initialProduct.title}
                      className="h-14 w-14 object-contain drop-shadow"
                    />
                    <div>
                      <div className="font-display text-lg text-foreground font-medium">
                        {initialProduct.title}
                      </div>
                      <div className="text-xs text-accent font-mono">
                        {initialProduct.priceINR} • Complimentary White-Glove Setup
                      </div>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                  <div>
                    <label className="block text-[0.68rem] uppercase tracking-[0.25em] text-muted-foreground mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-[0.68rem] uppercase tracking-[0.25em] text-muted-foreground mb-1.5">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="vikram@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-[0.68rem] uppercase tracking-[0.25em] text-muted-foreground mb-1.5">
                        Phone (WhatsApp)
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[0.68rem] uppercase tracking-[0.25em] text-muted-foreground mb-1.5">
                      Showroom / Residence Location
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none"
                    >
                      <option value="Mumbai">Mumbai (Bandra Showroom)</option>
                      <option value="New Delhi">New Delhi (Chanakyapuri Showroom)</option>
                      <option value="Bengaluru">Bengaluru (Indiranagar Showroom)</option>
                      <option value="Hyderabad">Hyderabad (Jubilee Hills Showroom)</option>
                      <option value="Chennai">Chennai (Nungambakkam Showroom)</option>
                      <option value="Bespoke Delivery">Direct Home Delivery (Pan-India)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="mt-3 w-full rounded-full bg-accent py-4 text-xs font-semibold uppercase tracking-[0.3em] text-accent-foreground shadow-lg transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
                    data-cursor
                    data-cursor-label="CONFIRM"
                  >
                    Confirm Reservation
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-2xl text-accent">
                  ✓
                </div>
                <h3 className="mt-5 font-display text-2xl font-light text-foreground sm:text-3xl">
                  Reservation Confirmed
                </h3>
                <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground">
                  Thank you, <span className="text-foreground font-semibold">{name}</span>. A Luxoria Concierge specialist will contact you within 2 hours at <span className="text-accent">{phone}</span> to finalize your private walkthrough in <span className="text-foreground font-semibold">{city}</span>.
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 rounded-full border border-white/20 bg-white/5 px-8 py-3 text-xs uppercase tracking-[0.28em] text-foreground transition-colors hover:bg-white/15"
                  data-cursor
                >
                  Close Window
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
