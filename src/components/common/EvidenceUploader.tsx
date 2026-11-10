import React, { useState } from 'react';
import { UploadCloud, FileText, Image, Trash2, Camera, Check, AlertCircle } from 'lucide-react';
import { Attachment } from '../../types/complaint';

interface EvidenceUploaderProps {
  attachments: Attachment[];
  onChange: (attachments: Attachment[]) => void;
}

export const EvidenceUploader: React.FC<EvidenceUploaderProps> = ({ attachments, onChange }) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setErrorMsg(null);
    setUploading(true);

    const newAttachments: Attachment[] = [];

    Array.from(files).forEach((file, index) => {
      // Validate file size (< 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrorMsg(`फ़ाइल "${file.name}" 5MB से बड़ी है। कृपया छोटी फ़ाइल चुनें।`);
        return;
      }

      const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
      const isImg = file.type.startsWith('image/');

      if (!isPdf && !isImg) {
        setErrorMsg(`केवल JPG, PNG, WebP अथवा PDF फ़ाइलें ही मान्य हैं।`);
        return;
      }

      const sizeStr = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;
      const fakeUrl = URL.createObjectURL(file);

      newAttachments.push({
        id: `att-${Date.now()}-${index}`,
        name: file.name,
        size: sizeStr,
        type: isPdf ? 'pdf' : 'image',
        url: fakeUrl,
      });
    });

    setTimeout(() => {
      onChange([...attachments, ...newAttachments]);
      setUploading(false);
    }, 600);
  };

  const removeAttachment = (id: string) => {
    onChange(attachments.filter((a) => a.id !== id));
  };

  // Mobile camera simulation for hackathon demo
  const handleCameraCapture = () => {
    setUploading(true);
    setTimeout(() => {
      const demoPhotos = [
        {
          name: 'Pothole_Road_Evidence_Photo.jpg',
          url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80',
        },
        {
          name: 'Water_Pipe_Disruption_Camera.jpg',
          url: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=600&q=80',
        },
        {
          name: 'Electric_Line_Sagging_Camera.jpg',
          url: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80',
        },
      ];

      const chosen = demoPhotos[attachments.length % demoPhotos.length];
      const newAtt: Attachment = {
        id: `att-cam-${Date.now()}`,
        name: chosen.name,
        size: '2.1 MB',
        type: 'image',
        url: chosen.url,
      };

      onChange([...attachments, newAtt]);
      setUploading(false);
    }, 500);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-gov-navy uppercase tracking-wider">
          सहायक साक्ष्य (फोटो / दस्तावेज संलग्न करें)
        </label>
        <span className="text-[11px] text-slate-500">वैकल्पिक (Optional) • अधिकतम 5MB प्रति फ़ाइल</span>
      </div>

      {errorMsg && (
        <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Upload Box */}
      <div className="border-2 border-dashed border-slate-300 hover:border-gov-blue rounded-xl p-5 bg-slate-50/70 text-center transition-colors">
        <UploadCloud className="w-8 h-8 text-gov-blue mx-auto mb-2" />
        <p className="text-xs font-semibold text-slate-800">
          यहाँ फ़ाइलें ड्रैग करें या कंप्यूटर/फोन से चुनें
        </p>
        <p className="text-[11px] text-slate-500 mb-3">
          समर्थित प्रारूप: JPG, PNG, WebP, PDF (समस्या स्थल की फोटो से त्वरित समाधान होता है)
        </p>

        <div className="flex items-center justify-center gap-2 flex-wrap">
          <label className="cursor-pointer bg-gov-blue hover:bg-gov-navy text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors shadow-xs inline-flex items-center gap-1.5">
            <UploadCloud className="w-4 h-4" />
            <span>फ़ाइल चुनें (Browse)</span>
            <input
              type="file"
              multiple
              accept="image/*,application/pdf"
              onChange={handleFileUpload}
              className="sr-only"
            />
          </label>

          <button
            type="button"
            onClick={handleCameraCapture}
            className="cursor-pointer bg-slate-200 hover:bg-slate-300 text-slate-800 px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors inline-flex items-center gap-1.5"
            title="मोबाइल कैमरा से फोटो खींचें"
          >
            <Camera className="w-4 h-4 text-slate-700" />
            <span>कैमरा से फोटो लें</span>
          </button>
        </div>

        {uploading && (
          <div className="mt-3 text-xs text-gov-blue font-semibold animate-pulse flex items-center justify-center gap-1">
            <span className="w-2 h-2 rounded-full bg-gov-blue animate-ping"></span>
            फ़ाइल अपलोड की जा रही है...
          </div>
        )}
      </div>

      {/* Attachment List / Thumbnails */}
      {attachments.length > 0 && (
        <div className="space-y-2 pt-1">
          <span className="text-xs font-semibold text-slate-700">
            संलग्न फ़ाइलें ({attachments.length}):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {attachments.map((file) => (
              <div
                key={file.id}
                className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-slate-200 shadow-2xs"
              >
                <div className="flex items-center gap-2.5 overflow-hidden">
                  {file.type === 'image' ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-10 h-10 object-cover rounded border border-slate-200 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded bg-red-50 text-red-600 flex items-center justify-center flex-shrink-0 border border-red-100">
                      <FileText className="w-5 h-5" />
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <p className="text-xs font-medium text-slate-800 truncate" title={file.name}>
                      {file.name}
                    </p>
                    <p className="text-[10px] text-slate-500">{file.size}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => removeAttachment(file.id)}
                  className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-100 transition-colors"
                  title="फ़ाइल हटाएं"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
