const myForm = document.getElementById("form");
const csvFile = document.getElementById("file");
const significance = document.getElementById("significance");
const btnV = document.getElementById("btn-validitas");
const btnR = document.getElementById("btn-reliabilitas");
const navVTab = document.getElementById("nav-validitas-tab");
const colspan = document.getElementById("colspan");
const questionNumber = document.getElementById("question-number");
const result = document.getElementById("result");
const resultV = document.getElementById("result-validitas");

let dataQuestions = [];
let validDataQuestions = [];
let tingkatSignifikansi = 1;
let totalQuestion = 1;
let totalRespondent = 1;

significance.addEventListener("change", function (e) {
    e.preventDefault();
    tingkatSignifikansi = this.value
});

myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = csvFile.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const text = e.target.result;
        const array = csvToArray(text);
        arrayToTable(array);
    };

    reader.readAsText(input);

    function csvToArray(str, delimiter = ",") {
        let array = str.split("\r\n").map(function (line) {
            return line.split(delimiter);
        });

        return array;
    }

    function generateQuestionNumber(totalQuestion) {
        return new Promise(resolve => {
            colspan.colSpan = totalQuestion;
            let cols = ``;
            let i = 1;
            while (i <= totalQuestion) {
                cols += `<td style="min-width: 50px">${i}</td>`;
                i++;
            }
            questionNumber.innerHTML = cols;
            resolve('resolved');
        });
    }

    async function arrayToTable(array) {
        let rows = ``;
        let totalQ = 0;
        let dataQ = [];
        array.forEach((valueOfArray, index) => {
            if (index === 0) totalQ = valueOfArray.length;
            let total = 0;
            const tdsArray = valueOfArray.map((value, i) => {
                var nValue = Number(value);
                var thisRow = `row${i + 1}`;
                if (index === 0) {
                    dataQ[thisRow] = [nValue];
                } else {
                    dataQ[thisRow].push(nValue);
                }

                total += nValue;
                return `<td>${nValue}</td>`;
            });
            const tdsString = tdsArray.join("");
            rows += `<tr>`;
            rows += `<td>${index + 1}</td>`;
            rows += tdsString;
            rows += `<td>${total}</td>`;
            rows += `</tr>`;

            if (index === 0) {
                dataQ["total"] = [total];
            } else {
                dataQ["total"].push(total);
            }
        });
        await generateQuestionNumber(totalQ);
        result.innerHTML = rows;
        dataQuestions = dataQ;
        totalQuestion = totalQ;
        totalRespondent = array.length;
        btnV.classList.remove("d-none");
    }
});