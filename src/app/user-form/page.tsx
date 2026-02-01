"use client";

import UserForm from "@/components/pages/user-settings/UserForm";
import { SuspenseErrorBoundary } from "@/components/shared";
import SectionHeader from "@/components/shared/SectionHeader";


const UserFormPage = () => {

    return (
        <>
            <div className="mb-16">
                <SectionHeader message="Wypełnij dane kontaktowe, aby przejść dalej" />
                <div className="text-sm text-font_light">
                    Edycja danych w ustawieniach aplikacji</div>
            </div>
            <SuspenseErrorBoundary
                size="lg"
                errorMessage="Błąd przesyłu danych formularza"
            >
                <UserForm />
            </SuspenseErrorBoundary>
        </>

    );
};

export default UserFormPage;