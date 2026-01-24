const CreatedFormFooter = (props: { authorEmail: string }) => {

    return (
        <footer className="container py-10 flex justify-center text-xs">
            <div className="text-center">
                <div>Kontakt twórcy formularza: </div>
                <div className="font-bold">{props.authorEmail}</div>
            </div>

        </footer>
    );
};

export default CreatedFormFooter;