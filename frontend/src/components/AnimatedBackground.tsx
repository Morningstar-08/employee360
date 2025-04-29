import "@/components/ui/animated.css";

export const AnimatedBackground = () => {
  return (
    <div className="area fixed inset-0 -z-20">
      <ul className="circles">
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i} className={`circle-${i + 5}`}></li>
        ))}
      </ul>
    </div>
  );
};
