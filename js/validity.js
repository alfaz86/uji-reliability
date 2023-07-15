const calculateValidity = () => {
    var rtabel = selectDataRTable(tingkatSignifikansi, totalRespondent);
    var valid = '<span class="text-success font-weight-bold">VALID</span>';
    var notValid = '<span class="text-danger font-weight-bold">TIDAK VALID</span>';
    var rtabel = selectDataRTable(tingkatSignifikansi, totalRespondent);
    var rows = ``;
    var data = [];

    Object.keys(dataQuestions).forEach((key, index) => {
        var arrXn = key != "total" ? dataQuestions[key] : [];
        var arr$Y = dataQuestions["total"];
        var R = CORREL(arrXn, arr$Y);
        var status = R > rtabel ? valid : notValid;

        if (R > rtabel && key != "total") {
            data.push(dataQuestions[key]);
        }
        if (index < totalQuestion) {
            rows += `<tr>`;
            rows += `<td>${index + 1}</td>`;
            rows += `<td>${R}</td>`;
            rows += `<td>${rtabel}</td>`;
            rows += `<td>${status}</td>`;
            rows += `</tr>`;
        }
    });

    navVTab.classList.remove("d-none");
    resultV.innerHTML = rows;
    validDataQuestions = data;
    btnR.classList.remove("d-none");
}