import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";


type JourneyContextType = {
    idJourney: string;
    setIdJourney: (idJourney: string) => void;
};


export const JourneyModeContext = createContext<JourneyContextType>(
    {} as JourneyContextType
);
export const JourneyModeContextProvider: React.FC<PropsWithChildren> = ({
    children,
  }) => {
    const journeyIdFromLocalStorage = localStorage.getItem("journeyId");

    const [idJourney, setIdJourney] = useState(
        journeyIdFromLocalStorage || "NoSelected"
    );
  
    useEffect(() => {
      window.localStorage.setItem("journeyId", idJourney);
    }, [idJourney]);
  
    const setSelectedIdJourney = (value:string) => {
      setIdJourney(value);

    };
  
  
    return (
      <JourneyModeContext.Provider
        value={{
          setIdJourney: setSelectedIdJourney,
          idJourney,
        }}
      >
        {children}
      </JourneyModeContext.Provider>
    );
  };
