import { QrCode, Copy, Check } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface PropertyCodeDisplayProps {
  shortcode: string;
  referenceCode: string;
  qrCode?: string;
  showQR?: boolean;
  variant?: 'compact' | 'full';
  className?: string;
}

export function PropertyCodeDisplay({
  shortcode,
  referenceCode,
  qrCode,
  showQR = false,
  variant = 'compact',
  className = '',
}: PropertyCodeDisplayProps) {
  const [copied, setCopied] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    // Try modern Clipboard API first
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          toast.success(`${label} copied to clipboard!`);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => {
          // Fallback to execCommand
          fallbackCopyToClipboard(text, label);
        });
    } else {
      // Use fallback method
      fallbackCopyToClipboard(text, label);
    }
  };

  const fallbackCopyToClipboard = (text: string, label: string) => {
    // Create a temporary textarea element
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Make it invisible and prevent scrolling
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.style.opacity = '0';

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopied(true);
        toast.success(`${label} copied to clipboard!`);
        setTimeout(() => setCopied(false), 2000);
      } else {
        toast.error('Failed to copy. Please copy manually.');
      }
    } catch (err) {
      console.error('Fallback copy failed:', err);
      toast.error('Failed to copy. Please copy manually.');
    }

    document.body.removeChild(textArea);
  };

  if (variant === 'compact') {
    return (
      <div className={`space-y-1 ${className}`}>
        {/* Reference Code (includes shortcode at the end) */}
        <div className="flex items-start gap-2">
          <span className="text-xs text-gray-500 flex-shrink-0 mt-0.5">Ref:</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              copyToClipboard(referenceCode, 'Reference code');
            }}
            className="group flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#0E56A4] transition-colors font-mono text-left"
          >
            <span className="break-all">{referenceCode}</span>
            <Copy className="w-3 h-3 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* QR Code Button */}
        {showQR && qrCode && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowQRModal(true);
            }}
            className="flex items-center gap-1.5 text-xs text-[#0E56A4] hover:text-[#0A3F79] transition-colors"
          >
            <QrCode className="w-3.5 h-3.5" />
            View QR Code
          </button>
        )}

        {/* QR Code Modal */}
        {showQRModal && qrCode && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowQRModal(false);
            }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl p-6 max-w-sm w-full"
            >
              <div className="text-center">
                <h3 className="font-semibold text-lg text-[#0E56A4] mb-2">Property QR Code</h3>
                <p className="text-sm text-gray-600 mb-4">Scan to view property details</p>
                <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block mb-4">
                  <img src={qrCode} alt="Property QR Code" className="w-48 h-48" />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-mono text-gray-700 bg-gray-50 px-3 py-2 rounded">
                    {shortcode}
                  </p>
                  <button
                    onClick={() => setShowQRModal(false)}
                    className="w-full px-4 py-2 bg-[#0E56A4] text-white rounded-lg hover:bg-[#0A3F79] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Full variant (for detail pages)
  return (
    <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
      <h4 className="text-sm font-semibold text-gray-700 mb-3">Property Reference</h4>

      <div className="space-y-3">
        {/* Full Reference */}
        <div>
          <label className="text-xs text-gray-500 block mb-1">Full Reference</label>
          <div className="flex items-center gap-2">
            <div className="px-3 py-2 bg-white border border-gray-300 rounded-lg font-mono text-xs text-gray-700 flex-1 break-all">
              {referenceCode}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                copyToClipboard(referenceCode, 'Reference code');
              }}
              className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              title="Copy reference"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <Copy className="w-4 h-4 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
