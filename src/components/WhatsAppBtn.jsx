import { MessageCircle } from 'lucide-react';
import './WhatsAppBtn.css';

const WA_NUMBER = '917338308071'; // Confirm if 7338308071 supports WhatsApp

export default function WhatsAppBtn() {
  const openWhatsApp = () => {
    const msg = encodeURIComponent('Hi Khaki Academy! I would like to enquire about admissions and courses.');
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
  };

  return (
    <button className="wa-fab" onClick={openWhatsApp} aria-label="Chat on WhatsApp">
      <MessageCircle size={26} fill="white" />
      <span className="wa-fab__tooltip">Chat on WhatsApp</span>
    </button>
  );
}
