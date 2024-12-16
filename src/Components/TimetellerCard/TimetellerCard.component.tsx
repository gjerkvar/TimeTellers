import './TimetellerCard.css';

export const TimetellerCard = ({ title, description, children }: { title: string, description: string, children: React.ReactNode }) => {
    return (
      <div className="timeteller-card"> 
        <h2>{title}</h2>
        <p>{description}</p>
        <div>{children}</div> {/* Pass custom time logic */}
      </div>
    );
  };
