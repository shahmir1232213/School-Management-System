interface Props {
  onClose: () => void;
}

const CreateProfileFooter: React.FC<Props> = ({ onClose }) => {
  return (
    <button
      onClick={onClose}
      className="absolute right-5 top-4 text-2xl text-gray-600 hover:text-black"
    >
      x
    </button>
  );
};

export default CreateProfileFooter;
