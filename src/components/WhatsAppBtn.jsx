import { MessageCircle } from 'lucide-react';
import './WhatsAppBtn.css';

export default function WhatsAppBtn() {
  const openWhatsApp = () => {
    const msg = encodeURIComponent('Hi Khaki Academy! I want to book a free demo class.');
    window.open(`https://wa.me/919876543210?text=${msg}`, '_blank');
  };

  return (
    <button className="wa-fab" onClick={openWhatsApp} aria-label="Chat on WhatsApp">
      <MessageCircle size={26} fill="white" />
      <span className="wa-fab__tooltip">Chat on WhatsApp</span>
    </button>
  );
}
