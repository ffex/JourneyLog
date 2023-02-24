




type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    return (

        <div className="logo">
            {collapsed ? (
                <img src="/images/logo.svg"  alt="JourneyLog" />
            ) : (
                <img src="/images/logo-extended.svg" alt="JourneyLog" />
            )}
        </div>


    );
};
{/* <img src="/images/logo.svg" width="64px" alt="JourneyLog" /> */ }