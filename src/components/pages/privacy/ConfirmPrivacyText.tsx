import { Card } from "@/components/shared";

const ConfirmPrivacyText = () => {
  return (
    <div className="m-8 flex flex-col gap-8 px-24">
      <div className="text-lg">Polityka prywatności</div>
      <div className="">
        Wyrażam wyraźną zgodę na przetwarzanie moich danych osobowych, w tym
        informacji o mojej przynależności związkowej, numeru telefonu oraz
        adresu e-mail, w celu udostępnienia ich innym użytkownikom aplikacji
        Formy Pracy. Rozumiem, że celem tego przetwarzania jest umożliwienie
        nawiązywania kontaktów z innymi organizacjami związkowymi w kontekście
        wymienianych informacji o sporach zbiorowych.
      </div>
      <h1 className="font-semibold">Obowiązek informacyjny (RODO)</h1>
      <div>
        1. Administrator Danych Administratorem Twoich danych osobowych jest
        Ogólnopolski Związek Zawodowy Inicjatywa Pracownicza z siedzibą w
        Poznaniu, ul. Kościelna 4/1a, NIP: 779-22-38-665. Możesz skontaktować
        się z nami pod adresem e-mail: ip@ozzip.pl.
      </div>

      <div>
        2. Jakie dane przetwarzamy i w jakim celu? Przetwarzamy Twój numer
        telefonu, adres e-mail oraz nazwę organizacji związkowej, do której
        należysz. Głównym celem aplikacji jest budowanie sieci kontaktów między
        związkowcami. Twoje dane będą przetwarzane w celu:
        <div className="ml-10">
          - Umożliwienia innym użytkownikom aplikacji kontaktu z Tobą w sprawach
          dotyczących udostępnionych protokołów i porozumień ze sporów
          zbiorowych. <br />
          - Wymiany wiedzy i doświadczeń pomiędzy organizacjami związkowymi
          (sieciowanie).
          <br />- Obsługi technicznej konta użytkownika.
        </div>
      </div>
      <div>
        3. Podstawa prawna przetwarzania Przetwarzamy Twoje dane na podstawie:
        <div className="ml-10">
          - Twojej wyraźnej zgody (art. 6 ust. 1 lit. a oraz art. 9 ust. 2 lit.
          a RODO) – w zakresie informacji o przynależności związkowej oraz
          udostępniania danych kontaktowych innym użytkownikom (tzw. dane
          wrażliwe). <br />- Prawnie uzasadnionego interesu administratora (art.
          6 ust. 1 lit. f RODO) – w celu zapewnienia bezpieczeństwa aplikacji
          oraz ewentualnego dochodzenia roszczeń lub obrony przed nimi.
        </div>
      </div>

      <div>
        4. Kto będzie widział Twoje dane? (Odbiorcy danych) To kluczowy element
        działania naszej aplikacji. Twoje dane (telefon, e-mail, nazwa związku)
        będą widoczne dla innych zalogowanych użytkowników aplikacji, którzy
        przeglądają informacje o sporach zbiorowych, w których brałeś udział lub
        które dodałeś. Odbiorcami danych mogą być również podmioty świadczące
        dla nas usługi IT (np. hostingodawca serwera), z którymi zawarliśmy
        stosowne umowy powierzenia danych.
      </div>

      <div>
        5. Jak długo przechowujemy dane? Dane będą przetwarzane do momentu
        usunięcia przez Ciebie konta w aplikacji lub do momentu wycofania zgody
        na ich przetwarzanie. Wycofanie zgody nie wpływa na zgodność z prawem
        przetwarzania, którego dokonano przed jej wycofaniem.
      </div>

      <div>
        6. Twoje prawa Posiadasz prawo do:
        <div className="ml-10">
          - Dostępu do treści swoich danych oraz ich sprostowania. <br />
          - Usunięcia danych (&quot;prawo do bycia zapomnianym&quot;). <br />
          - Ograniczenia przetwarzania. <br />
          - Przenoszenia danych. <br />
          - Cofnięcia zgody w dowolnym momencie (co może skutkować brakiem
          możliwości korzystania z funkcji społecznościowych aplikacji). <br />
          - Wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych
          (PUODO), gdy uznasz, że przetwarzanie narusza przepisy RODO. <br />
        </div>
      </div>
      <div>
        7. Dobrowolność podania danych Podanie danych oraz wyrażenie zgody na
        przetwarzanie informacji o przynależności związkowej jest dobrowolne,
        jednak jest niezbędne do korzystania z funkcji sieciowania i
        udostępniania kontaktów w ramach aplikacji.
      </div>
    </div>
  );
};

export default ConfirmPrivacyText;
