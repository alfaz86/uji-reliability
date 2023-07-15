const calculateReliability = () => {
    var n = validDataQuestions.length;
    var totalVarButir = 0;
    var varTotal = 0;
    var total = getTotalRow(totalRespondent, validDataQuestions);
    var r11 = 0;
    var reliability;

    validDataQuestions.forEach(value => {
        variance = VAR(value);
        totalVarButir += variance;
    });
    varTotal = VAR(total);
    r11 = (n / (n - 1)) * (1 - (totalVarButir / varTotal));

    if (r11 < 0.2) {
        reliability = '<span class="text-danger font-weight-bold">Sangat Rendah</span>';
    } else if (r11 < 0.4) {
        reliability = '<span class="text-danger font-weight-bold">Rendah</span>';
    } else if (r11 < 0.6) {
        reliability = '<span class="text-warning font-weight-bold">Sedang</span>';
    } else if (r11 < 0.8) {
        reliability = '<span class="text-success font-weight-bold">Tinggi</span>';
    } else {
        reliability = '<span class="text-success font-weight-bold">Sangat Tinggi</span>';
    }

    navRTab.classList.remove("d-none");
    resultR.innerHTML = `<tr>
        <td>${r11}</td>
        <td>${reliability}</td>
    </tr>`;
}

function getTotalRow(totalRespondent, validDataQuestions) {
    var totalRow = [];
    for (let index = 0; index < totalRespondent; index++) {
        var rows = [];
        validDataQuestions.forEach((value, n) => {
            const element = validDataQuestions[n][index];
            rows.push(element);
        });
        totalRow.push(rows.reduce((a, b) => a + b));
    }

    return totalRow;
}