'use client'

export default function AppButton() {
  
  const handleClickMe = () => alert('Hello Next.js');  

  return (
    <button
      onClick={handleClickMe}
      className="border-3 border-foreground bg-foreground px-6 py-2.5 text-[14px] font-semibold tracking-[2px] text-background uppercase transition-colors duration-75 hover:bg-background hover:text-foreground"
    >
      Click Me!
    </button>
  );
}
