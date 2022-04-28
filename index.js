// const { readTxt } = require('./utils/read-file');
const { readTxtFromURL } = require("./utils/read-file-from-URI");

(async () => {
    // Po pierwsze, musisz wczytać dane z pliku input.txt
    //     Otrzymasz obiekt z 4 właściwościami: selectedFilters, products, colors i sizes.
     const exp = await readTxtFromURL();
     // console.log(exp)

    // Musisz pogrupować produkty według ich opcji kolorów i rozmiarów za pomocą pola ID (zwróć
    // uwagę na typy danych!). Jeden produkt może mieć tylko jedną opcję rozmiaru i koloru
    // (nie ma duplikatów produktów i ich opcji).
    const arr = [];

    for (const objElement in exp) {
        if(objElement !== "selectedFilters"){
            for (let i = 0; i < exp[objElement].length; i++) {
                arr.push(exp[objElement][i]);
            }
        }
    }
    // console.log(arr)

    const finalArr = arr.reduce(function(list, obj) {
        let found = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == obj.id) {
                delete obj.id;
                let color;
                let size;
                if(obj.value == "blue" || obj.value == "black") {
                    color = obj.value;
                    list[i] = { ...list[i], color}
                }
                if(obj.value == 41 || obj.value == 43) {
                    size = obj.value;
                    list[i] = { ...list[i], size}
                }
                found = true;
                break;
            }
        }

        if (!found) {
            list.push(obj);
        }

        return list;
    }, []);

    // console.log(finalArr)

    const final = finalArr.reduce(function(list, obj) {
        let found = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == obj.id) {
                delete obj.id;
                list[i] = { ...list[i], ...obj}
                found = true;
                break;
            }
        }

        if (!found) {
            list.push(obj);
        }

        return list;
    }, []);

    const filterArr = final.filter(product => (product.color === "black" || product.color === "blue") && (product.size === 41 || product.size === 43));
    // console.log(filterArr)

    // Następnie należy odfiltrować zgrupowane produkty, aby dopasować je do
    //     wybranych filtrów i uzyskać tylko te produkty, których cena jest wyższa niż 200 (x > 200).
    const priceGraterThan200Arr = filterArr.filter((prod) => prod.price > 200);


    // Następnie należy uzyskać wartość poprzez pomnożenie najniższej i najwyższej ceny z
    // przefiltrowanej listy produktów. Wynik należy sformatować tak, aby był liczbą całkowitą (zaokrągloną, bez części ułamkowej)
    const minPrice = Math.min(...priceGraterThan200Arr.map(item => item.price));
    const maxPrice = Math.max(...priceGraterThan200Arr.map(item => item.price));
    const pricesMultiplier = Math.round(minPrice * maxPrice);

    // Następnie musisz utworzyć tablicę z liczby, którą wcześniej otrzymałeś,
    //     dodając co drugą cyfrę tej liczby do poprzedniej (np. 123456 -> [1 + 2, 3 + 4, 5 + 6] -> [3, 7, 11].
    const array = String(pricesMultiplier).split("").map(number => Number(number)); // tworzenie tablicy z liczby

    const odd = array.filter((numb, i) => i % 2 - 1);
    const even = array.filter((numb, i) => i % 2);
    const sumEveryTwoNo = odd.map((numb, i) => numb + (even[i] || 0));

    // Wynik będzie rezultatem mnożenia indeksu numeru lubelskiego biurowca Monogo w tablicy z punktu 5,
    //     wartości, którą otrzymałeś w punkcie 4, oraz długości nazwy firmy "Monogo".
    const monogoOfficeNo = sumEveryTwoNo.findIndex(numb => numb === 14);
    const monogoLength = "Monogo".length; // długość nazwy firmy "Monogo"
    const result = monogoOfficeNo * pricesMultiplier * monogoLength;

    console.log(result);
})();
