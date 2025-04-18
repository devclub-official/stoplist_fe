interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/25 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-80 max-w-md">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 mb-2">{message}</p>
        <p className="text-gray-600 mb-6">
          *주의* 지금까지 하던 진행률이 초기화됩니다.
        </p>

        <div className="flex justify-end space-x-3">
          <button
            className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            취소
          </button>
          <button
            className="px-4 py-2 bg-coral-600 text-white rounded-xl hover:bg-coral-700 transition-colors"
            onClick={onConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
