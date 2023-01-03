export function MordalOrder() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <button type="button" onClick={handleOpenModal}>
        Abrir modal
      </button>

      {isModalOpen && (
        <div>
          <h1>Modal</h1>
          <button type="button" onClick={handleCloseModal}>
            Fechar modal
          </button>
        </div>
      )}
    </>
  );
}