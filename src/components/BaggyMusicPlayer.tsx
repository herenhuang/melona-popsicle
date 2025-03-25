  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 w-full bg-black bg-opacity-80 backdrop-blur-sm transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ zIndex: 50 }}
    >
    </div>
  ) 