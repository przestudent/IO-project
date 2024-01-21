const romanLetters = ["I", "V", "X", "L", "C", "D", "M"] as const;

const validReportorium = ["NC", "C", "NS", "NC-E", "CO", "CZ"] as const;

function isNumeric(str: string) {
  if (typeof str != "string") return false; // we only process strings!
  return (
    !isNaN(str as unknown as number) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ); // ...and ensure strings of whitespace fail
}

const validReportoriumInfo: {
  [key in (typeof validReportorium)[number]]: string;
} = {
  NC: "dla spraw cywilnych podlegających rozpoznaniu w postępowaniu nakazowym i upominawczym, a także podlegających rozpoznaniu w europejskim postępowaniu nakazowym,",
  C: "dla pozostałych spraw cywilnych podlegających rozpoznaniu w procesie wszczętych na skutek pozwu, w tym podlegających rozpoznaniu w postępowaniu uproszczonym, a także w europejskim postępowaniu w sprawie drobnych roszczeń;",
  "NC-E":
    "„Nc-e” – dla spraw wszczętych w Elektronicznym Postępowaniu Upominawczym;",
  NS: "dla spraw cywilnych podlegających rozpoznaniu w postępowaniu nieprocesowym;",
  CO: "Co – dla innych spraw cywilnych;",
  CZ: " dla zażaleń rozpoznawanych przez inny skład sądu pierwszej instancji oraz dla zażaleń na wydanie przez funkcjonariusza Policji albo żołnierza Żandarmerii Wojskowej nakazu albo zakazu na podstawie art. 15aj ustawy z dnia 6 kwietnia 1990 r. o Policji[2] i art. 18j ustawy z dnia 24 sierpnia 2001 r. o Żandarmerii Wojskowej i wojskowych organach porządkowych",
};

export const translateFunc = (inputString: string): Array<[string, string]> => {
  let currIdxPointer = 0;
  let result: Array<[string, string]> = [];
  const romanPattern =
    /^(M{0,3})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})(.*)$/;

  const formattedString = inputString.toUpperCase();
  const formattedStringSpaceless = formattedString
    .replaceAll(".", "")
    .replaceAll(" ", "");
  const isValid = romanPattern.test(formattedStringSpaceless);
  const facultyNumber =
    formattedString.match(romanPattern)?.slice(1, 5).join("") ?? null;
  currIdxPointer = facultyNumber?.length ?? -1;
  if (!isValid || facultyNumber === "") return [["Podaj", "Numer"]];
  result.push([`Wydział ${facultyNumber}`, "Poprawny"]);
  if (checkIfShouldReturn(currIdxPointer, formattedStringSpaceless)) {
    return result;
  }

  const possibleSection = formattedStringSpaceless[currIdxPointer];
  const isSection = isNumeric(possibleSection as unknown as string);

  if (isSection) {
    currIdxPointer++;
    result.push([`Sekcja ${possibleSection}`, "poprawna"]);
    if (checkIfShouldReturn(currIdxPointer, formattedStringSpaceless)) {
      return result;
    }
  }

  const reporytoriumCodeArray = formattedStringSpaceless.substring(
    currIdxPointer,
    currIdxPointer + 3,
  );

  let reporytoriumCode = "";
  let reporytoriumCodeFound = false;
  for (let idx = 0; idx < reporytoriumCodeArray.length; idx++) {
    reporytoriumCode += reporytoriumCodeArray[idx];
    if (validReportorium.includes(reporytoriumCode as any)) {
      reporytoriumCodeFound = true;
      break;
    }
  }

  if (reporytoriumCodeFound) {
    result.push([`reporytorium ${reporytoriumCode}`, "poprawne"]);
    if (
      checkIfShouldReturn(
        currIdxPointer + reporytoriumCode.length,
        formattedStringSpaceless,
      )
    ) {
      return result;
    }
  } else {
    result.push([`reporytorium ${reporytoriumCode}`, "nie poprawne!"]);
    return result;
  }
  currIdxPointer += reporytoriumCode.length;

  if (
    formattedStringSpaceless.length >= currIdxPointer + 2 &&
    isNumeric(
      formattedStringSpaceless.substring(currIdxPointer, currIdxPointer + 2),
    )
  ) {
    result.push([
      `numer porządkowy ${formattedStringSpaceless.substring(
        currIdxPointer,
        currIdxPointer + 2,
      )}`,
      "poprawne",
    ]);

    currIdxPointer += 2;
  } else {
    return result;
  }

  if (checkIfShouldReturn(currIdxPointer, formattedStringSpaceless)) {
    return result;
  }

  if (
    formattedStringSpaceless[currIdxPointer] === "/" &&
    isNumeric(
      formattedStringSpaceless.substring(
        currIdxPointer + 1,
        currIdxPointer + 3,
      ),
    )
  ) {
    result.push([
      `rok zalozenia akt ${formattedStringSpaceless.substring(
        currIdxPointer + 1,
        currIdxPointer + 3,
      )}`,
      "poprawne",
    ]);
  } else {
    result.push([
      `rok zalozenia akt ${formattedStringSpaceless.substring(currIdxPointer)}`,
      "nie poprawny!",
    ]);
  }

  return result;
};

function checkIfShouldReturn(idx: number, str: string): boolean {
  return str.length === idx;
}
